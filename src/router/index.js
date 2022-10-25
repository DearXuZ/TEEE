import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: ()=>import('../views/LoginView.vue')
	},
	{
		path: '/',
		name: 'home',
		component: () => import('../views/HomeView.vue'),
		children: [
			{
				path: 'Start',
				name: 'Start',
				component:()=>import('../views/HomeView/WelcomeView.vue')
			},
			{
				path:'/Flush',
				name: 'flush',
				component:()=>import('@/views/Flush.vue')
			},
		]
	},
	{
		path:'/404',
		name: '404 Not Found',
		component:()=>import('@/views/404.vue')
	},

	{
		path: '*',
		redirect:'/404',
	}
]

const router = new VueRouter({
	base:'/TEEE',
  	routes
})


const serverRoutes = sessionStorage.getItem('serverRoutes');
if (serverRoutes) {
	const arr = JSON.parse(serverRoutes);
	setRouter(arr);
}

router.beforeEach((to, from, next) => {
	//验证token存在，则进入该页面
	NProgress.start();
	if (to.path == '/login') {
		localStorage.setItem('token', '');
		sessionStorage.setItem('serverRoutes', '');
	}
	if (localStorage.getItem('token')) {
		next();
	} else { 
		if (to.path === "/login") {
			next();
		} else {
			next("/login");
		}
	}
	NProgress.set(1);
});

router.afterEach((to,from,nex)=>{
	NProgress.set(1);
})


export function resetRouter() {
	router.matcher = new VueRouter({routes}).matcher
}
export function setRouter(routers) {
	for (const { name, path, component, icon } of routers) {
		if (path != null) {
			router.addRoute('home', {
				path: path,
				name: name,
				component: () => import(`@/views/HomeView/${component}`),
				// component: (resolve) => require([`@/views/HomeView/${component}`], resolve)
				
			});
			// let item = {
			// 	name:name,
			// 	path:path,
			// 	component:component,
			// 	icon:icon,
			// }
		}
	}
}

export default router

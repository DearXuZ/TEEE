<template>
  <v-btn
    :color="color"
    style="
      width: 44px;
      min-width: 44px;
      height: 44px;
      margin-right: 5px;
      margin-left: 5px;
      margin-top: 5px;
    "
    class="white--text"
    :outlined="isWrite"
    @click="toQue()"
    >{{ qn }}</v-btn
  >
</template>

<script>
export default {
  props: ["qn", "isWrite"],
  computed: {
    color() {
      return this.status == 0 ? "blue" : "grey";
    },
  },
  data() {
    return {
      status: 0,
    };
  },
  methods: {
    toQue() {
      this.$emit("toQue", this.qn - 1);
    },
  },
};
</script>

<style scoped></style>

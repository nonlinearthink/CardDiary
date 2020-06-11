<template>
  <van-nav-bar
    title="标签"
    left-arrow
    @click-left="goBack"
    palceholder
  ></van-nav-bar>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
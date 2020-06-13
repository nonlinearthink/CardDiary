<template>
  <div id="app">
    <div>
      <router-view />
      <van-tabbar route placeholder v-show="offTabBar">
        <van-tabbar-item
          replace
          to="/calendar"
          icon="wap-nav"
        ></van-tabbar-item>
        <van-tabbar-item replace to="/add" icon="add"></van-tabbar-item>
        <van-tabbar-item replace to="/home" icon="wap-home"></van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      username: "",
      password: ""
    };
  },
  created() {
    //数据恢复
    if (sessionStorage.getItem("store")) {
      console.log("加载数据: ")
      console.log(sessionStorage.getItem("store"))
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //数据保存
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      console.log("保存数据");
    });
  },
  computed: {
    offTabBar() {
      return this.$route.path != "/" && this.$route.path != "/signup";
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 60px;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
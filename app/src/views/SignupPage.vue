<template>
  <div>
    <h1>注册账号</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[rule1]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[rule1]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <a @click="goBack" class="back">
      返回
    </a>
    <van-popup
      v-model="showMessage"
      closeable
      close-icon="close"
      close-icon-position="top-right"
      round
    >
      用户已经被注册
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      rule1: {
        required: true,
        message: "请填写密码"
      },
      showMessage: false
    };
  },
  methods: {
    onSubmit(values) {
      var auth = `${values.username}:${values.password}`;
      var base64 = Buffer.from(auth, "ascii").toString("base64");
      this.$axios({
        method: "POST",
        url: `http://127.0.0.1:8000/api/users`,
        headers: {
          authorization: "Basic " + base64
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.goBack();
          } else {
            this.showMessage = true;
          }
        })
        .catch(err => {
          console.log(err);
          this.showMessage = true;
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.van-popup {
  width: 20vw;
  height: 20vh;
  margin: auto 0;
  padding: 10vw;
}
.back{
    cursor: pointer;
}
</style>
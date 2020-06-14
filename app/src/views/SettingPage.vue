<template>
  <div class="setting-page">
    <van-nav-bar
      title="设置"
      left-arrow
      @click-left="goBack"
      palceholder
    ></van-nav-bar>
    <label class="setting-label">日记本头像</label>
    <van-uploader :after-read="afterRead" />
    <label class="setting-label">日记本名称</label>
    <textarea name="" v-model="$store.state.basic.diaryname"></textarea>
    <label class="setting-label">今日感想</label>
    <textarea name="" v-model="$store.state.basic.feeling"></textarea>
  </div>
</template>

<script>
export default {
  name: "Setting",
  methods: {
    goBack() {
      this.$axios({
        method: "POST",
        url:
          `http://127.0.0.1:8000/api/users/${this.$store.state.user}/basic` +
          `?name=${this.$store.state.basic.diaryname}` +
          `&feeling=${this.$store.state.basic.feeling}` +
          `&avatar=${this.$store.state.basic.avatar}`,
        headers: {
          token: this.$store.state.token
        }
      }).then(res => {
        console.log(res);
        if (res.data.success) {
          console.log("更新远程数据库成功");
        }
      });
      this.$router.go(-1);
    }
  },
  computed: {
    diaryname() {
      return this.$store.state.basic.diaryname == ""
        ? "日记名称"
        : this.$store.state.basic.diaryname;
    },
    feeling() {
      return this.$store.state.basic.feeling == ""
        ? "今日感想"
        : this.$store.state.basic.feeling;
    }
  }
};
</script>

<style lang="scss" scoped>
.setting-page {
  $app-width: 90%;
  .setting-label {
    margin-left: (100%-$app-width)/2;
    display: block;
    text-align: left;
    font-weight: 500;
  }
  textarea {
    width: $app-width;
    border: 0;
    border-radius: 10px;
    background-color: #ebf1f1d8;
    text-align: center;
  }
}
</style>
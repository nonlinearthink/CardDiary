<template>
  <div class="setting-page">
    <van-nav-bar title="设置" left-arrow @click-left="goBack"></van-nav-bar>
    <label class="setting-label">日记本头像</label>
    <van-uploader :after-read="afterRead" />
    <label class="setting-label">日记本名称</label>
    <textarea name=""></textarea>
    <label class="setting-label">今日感想</label>
    <textarea name=""></textarea>
  </div>
</template>

<script>
export default {
  name: "Setting",
  methods: {
    goBack() {
      this.$router.go(-1);
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
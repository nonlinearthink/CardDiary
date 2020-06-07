<template>
  <div class="add">
    <van-nav-bar @click-right="submit">
      <template #left>
        <div>
          <div>CARD</div>
          <div>DIARY</div>
        </div>
      </template>
      <template #title>
        <div class="calendar-title">
          周日. 5月31/2020
        </div>
      </template>
      <template #right>
        <van-icon name="success" size="2em" color="black" />
      </template>
    </van-nav-bar>
    <div id="main">
      <div class="title">Title</div>
      <div class="setbar">
        <van-row>
          <van-col span="6"><font-awesome-icon icon="smile-beam"/></van-col>
          <van-col span="6"><font-awesome-icon icon="cloud"/></van-col>
          <van-col span="6"><font-awesome-icon icon="heart"/></van-col>
          <van-col span="6"><font-awesome-icon icon="tag"/></van-col>
        </van-row>
      </div>
      <textarea class="content-area" placeholder="写下你的今天..."></textarea>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      console.log("1");
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar-title {
  border: 1px solid #d6d6d6;
  padding: 0 50px;
  border-radius: 15px;
}
#main {
  padding: 0 5%;
  $margin-size: 10px;
  .title {
    font-weight: bold;
    font-size: 1.5em;
    color: #606060;
    margin: $margin-size;
  }
  .content-area {
    border: none;
    width: 95%;
    height: 50vh;
    overflow-y:hidden;
    resize: none;
    margin: $margin-size;
  }
  .setbar {
    padding: 15px 15%;
    border-top: 1px solid #c4c4c4;
    border-bottom: 1px solid #c4c4c4;
    margin: $margin-size;
  }
}
</style>
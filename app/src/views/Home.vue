<template>
  <div class="home">
    <AvatarCard id="basic" class="first">
      <h2>日记名称</h2>
      <p>今日感想</p>
    </AvatarCard>
    <StandardCard id="count">
      <van-row>
        <van-col span="12" class="count-view">
          <router-link to="/diary">
            <div class="number-view">1</div>
            <div class="title-view">所有日记</div>
          </router-link>
        </van-col>
        <van-col span="12">
          <router-link to="/diary">
            <div class="number-view">0</div>
            <div class="title-view">喜欢的日记</div>
          </router-link>
        </van-col>
      </van-row>
    </StandardCard>
    <StandardCard id="statistic">
      <van-tabs color="#ffffff">
        <van-tab title="天气">内容 1</van-tab>
        <van-tab title="心情">内容 2</van-tab>
      </van-tabs>
    </StandardCard>
    <StandardCard id="tags">
      <van-tabs color="#ffffff">
        <van-tab title="标签">内容</van-tab>
      </van-tabs>
    </StandardCard>
  </div>
</template>

<script>
import StandardCard from "@/components/StandardCard.vue";
import AvatarCard from "@/components/AvatarCard.vue";

export default {
  name: "Home",
  components: {
    StandardCard,
    AvatarCard
  }
};
</script>

<style lang="scss" scoped>
.home {
  .first {
    margin-top: 50px;
  }
  #count {
    padding: 25px;
    .count-view {
      border-right: 1px solid rgb(233, 227, 227);
    }
    .van-col {
      .number-view{
        font-size: 1.5em;
        color: black;
      }
      .title-view{
        font-size: 0.7em;
        color: #888888;
      }
    }
  }
}
</style>

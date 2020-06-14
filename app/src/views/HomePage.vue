<template>
  <div class="home">
    <AvatarCard id="basic" class="first">
      <h2>{{ diaryname }}</h2>
      <p>{{ feeling }}</p>
    </AvatarCard>
    <StandardCard id="count">
      <van-row>
        <van-col span="12" class="count-view">
          <router-link to="/diary/all">
            <div class="number-view">
              {{ this.$store.getters.countAllDiary }}
            </div>
            <div class="title-view">
              所有日记
            </div>
          </router-link>
        </van-col>
        <van-col span="12">
          <router-link to="/diary/favor">
            <div class="number-view">
              {{ this.$store.getters.countFavorDiary }}
            </div>
            <div class="title-view">喜欢的日记</div>
          </router-link>
        </van-col>
      </van-row>
    </StandardCard>
    <StandardCard id="statistic">
      <van-tabs color="#ffffff">
        <van-tab title="天气">
          <Histogram :items="this.$store.getters.getWeathers"></Histogram>
        </van-tab>
        <van-tab title="心情">
          <Histogram :items="this.$store.getters.getMoods"></Histogram>
        </van-tab>
      </van-tabs>
    </StandardCard>
    <StandardCard id="tags">
      <van-tabs color="#ffffff">
        <router-link to="/tag">
          <van-tab title="标签">
            <Tag v-for="tag in this.$store.getters.getTags" :key="tag.value">
              <template #tagname>{{ tag.value }}</template>
              <template #count>{{ tag.count }}</template>
            </Tag>
          </van-tab>
        </router-link>
      </van-tabs>
    </StandardCard>
  </div>
</template>

<script>
import StandardCard from "@/components/StandardCard.vue";
import AvatarCard from "@/components/AvatarCard.vue";
import Histogram from "@/components/Histogram.vue";
import Tag from "@/components/Tag.vue";

export default {
  name: "Home",
  components: {
    StandardCard,
    AvatarCard,
    Histogram,
    Tag
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
      .number-view {
        font-size: 1.5em;
        color: black;
      }
      .title-view {
        font-size: 0.7em;
        color: #888888;
      }
    }
  }
  #tags {
    .tag {
      margin: 5px;
    }
    a {
      text-decoration: none;
      color: #888;
    }
  }
}
</style>

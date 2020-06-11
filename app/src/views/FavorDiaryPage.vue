<template>
  <div class="alldiary">
    <van-nav-bar title="喜欢的日记" left-arrow @click-left="goBack" palceholder></van-nav-bar>
    <div class="diarylist">
      <StandardCard
        v-for="diary in this.$store.state.statistic.diary.favor"
        :key="diary._id"
      >
        <div class="body">{{ diary.body }}</div>
        <div class="date">{{ datePaser(diary.date) }}</div>
      </StandardCard>
    </div>
  </div>
</template>

<script>
import StandardCard from "@/components/StandardCard.vue";
import moment from "moment";

export default {
  components: {
    StandardCard
  },
  methods: {
    datePaser(date) {
      return moment(`${date.year}-${date.month+1}-${date.day}`).format("周d MM月DD/YYYY");
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.alldiary{
  padding: 10px;
}
.diarylist {
  $padding: 20px;
  .standard-card {
    width: 100%;
    height: 100px;
    margin: 10px;
    padding: $padding;
    position: relative;
    .date{
      color: #ccc;
      position: absolute;
      bottom: $padding;
      left: $padding;
    }
  }
}
</style>
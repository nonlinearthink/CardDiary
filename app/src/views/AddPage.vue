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
          {{ `${diary.date.month + 1}月${diary.date.day}/${diary.date.year}` }}
        </div>
      </template>
      <template #right>
        <van-icon name="success" size="2em" color="black" />
      </template>
    </van-nav-bar>
    <div id="main">
      <van-field v-model="diary.title" label="Title" class="title" />
      <div class="setbar" @click="pickerHandler">
        <van-row>
          <van-col span="6"
            ><font-awesome-icon icon="smile-beam" /> {{ diary.mood }}</van-col
          >
          <van-col span="6"
            ><font-awesome-icon icon="cloud" /> {{ diary.weather }}</van-col
          >
          <van-col span="6"
            ><font-awesome-icon icon="heart" :style="{ color: setColor }"
          /></van-col>
          <van-col span="6"><font-awesome-icon icon="tag"/></van-col>
        </van-row>
      </div>
      <textarea
        class="content-area"
        placeholder="写下你的今天..."
        v-model="diary.body"
      ></textarea>
    </div>
    <van-popup v-model="pickerVisable" position="bottom">
      <p>心情</p>
      <van-row>
        <van-col span="6" v-for="mood in moods" :key="mood">
          <a class="btn" @click="changeMood(mood)">{{ mood }}</a>
        </van-col>
      </van-row>
      <van-divider />
      <p>天气</p>
      <van-row>
        <van-col span="6" v-for="weather in weathers" :key="weather">
          <a class="btn" @click="changeWeather(weather)">{{ weather }}</a>
        </van-col>
      </van-row>
      <van-divider />
      <van-row>
        <van-col span="12">喜欢</van-col>
        <van-col span="12"><van-switch v-model="diary.favor"/></van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      pickerVisable: false,
      moods: ["开心", "着迷", "调皮", "无语", "生气", "难过", "伤心", "惊讶"],
      weathers: ["晴天", "多云", "小雨", "小雪", "雷雨", "台风", "暴雨", "无"],
      date: null,
      diary: null,
      isFound: false
    };
  },
  methods: {
    submit() {
      this.$store.commit("pushDiary", this.diary);
      this.$axios({
        method: "POST",
        url:
          `http://127.0.0.1:8000/api/users/${this.$store.state.user}/diaries` +
          `?title=${this.diary.title}` +
          `&mood=${this.diary.mood}` +
          `&weather=${this.diary.weather}` +
          `&favor=${this.diary.favor ? 1 : 0}` +
          `&tags=${this.diary.tags}` +
          `&body=${this.diary.body}` +
          `&date=${this.parseDate(this.diary.date)}`,
        headers: {
          token: this.$store.state.token
        }
      });
      this.dateToModify = new Date();
      this.$router.push("/home");
    },
    pickerHandler() {
      this.pickerVisable = !this.pickerVisable;
    },
    changeMood(mood) {
      this.diary.mood = mood;
    },
    changeWeather(weather) {
      this.diary.weather = weather;
    },
    parseDate(date) {
      return new Date(`${date.year}-${date.month}-${date.day}`);
    }
  },
  computed: {
    setColor() {
      return this.diary.favor ? "red" : "black";
    }
  },
  created() {
    var _this = this;
    var dateToModify = this.$store.getters.getDateToModify;
    let isFound = false;
    let diarySet = this.$store.getters.getAllDiaries;
    console.log("查询是否存在记录");
    for (let i in diarySet) {
      if (
        diarySet[i].date.year == dateToModify.getFullYear() &&
        diarySet[i].date.month == dateToModify.getMonth() + 1 &&
        diarySet[i].date.day == dateToModify.getDate()
      ) {
        this.diary = diarySet[i];
        console.log("查证存在记录，加载数据....");
        isFound = true;
      }
    }
    if (!isFound) {
      console.log("创建新记录");
      this.diary = {
        date: {
          year: dateToModify.getFullYear(),
          month: dateToModify.getMonth(),
          day: dateToModify.getDate()
        },
        title: "",
        author: this.$store.state.user,
        mood: "开心",
        weather: "晴天",
        tag: "",
        body: "",
        favor: false
      };
    }
    console.log(this.diary);
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
    overflow-y: hidden;
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
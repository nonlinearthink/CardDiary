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
          {{
            `${date.getMonth() + 1}月${date.getDate()}/${date.getFullYear()}`
          }}
        </div>
      </template>
      <template #right>
        <van-icon name="success" size="2em" color="black" />
      </template>
    </van-nav-bar>
    <div id="main">
      <van-field v-model="title" label="Title" class="title" />
      <div class="setbar" @click="pickerHandler">
        <van-row>
          <van-col span="6"
            ><font-awesome-icon icon="smile-beam" /> {{ currentMood }}</van-col
          >
          <van-col span="6"
            ><font-awesome-icon icon="cloud" /> {{ currentWeather }}</van-col
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
        v-model="body"
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
        <van-col span="12"><van-switch v-model="isFavor"/></van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerVisable: false,
      moods: ["开心", "着迷", "调皮", "无语", "生气", "难过", "伤心", "惊讶"],
      currentMood: "开心",
      weathers: ["晴天", "多云", "小雨", "小雪", "雷雨", "台风", "暴雨", "无"],
      currentWeather: "无",
      isFavor: false,
      title: "",
      body: "",
      date: null,
      diary: null
    };
  },
  methods: {
    submit() {
      var diary = {
        date: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate()
        },
        title: this.title,
        author: this.$store.state.author,
        mood: this.currentMood,
        weather: this.currentWeather,
        tag: "python,array",
        body: this.body,
        favor: this.isFavor
      };
      this.$store.state.statistic.diary.all.push(diary);
      if (this.isFavor) {
        this.$store.state.statistic.diary.favor.push(diary);
      }
      let isChange = false;
      for (let m of this.$store.state.statistic.moods) {
        if (m.value == this.currentMood) {
          m.count++;
          isChange = true;
        }
      }

      if (!isChange)
        this.$store.state.statistic.moods.push({
          value: this.currentMood,
          count: 1
        });
      isChange = false;
      for (let w of this.$store.state.statistic.weathers) {
        if (w.value == this.currentWeather) {
          w.count++;
          isChange = true;
        }
      }
      if (!isChange)
        this.$store.state.statistic.weathers.push({
          value: this.currentMood,
          count: 1
        });
      this.$router.push("/home");
    },
    pickerHandler() {
      this.pickerVisable = !this.pickerVisable;
    },
    changeMood(mood) {
      this.currentMood = mood;
    },
    changeWeather(weather) {
      this.currentWeather = weather;
    }
  },
  computed: {
    setColor() {
      return this.isFavor ? "blue" : "black";
    }
  },
  mounted() {
    var _this = this;
    var dateToModify = _this.$store.state.dateToModify;
    let isFound = false;
    for (let diary of this.$store.state.statistic.diary.all.length) {
      if (
        diary.date.year == dateToModify.getFullYear() &&
        diary.date.month == dateToModify.getMonth() &&
        diary.date.day == dateToModify.getDate()
      ) {
        _this.diary = d;
        isfound = true;
      }
    }
    if (!isFound) {
      _this.diary = {
        date: {
          year: dateToModify.getFullYear(),
          month: dateToModify.getMonth(),
          day: dateToModify.getDate()
        },
        title: "",
        author: this.$store.state.user,
        mood: "开心",
        weather: "晴天",
        tag: "python,array",
        body: "今天我学习了Python，收获匪浅。",
        favor: true
      };
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
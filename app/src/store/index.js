import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    token: "",
    basic: {
      avatar: "",
      diaryname: "",
      feeling: "",
    },
    diaries: {
      all: [],
      favor: [],
    },
    moods: [],
    weathers: [],
    tags: [],
    dateToModify: new Date(),
    isExist: false,
  },
  mutations: {
    setDateToModify(state, dateToModify) {
      state.dateToModify = dateToModify;
    },
    setDateToModifyByString(state, str) {
      state.dateToModify = new Date(str);
    },
    pushDiary(state, diary) {
      for (let i in state.diaries.all) {
        let obj = state.diaries.all[i];
        if (
          obj.date.year == diary.date.year &&
          obj.date.month == diary.date.month &&
          obj.date.day == diary.date.day
        ) {
          state.diaries.all.splice(i, 1);
        }
      }
      for (let i in state.diaries.favor) {
        let obj = state.diaries.all[i];
        if (
          obj.date.year == diary.date.year &&
          obj.date.month == diary.date.month &&
          obj.date.day == diary.date.day
        ) {
          state.diaries.favor.splice(i, 1);
        }
      }
      state.diaries.all.push(diary);
      if (diary.favor) {
        state.diaries.favor.push(diary);
      }
      let isChange = false;
      for (let m of state.moods) {
        if (m.value == diary.mood) {
          m.count++;
          isChange = true;
        }
      }
      if (!isChange)
        state.moods.push({
          value: diary.mood,
          count: 1,
        });
      isChange = false;
      for (let w of state.weathers) {
        if (w.value == diary.weather) {
          w.count++;
          isChange = true;
        }
      }
      if (!isChange)
        state.weathers.push({
          value: diary.weather,
          count: 1,
        });
    },
    login(state, { user, token, basic, diaries, moods, weathers, tags }) {
      state.user = user;
      state.token = token;
      state.basic = basic;
      state.diaries = diaries;
      state.moods = moods;
      state.weathers = weathers;
      state.tags = tags;
    },
  },
  getters: {
    countAllDiary(state) {
      return state.diaries.all.length;
    },
    countFavorDiary(state) {
      return state.diaries.favor.length;
    },
    getAllDiaries(state) {
      return state.diaries.all;
    },
    getFavorDiaries(state) {
      return state.diaries.favor;
    },
    getMoods(state) {
      return state.moods;
    },
    getWeathers(state) {
      return state.weathers;
    },
    getTags(state) {
      return state.tags;
    },
    getDateToModify(state) {
      return state.dateToModify;
    },
    getDateToModifyString(state) {
      var d = state.dateToModify;
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    },
  },
});

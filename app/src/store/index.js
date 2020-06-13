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
    dateToModify: null,
  },
  mutations: {
    setDateToModify(state, dateToModify) {
      state.dateToModify = dateToModify;
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
  getters:{
    
  },
});

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//vant import
import {
  Tabbar,
  TabbarItem,
  Col,
  Row,
  Tab,
  Tabs,
  Icon,
  NavBar,
  DatetimePicker,
  Uploader,
  Popup,
  Button,
  Form,
  Field,
  Switch,
  Divider,
} from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(DatetimePicker);
Vue.use(Uploader);
Vue.use(Popup);
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(Switch);
Vue.use(Divider);

//fontawesome import
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSmileBeam,
  faCloud,
  faHeart,
  faTag,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
library.add(faSmileBeam, faCloud, faHeart, faTag, faEllipsisH);
Vue.component("font-awesome-icon", FontAwesomeIcon);

//axios import and set
import axios from "axios";
Vue.prototype.$axios = axios;
// import VueAxios from "vue-axios";
// Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

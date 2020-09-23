import Vue from "vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VueSimpleAlert from "vue-simple-alert";

import App from "./App.vue";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

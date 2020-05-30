import Vue from "vue";
import App from "@/App.vue";

import {Loading} from "element-ui";

Vue.use(Loading.directive);
Vue.config.productionTip = false;


import {reset} from "@/utils/reset";

reset();
import "@/style/media.scss";

import "mint-ui/lib/style.css";
import "element-ui/lib/theme-chalk/index.css";

import MintUI from "mint-ui";

Vue.use(MintUI);


new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from "vue";
import App from "@/App.vue";

import {Loading} from "element-ui";

Vue.use(Loading.directive);
Vue.config.productionTip = false;
import "@/style/media.scss";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from 'element-ui';


Vue.use(ElementUI);


new Vue({
  render: h => h(App),
}).$mount('#app')

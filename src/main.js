import Vue from 'vue'
import VueRouter from 'vue-router'
import Amplify from "@aws-amplify/core";
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import { DataStore } from "@aws-amplify/datastore";

import App from './App.vue'
import router from "./router";


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



Amplify.configure(aws_exports);
DataStore.configure(aws_exports);

Amplify.Logger.LOG_LEVEL = 'DEBUG';

Vue.config.productionTip = false;

Vue.prototype.$Amplify = Amplify;

Vue.use(VueRouter);


// Enable the FontAwesomeIcon component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Amplify);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



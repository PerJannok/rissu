import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import Amplify from 'aws-amplify';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fab, fas, far);

Amplify.configure(aws_exports);

Vue.config.productionTip = false;

Vue.prototype.$Amplify = Amplify;

// Enable the FontAwesomeIcon component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



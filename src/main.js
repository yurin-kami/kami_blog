import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, fab);

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app')


import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueAxios from 'vue-axios'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'


axios.defaults.baseURL = '/api'
const app = createApp(App)
installElementPlus(app)
app
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .mount('#app')

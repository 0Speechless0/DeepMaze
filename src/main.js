import { createApp } from 'vue'
import MainPage from './MainPage.vue'
import router from './router'
// import bootstrap from 'bootstrap'
// import './assets/main.css'

const app = createApp(MainPage)

app.use(router)

app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import './components/axios'
import '@/css/index.css'


const pinia = createPinia()
const app = createApp(App)
app.use(Quasar, quasarUserOptions)

app.use(router)
app.use(pinia)

app.mount('#app')

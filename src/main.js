import { createApp, markRaw } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import './config/axios'
import './config/echo'
import '@/css/index.css'
import Plugin from '@quasar/quasar-ui-qcalendar/src/QCalendarDay.js'

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
const app = createApp(App)
app.use(Quasar, quasarUserOptions)
app.use(Plugin)
app.use(router)
app.use(pinia)

app.mount('#app')

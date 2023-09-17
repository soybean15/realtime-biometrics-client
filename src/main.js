import { createApp, markRaw } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import './components/axios'
import '@/css/index.css'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'





Pusher.logToConsole = true

console.log(process.env.VUE_APP_PUSHER_APP_KEY)
window.echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_APP_KEY,
    cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER ?? 'mt1',
    wsHost: process.env.VUE_APP_PUSHER_HOST ? process.env.VUE_APP_PUSHER_HOST : `ws-${process.env.VUE_APP_PUSHER_APP_CLUSTER}.pusher.com`,
    wsPort: process.env.VUE_APP_PUSHER_PORT ?? 80,
    wssPort: process.env.VUE_APP_PUSHER_PORT ?? 443,
    forceTLS: (process.env.VUE_APP_PUSHER_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
})


const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
const app = createApp(App)
app.use(Quasar, quasarUserOptions)

app.use(router)
app.use(pinia)

app.mount('#app')

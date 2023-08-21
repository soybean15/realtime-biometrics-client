import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import quasarUserOptions from './quasar-user-options'


const pinia = createPinia()
const app = createApp(App)
app.use(Quasar, quasarUserOptions)

app.use(pinia)

app.mount('#app')

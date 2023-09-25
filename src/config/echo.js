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

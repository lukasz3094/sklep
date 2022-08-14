import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import store from "./store"
import router from "./router"
import { currency } from "./globals/currency"

let app = createApp(App)
app.config.globalProperties.currency = currency
app.use(router).use(store)
app.mount("#app")

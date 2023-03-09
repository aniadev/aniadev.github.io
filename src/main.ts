import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// CSS framework
import './style.css'
import '@/assets/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia'
const pinia = createPinia()

app.use(ElementPlus)
app.use(pinia)
app.mount('#app')

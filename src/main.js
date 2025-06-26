import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import WelcomeView from './views/WelcomeView.vue'
import LemonView from './views/LemonView.vue'
import LimeView from './views/LimeView.vue'
import DisplayView from './views/DisplayView.vue'

const routes = [
  { path: '/', component: WelcomeView },
  { path: '/lemon', component: LemonView },
  { path: '/lime', component: LimeView },
  { path: '/display', component: DisplayView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
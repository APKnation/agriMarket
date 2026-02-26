import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { useAuthStore } from './stores/auth'
import './style.css'

// Import mock WebSocket for development
import './services/mock-websocket.js'

// Import toast notifications
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Configure toast notifications
app.use(Toast, {
  timeout: 4000,
  position: 'top-right',
  closeOnClick: true,
  pauseOnHover: true,
  hideProgressBar: false,
  icon: true,
  rtl: false
})

// Initialize auth store to load user from localStorage
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')

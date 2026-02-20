<template>
  <header class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md border-b border-slate-700/50 fixed top-0 left-0 right-0 z-50 shadow-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <router-link to="/dashboard" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-6">
              <span class="text-white font-bold text-xl">🌾</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">SFMP</h1>
              <p class="text-xs text-slate-400 font-medium">Tanzania</p>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.to"
            class="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-slate-600/30 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20"
            :class="$route.name === item.name ? 'bg-emerald-500/20 text-white border-emerald-400/50' : 'text-slate-300 hover:text-white'"
          >
            <component :is="item.icon" class="w-4 h-4" />
            <span>{{ item.label }}</span>
          </router-link>
        </nav>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="relative p-2 text-slate-400 hover:text-emerald-400 transition-all duration-300 rounded-xl hover:bg-slate-700/50">
            <Bell class="w-5 h-5" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          </button>

          <!-- Language Switcher -->
          <button
            @click="toggleLanguage"
            class="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-slate-600/30 hover:border-emerald-500/50 hover:bg-emerald-500/10"
          >
            <Globe class="w-4 h-4" />
            <span class="text-slate-300">{{ languageStore.currentLanguage === 'en' ? 'EN' : 'SW' }}</span>
          </button>

          <!-- User Dropdown -->
          <div class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-700/50 transition-all duration-300 border border-slate-600/30"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <span class="text-white text-sm font-medium">{{ userInitials }}</span>
              </div>
              <ChevronDown class="w-4 h-4 text-slate-400" />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/50 py-2"
            >
              <router-link
                to="/profile"
                class="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-emerald-500/20 transition-all duration-300 rounded-xl"
              >
                <User class="w-4 h-4" />
                <span>Profile</span>
              </router-link>
              <router-link
                to="/settings"
                class="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-emerald-500/20 transition-all duration-300 rounded-xl"
              >
                <Settings class="w-4 h-4" />
                <span>Settings</span>
              </router-link>
              <hr class="my-2 border-slate-600/30" />
              <button
                @click="handleLogout"
                class="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-300 rounded-xl w-full text-left"
              >
                <LogOut class="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-slate-400 hover:text-emerald-400 transition-all duration-300 rounded-xl"
        >
          <Menu class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="showMobileMenu"
      class="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-slate-600/30"
    >
      <div class="px-4 py-3 space-y-2">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium w-full transition-all duration-300 backdrop-blur-sm border border-slate-600/30 hover:border-emerald-500/50"
          :class="$route.name === item.name ? 'bg-emerald-500/20 text-white border-emerald-400/50' : 'text-slate-300 hover:text-white'"
          @click="showMobileMenu = false"
        >
          <component :is="item.icon" class="w-4 h-4" />
          <span>{{ item.label }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLanguageStore } from '@/stores/language'
import {
  Home,
  Users,
  Sprout,
  ShoppingBag,
  ClipboardList,
  BarChart3,
  Bell,
  Globe,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const languageStore = useLanguageStore()

const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const userInitials = computed(() => {
  if (!authStore.user?.name) return 'U'
  return authStore.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
})

const navigationItems = computed(() => {
  const items = [
    { name: 'dashboard', label: languageStore.t('dashboard'), to: '/dashboard', icon: Home },
  ]

  if (authStore.isAdmin || authStore.isCooperative) {
    items.push({ name: 'farmers', label: languageStore.t('farmers'), to: '/farmers', icon: Users })
  }

  if (authStore.isFarmer || authStore.isAdmin || authStore.isCooperative) {
    items.push({ name: 'crops', label: languageStore.t('crops'), to: '/crops', icon: Sprout })
  }

  items.push({ name: 'products', label: languageStore.t('products'), to: '/products', icon: ShoppingBag })
  items.push({ name: 'orders', label: languageStore.t('orders'), to: '/orders', icon: ClipboardList })

  if (authStore.isAdmin || authStore.isCooperative) {
    items.push({ name: 'analytics', label: languageStore.t('analytics'), to: '/analytics', icon: BarChart3 })
  }

  return items
})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleLanguage = () => {
  const newLang = languageStore.currentLanguage === 'en' ? 'sw' : 'en'
  languageStore.setLanguage(newLang)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.relative')) {
    showUserMenu.value = false
  }
})
</script>

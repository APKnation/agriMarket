<template>
  <header class="bg-white shadow-md border-b border-earth-200 fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <router-link to="/dashboard" class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">🌾</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">SFMP</h1>
              <p class="text-xs text-gray-500">Tanzania</p>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.to"
            class="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="$route.name === item.name ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'"
          >
            <component :is="item.icon" class="w-4 h-4" />
            <span>{{ item.label }}</span>
          </router-link>
        </nav>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
            <Bell class="w-5 h-5" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- Language Switcher -->
          <button
            @click="toggleLanguage"
            class="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            <Globe class="w-4 h-4" />
            <span>{{ languageStore.currentLanguage === 'en' ? 'EN' : 'SW' }}</span>
          </button>

          <!-- User Dropdown -->
          <div class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ userInitials }}</span>
              </div>
              <ChevronDown class="w-4 h-4 text-gray-600" />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
            >
              <router-link
                to="/profile"
                class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User class="w-4 h-4" />
                <span>Profile</span>
              </router-link>
              <router-link
                to="/settings"
                class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings class="w-4 h-4" />
                <span>Settings</span>
              </router-link>
              <hr class="my-1 border-gray-200" />
              <button
                @click="handleLogout"
                class="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
              >
                <LogOut class="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-primary-600"
          >
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="showMobileMenu"
      class="md:hidden bg-white border-t border-gray-200"
    >
      <div class="px-4 py-2 space-y-1">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium w-full"
          :class="$route.name === item.name ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'"
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

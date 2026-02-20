<template>
  <div class="min-h-screen bg-earth-50">
    <!-- Page Header -->
    <div class="page-header px-6 py-8">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">{{ languageStore.t('dashboard') }}</h1>
          <p class="text-primary-100 mt-2">
            {{ languageStore.t('welcomeBack') }}, {{ authStore.user?.name }}! {{ languageStore.t('overview') }}
          </p>
        </div>
        <div class="flex space-x-3">
          <button
            @click="showAddModal = true"
            class="btn-primary"
          >
            <Plus class="w-4 h-4 mr-2" />
            {{ languageStore.t('addFarmer') }}
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{{ languageStore.t('totalFarmers') }}</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.totalFarmers }}</p>
              <p class="text-xs text-green-600 mt-1">+12% {{ languageStore.t('fromLastMonth') }}</p>
            </div>
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Users class="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{{ languageStore.t('activeCrops') }}</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.activeCrops }}</p>
              <p class="text-xs text-green-600 mt-1">+8% {{ languageStore.t('fromLastMonth') }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Sprout class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{{ languageStore.t('productsListed') }}</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.productsListed }}</p>
              <p class="text-xs text-green-600 mt-1">+25% {{ languageStore.t('fromLastMonth') }}</p>
            </div>
            <div class="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
              <ShoppingBag class="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{{ languageStore.t('totalRevenue') }}</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">TZS {{ stats.totalRevenue.toLocaleString() }}</p>
              <p class="text-xs text-green-600 mt-1">+18% {{ languageStore.t('fromLastMonth') }}</p>
            </div>
            <div class="w-12 h-12 bg-earth-100 rounded-full flex items-center justify-center">
              <TrendingUp class="w-6 h-6 text-earth-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Chart Section -->
        <div class="lg:col-span-2">
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Monthly Overview</h2>
            <div class="h-64">
              <canvas ref="chartCanvas"></canvas>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ languageStore.t('recentActivity') }}</h2>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-start space-x-3"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                :class="activity.iconBg"
              >
                <component :is="activity.icon" :class="activity.iconColor" class="w-4 h-4" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-xs text-gray-500">{{ activity.description }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ languageStore.t('quickActions') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <router-link
            v-for="action in quickActions"
            :key="action.title"
            :to="action.to"
            class="card p-6 hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                :class="action.iconBg"
              >
                <component :is="action.icon" :class="action.iconColor" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-medium text-gray-900">{{ action.title }}</h3>
                <p class="text-sm text-gray-500">{{ action.description }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useLanguageStore } from '@/stores/language'
import { useFarmersStore } from '@/stores/farmers'
import { useCropsStore } from '@/stores/crops'
import { useProductsStore } from '@/stores/products'
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
  Menu,
  Plus,
  Eye,
  Package,
  DollarSign,
  UserPlus,
  Leaf,
  ShoppingCart
} from 'lucide-vue-next'

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const farmersStore = useFarmersStore()
const cropsStore = useCropsStore()
const productsStore = useProductsStore()

const chartCanvas = ref(null)

const stats = computed(() => ({
  totalFarmers: farmersStore.getFarmers().length,
  activeCrops: cropsStore.getCrops().filter(crop => crop.status === 'growing').length,
  productsListed: productsStore.getProducts().filter(product => product.available).length,
  totalRevenue: 4500000 // Mock data
}))

const recentActivities = ref([
  {
    id: 1,
    title: 'New Farmer Registration',
    description: 'David Kimaro joined the platform',
    time: '2 hours ago',
    icon: UserPlus,
    iconColor: 'text-primary-600',
    iconBg: 'bg-primary-100'
  },
  {
    id: 2,
    title: 'Crop Harvested',
    description: 'John Mwangi harvested 750kg of beans',
    time: '4 hours ago',
    icon: Leaf,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100'
  },
  {
    id: 3,
    title: 'New Order Placed',
    description: 'Mary Market ordered 200kg of maize',
    time: '6 hours ago',
    icon: ShoppingCart,
    iconColor: 'text-accent-600',
    iconBg: 'bg-accent-100'
  },
  {
    id: 4,
    title: 'Payment Received',
    description: 'Payment of TZS 300,000 processed',
    time: '1 day ago',
    icon: DollarSign,
    iconColor: 'text-earth-600',
    iconBg: 'bg-earth-100'
  }
])

const quickActions = computed(() => {
  const actions = [
    {
      title: languageStore.t('registerFarmer'),
      description: 'Add a new farmer to the system',
      to: '/farmers',
      icon: UserPlus,
      iconColor: 'text-primary-600',
      iconBg: 'bg-primary-100'
    },
    {
      title: languageStore.t('addCrop'),
      description: 'Register a new crop planting',
      to: '/crops',
      icon: Plus,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      title: languageStore.t('listProduct'),
      description: 'Add products to marketplace',
      to: '/products/new',
      icon: Package,
      iconColor: 'text-accent-600',
      iconBg: 'bg-accent-100'
    }
  ]

  if (authStore.isFarmer) {
    return actions.filter(action => 
      ['registerFarmer', 'addCrop', 'listProduct'].includes(action.title.replace(/[^a-zA-Z]/g, ''))
    )
  }

  return actions
})

onMounted(() => {
  // Initialize chart
  if (chartCanvas.value) {
    // Simple chart implementation
    const ctx = chartCanvas.value.getContext('2d')
    // Chart.js would be implemented here
  }
})
</script>

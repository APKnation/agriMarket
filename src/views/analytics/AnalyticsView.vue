<template>
  <div class="min-h-screen bg-earth-50">
    <!-- Page Header -->
    <div class="page-header px-6 py-8">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Analytics Dashboard</h1>
          <p class="text-primary-100 mt-2">Comprehensive insights and reporting</p>
        </div>
        <div class="flex space-x-3">
          <select v-model="dateRange" class="input-field">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <button @click="exportReport" class="btn-secondary">
            <Download class="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">TZS {{ metrics.totalRevenue.toLocaleString() }}</p>
              <p class="text-xs text-green-600 mt-1">+{{ metrics.revenueGrowth }}% from last period</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Active Farmers</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ metrics.activeFarmers }}</p>
              <p class="text-xs text-green-600 mt-1">+{{ metrics.farmerGrowth }}% from last period</p>
            </div>
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Users class="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Products Sold</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ metrics.productsSold }}</p>
              <p class="text-xs text-green-600 mt-1">+{{ metrics.salesGrowth }}% from last period</p>
            </div>
            <div class="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
              <ShoppingCart class="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">TZS {{ metrics.avgOrderValue.toLocaleString() }}</p>
              <p class="text-xs text-green-600 mt-1">+{{ metrics.orderValueGrowth }}% from last period</p>
            </div>
            <div class="w-12 h-12 bg-earth-100 rounded-full flex items-center justify-center">
              <TrendingUp class="w-6 h-6 text-earth-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Revenue Chart -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
          <div class="h-64">
            <canvas ref="revenueChart"></canvas>
          </div>
        </div>

        <!-- Crop Distribution -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Crop Distribution</h2>
          <div class="h-64">
            <canvas ref="cropChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Regional Performance -->
      <div class="card p-6 mb-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="region in regionalData"
            :key="region.name"
            class="border rounded-lg p-4"
          >
            <h3 class="font-medium text-gray-900 mb-3">{{ region.name }}</h3>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Farmers:</span>
                <span class="font-medium">{{ region.farmers }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Revenue:</span>
                <span class="font-medium">TZS {{ region.revenue.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Orders:</span>
                <span class="font-medium">{{ region.orders }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Performers -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Top Farmers -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Top Farmers</h2>
          <div class="space-y-3">
            <div
              v-for="(farmer, index) in topFarmers"
              :key="farmer.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">{{ index + 1 }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ farmer.name }}</p>
                  <p class="text-sm text-gray-500">{{ farmer.location }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">TZS {{ farmer.revenue.toLocaleString() }}</p>
                <p class="text-sm text-gray-500">{{ farmer.orders }} orders</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Products -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
          <div class="space-y-3">
            <div
              v-for="(product, index) in topProducts"
              :key="product.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">{{ index + 1 }}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-sm text-gray-500">{{ product.category }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">{{ product.quantity }} sold</p>
                <p class="text-sm text-gray-500">TZS {{ (product.quantity * product.price).toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  Download,
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp
} from 'lucide-vue-next'

const authStore = useAuthStore()
const dateRange = ref('30')
const revenueChart = ref(null)
const cropChart = ref(null)

const metrics = ref({
  totalRevenue: 12500000,
  revenueGrowth: 18,
  activeFarmers: 1247,
  farmerGrowth: 12,
  productsSold: 8450,
  salesGrowth: 25,
  avgOrderValue: 285000,
  orderValueGrowth: 8
})

const regionalData = ref([
  { name: 'Arusha', farmers: 342, revenue: 4500000, orders: 156 },
  { name: 'Dar es Salaam', farmers: 289, revenue: 3800000, orders: 142 },
  { name: 'Morogoro', farmers: 198, revenue: 2200000, orders: 89 },
  { name: 'Dodoma', farmers: 156, revenue: 1200000, orders: 67 },
  { name: 'Mwanza', farmers: 134, revenue: 800000, orders: 45 }
])

const topFarmers = ref([
  { id: 1, name: 'John Mwangi', location: 'Arusha', revenue: 1250000, orders: 23 },
  { id: 2, name: 'Mary Joseph', location: 'Morogoro', revenue: 980000, orders: 18 },
  { id: 3, name: 'David Kimaro', location: 'Dodoma', revenue: 750000, orders: 15 }
])

const topProducts = ref([
  { id: 1, name: 'Fresh Maize Kernels', category: 'Grains', quantity: 2500, price: 1500 },
  { id: 2, name: 'Organic Beans', category: 'Legumes', quantity: 1800, price: 3500 },
  { id: 3, name: 'Fresh Tomatoes', category: 'Vegetables', quantity: 1200, price: 2500 }
])

const exportReport = () => {
  window.addNotification({
    type: 'success',
    title: 'Report Exported',
    message: 'Analytics report has been downloaded successfully.'
  })
}

onMounted(() => {
  // Initialize charts
  if (revenueChart.value) {
    // Revenue chart implementation
  }
  if (cropChart.value) {
    // Crop distribution chart implementation
  }
})
</script>

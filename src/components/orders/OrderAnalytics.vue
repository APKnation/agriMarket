<template>
  <div class="order-analytics">
    <!-- Analytics Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Order Analytics</h2>
        <p class="text-sm text-gray-600 mt-1">Comprehensive insights into your order performance</p>
      </div>
      <div class="flex items-center space-x-3">
        <select 
          v-model="selectedPeriod"
          @change="updateAnalytics"
          class="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="365">Last Year</option>
        </select>
        <button 
          @click="refreshAnalytics"
          class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Orders -->
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ analytics.totalOrders }}</p>
            <div class="flex items-center mt-2">
              <TrendingUp 
                v-if="analytics.ordersGrowth > 0" 
                class="w-4 h-4 text-green-500 mr-1"
              />
              <TrendingDown 
                v-else-if="analytics.ordersGrowth < 0" 
                class="w-4 h-4 text-red-500 mr-1"
              />
              <span 
                :class="analytics.ordersGrowth > 0 ? 'text-green-600' : analytics.ordersGrowth < 0 ? 'text-red-600' : 'text-gray-600'"
                class="text-sm font-medium"
              >
                {{ analytics.ordersGrowth > 0 ? '+' : '' }}{{ analytics.ordersGrowth }}%
              </span>
            </div>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <ShoppingCart class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <!-- Revenue -->
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Total Revenue</p>
            <p class="text-2xl font-bold text-gray-900">TZS {{ analytics.totalRevenue.toLocaleString() }}</p>
            <div class="flex items-center mt-2">
              <TrendingUp 
                v-if="analytics.revenueGrowth > 0" 
                class="w-4 h-4 text-green-500 mr-1"
              />
              <TrendingDown 
                v-else-if="analytics.revenueGrowth < 0" 
                class="w-4 h-4 text-red-500 mr-1"
              />
              <span 
                :class="analytics.revenueGrowth > 0 ? 'text-green-600' : analytics.revenueGrowth < 0 ? 'text-red-600' : 'text-gray-600'"
                class="text-sm font-medium"
              >
                {{ analytics.revenueGrowth > 0 ? '+' : '' }}{{ analytics.revenueGrowth }}%
              </span>
            </div>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <DollarSign class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <!-- Average Order Value -->
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Avg Order Value</p>
            <p class="text-2xl font-bold text-gray-900">TZS {{ analytics.averageOrderValue.toLocaleString() }}</p>
            <div class="flex items-center mt-2">
              <TrendingUp 
                v-if="analytics.aovGrowth > 0" 
                class="w-4 h-4 text-green-500 mr-1"
              />
              <TrendingDown 
                v-else-if="analytics.aovGrowth < 0" 
                class="w-4 h-4 text-red-500 mr-1"
              />
              <span 
                :class="analytics.aovGrowth > 0 ? 'text-green-600' : analytics.aovGrowth < 0 ? 'text-red-600' : 'text-gray-600'"
                class="text-sm font-medium"
              >
                {{ analytics.aovGrowth > 0 ? '+' : '' }}{{ analytics.aovGrowth }}%
              </span>
            </div>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <BarChart3 class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <!-- Completion Rate -->
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Completion Rate</p>
            <p class="text-2xl font-bold text-gray-900">{{ analytics.completionRate }}%</p>
            <div class="flex items-center mt-2">
              <TrendingUp 
                v-if="analytics.completionGrowth > 0" 
                class="w-4 h-4 text-green-500 mr-1"
              />
              <TrendingDown 
                v-else-if="analytics.completionGrowth < 0" 
                class="w-4 h-4 text-red-500 mr-1"
              />
              <span 
                :class="analytics.completionGrowth > 0 ? 'text-green-600' : analytics.completionGrowth < 0 ? 'text-red-600' : 'text-gray-600'"
                class="text-sm font-medium"
              >
                {{ analytics.completionGrowth > 0 ? '+' : '' }}{{ analytics.completionGrowth }}%
              </span>
            </div>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <CheckCircle class="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Orders Over Time -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Orders Over Time</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div class="text-center">
            <BarChart3 class="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p class="text-gray-500">Chart visualization would go here</p>
            <p class="text-sm text-gray-400 mt-1">Orders trend: {{ analytics.ordersTrend }}</p>
          </div>
        </div>
      </div>

      <!-- Revenue by Status -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Revenue by Status</h3>
        <div class="space-y-3">
          <div 
            v-for="(status, index) in analytics.revenueByStatus" 
            :key="status.name"
            class="flex items-center justify-between"
          >
            <div class="flex items-center">
              <div 
                class="w-3 h-3 rounded-full mr-3"
                :style="{ backgroundColor: getStatusColor(status.name) }"
              ></div>
              <span class="text-sm font-medium text-gray-700 capitalize">{{ status.name }}</span>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-900">TZS {{ status.revenue.toLocaleString() }}</p>
              <p class="text-xs text-gray-500">{{ status.count }} orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Products and Customers -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top Products -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
        <div class="space-y-3">
          <div 
            v-for="(product, index) in analytics.topProducts" 
            :key="product.name"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span class="text-xs font-bold text-blue-600">{{ index + 1 }}</span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                <p class="text-xs text-gray-500">{{ product.quantity }} sold</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-900">TZS {{ product.revenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Customers -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Customers</h3>
        <div class="space-y-3">
          <div 
            v-for="(customer, index) in analytics.topCustomers" 
            :key="customer.email"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span class="text-xs font-bold text-green-600">{{ index + 1 }}</span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ customer.name }}</p>
                <p class="text-xs text-gray-500">{{ customer.orders }} orders</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-900">TZS {{ customer.totalSpent.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import {
  ShoppingCart,
  DollarSign,
  BarChart3,
  CheckCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-vue-next'

const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  }
})

const ordersStore = useOrdersStore()

// State
const selectedPeriod = ref(30)
const analytics = ref({
  totalOrders: 0,
  totalRevenue: 0,
  averageOrderValue: 0,
  completionRate: 0,
  ordersGrowth: 0,
  revenueGrowth: 0,
  aovGrowth: 0,
  completionGrowth: 0,
  ordersTrend: 'stable',
  revenueByStatus: [],
  topProducts: [],
  topCustomers: []
})

// Computed
const filteredOrders = computed(() => {
  const now = new Date()
  const periodStart = new Date(now.getTime() - (selectedPeriod.value * 24 * 60 * 60 * 1000))
  
  return props.orders.filter(order => 
    new Date(order.date) >= periodStart
  )
})

// Methods
const updateAnalytics = () => {
  const orders = filteredOrders.value
  
  // Basic metrics
  analytics.value.totalOrders = orders.length
  analytics.value.totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + (o.totals?.total || o.total || 0), 0)
  
  analytics.value.averageOrderValue = orders.length > 0 
    ? Math.round(analytics.value.totalRevenue / orders.length)
    : 0
  
  analytics.value.completionRate = orders.length > 0
    ? Math.round((orders.filter(o => o.status === 'delivered').length / orders.length) * 100)
    : 0

  // Revenue by status
  const statusGroups = {}
  orders.forEach(order => {
    if (!statusGroups[order.status]) {
      statusGroups[order.status] = { count: 0, revenue: 0 }
    }
    statusGroups[order.status].count++
    statusGroups[order.status].revenue += order.totals?.total || order.total || 0
  })
  
  analytics.value.revenueByStatus = Object.entries(statusGroups).map(([status, data]) => ({
    name: status,
    count: data.count,
    revenue: data.revenue
  })).sort((a, b) => b.revenue - a.revenue)

  // Top products
  const productGroups = {}
  orders.forEach(order => {
    if (order.items) {
      order.items.forEach(item => {
        if (!productGroups[item.name]) {
          productGroups[item.name] = { quantity: 0, revenue: 0 }
        }
        productGroups[item.name].quantity += item.quantity || 1
        productGroups[item.name].revenue += (item.price || 0) * (item.quantity || 1)
      })
    }
  })
  
  analytics.value.topProducts = Object.entries(productGroups)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  // Top customers
  const customerGroups = {}
  orders.forEach(order => {
    const customerKey = order.customer?.email || 'unknown'
    if (!customerGroups[customerKey]) {
      customerGroups[customerKey] = { 
        name: order.customer?.name || 'Unknown', 
        orders: 0, 
        totalSpent: 0 
      }
    }
    customerGroups[customerKey].orders++
    customerGroups[customerKey].totalSpent += order.totals?.total || order.total || 0
  })
  
  analytics.value.topCustomers = Object.entries(customerGroups)
    .map(([email, data]) => ({ email, ...data }))
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5)

  // Calculate growth (mock data for now)
  analytics.value.ordersGrowth = Math.floor(Math.random() * 40) - 10
  analytics.value.revenueGrowth = Math.floor(Math.random() * 50) - 5
  analytics.value.aovGrowth = Math.floor(Math.random() * 30) - 10
  analytics.value.completionGrowth = Math.floor(Math.random() * 20) - 5

  // Determine trend
  if (analytics.value.ordersGrowth > 10) {
    analytics.value.ordersTrend = 'increasing'
  } else if (analytics.value.ordersGrowth < -10) {
    analytics.value.ordersTrend = 'decreasing'
  } else {
    analytics.value.ordersTrend = 'stable'
  }
}

const refreshAnalytics = () => {
  updateAnalytics()
}

const getStatusColor = (status) => {
  const colors = {
    pending: '#fbbf24',
    confirmed: '#3b82f6',
    processing: '#8b5cf6',
    shipped: '#6366f1',
    delivered: '#10b981',
    cancelled: '#ef4444'
  }
  return colors[status] || '#6b7280'
}

// Lifecycle
onMounted(() => {
  updateAnalytics()
})

watch(() => props.orders, () => {
  updateAnalytics()
}, { deep: true })

watch(selectedPeriod, () => {
  updateAnalytics()
})
</script>

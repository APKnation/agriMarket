<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="w-16 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div class="p-4 border-b border-gray-200">
        <div class="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-lg">🌾</span>
        </div>
      </div>
      <nav class="flex-1 py-4">
        <router-link v-for="item in navigation" :key="item.name" :to="item.path"
          class="flex flex-col items-center py-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors group"
          :class="{ 'text-emerald-600 bg-emerald-50': $route.path === item.path }">
          <component :is="item.icon" class="w-6 h-6 mb-1" />
          <span class="text-xs font-medium">{{ item.name }}</span>
          <span v-if="item.badge" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {{ item.badge }}
          </span>
        </router-link>
      </nav>
      <div class="p-4 border-t border-gray-200">
        <div class="relative">
          <img src="https://images.unsplash.com/photo-1472099645785-5c8a8f4700b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1w&auto=format&fit=crop&w=150&q=80" 
               alt="Admin" class="w-10 h-10 rounded-full border-2 border-gray-300">
          <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Everything is working</span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input type="text" placeholder="Search..." 
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64">
              <Search class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button class="relative text-gray-600 hover:text-gray-900 transition-colors">
              <Bell class="w-6 h-6" />
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <img src="https://images.unsplash.com/photo-1472099645785-5c8a8f4700b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1w&auto=format&fit=crop&w=150&q=80" 
                   alt="Admin" class="w-8 h-8 rounded-full">
              <ChevronDown class="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 p-6 bg-gray-50">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign class="w-6 h-6 text-white" />
              </div>
              <div class="text-right">
                <span class="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">+23.5%</span>
                <div class="text-xs text-gray-500 mt-1">vs last month</div>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p class="text-3xl font-bold text-gray-900">TZS {{ formatNumber(metrics.totalRevenue) }}</p>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users class="w-6 h-6 text-white" />
              </div>
              <div class="text-right">
                <span class="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+18.2%</span>
                <div class="text-xs text-gray-500 mt-1">vs last month</div>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-600 mb-1">Active Farmers</p>
              <p class="text-3xl font-bold text-gray-900">{{ formatNumber(metrics.activeFarmers) }}</p>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingCart class="w-6 h-6 text-white" />
              </div>
              <div class="text-right">
                <span class="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">+31.4%</span>
                <div class="text-xs text-gray-500 mt-1">vs last month</div>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Orders</p>
              <p class="text-3xl font-bold text-gray-900">{{ formatNumber(metrics.totalOrders) }}</p>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp class="w-6 h-6 text-white" />
              </div>
              <div class="text-right">
                <span class="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">+12.8%</span>
                <div class="text-xs text-gray-500 mt-1">vs last month</div>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-600 mb-1">Avg Order Value</p>
              <p class="text-3xl font-bold text-gray-900">TZS {{ formatNumber(metrics.avgOrderValue) }}</p>
            </div>
          </div>
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
              <select v-model="chartType" @change="updateChart" class="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
                <option value="customers">Customers</option>
              </select>
            </div>
            <div class="h-80">
              <canvas ref="revenueChart"></canvas>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Customer Growth</h3>
              <div class="flex space-x-2">
                <button class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Day</button>
                <button class="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg">Week</button>
                <button class="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Month</button>
              </div>
            </div>
            <div class="h-80">
              <canvas ref="growthChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button class="text-emerald-600 hover:text-emerald-700 text-sm font-medium">View All</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ order.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img :src="order.customer.avatar" alt="" class="w-8 h-8 rounded-full mr-3">
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ order.customer.name }}</div>
                        <div class="text-xs text-gray-500">{{ order.customer.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.product }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TZS {{ order.amount.toLocaleString() }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(order.status)">
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { DollarSign, Users, ShoppingCart, TrendingUp, Search, Bell, ChevronDown, Home, BarChart3, Package, FileText, Settings } from 'lucide-vue-next'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js'

const router = useRouter()
const route = useRoute()

const navigation = ref([
  { name: 'Dashboard', path: '/analytics', icon: Home, badge: null },
  { name: 'Crops', path: '/crops', icon: ShoppingCart, badge: null },
  { name: 'Products', path: '/products', icon: Package, badge: null },
  { name: 'Orders', path: '/orders', icon: FileText, badge: '5' },
  { name: 'Farmers', path: '/farmers', icon: Users, badge: '12' },
  { name: 'Analytics', path: '/analytics', icon: BarChart3, badge: null },
  { name: 'Settings', path: '/settings', icon: Settings, badge: null }
])

const metrics = ref({
  totalRevenue: 45000000,
  activeFarmers: 1250,
  totalOrders: 1423,
  avgOrderValue: 5294
})

const chartType = ref('revenue')
const recentOrders = ref([
  { id: '#SFMP-001', customer: { name: 'John Mwangi', email: 'john@sfmp.tz', avatar: 'https://images.unsplash.com/photo-1472099645785-5c8a8f4700b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1w&auto=format&fit=crop&w=150&q=80' }, product: 'Maize', amount: 45000, status: 'Completed', date: '2024-01-15' },
  { id: '#SFMP-002', customer: { name: 'Sarah Kimani', email: 'sarah@sfmp.tz', avatar: 'https://images.unsplash.com/photo-1494790108752-1c8a8f4700b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1w&auto=format&fit=crop&w=150&q=80' }, product: 'Rice', amount: 32000, status: 'Processing', date: '2024-01-14' },
  { id: '#SFMP-003', customer: { name: 'Michael Joseph', email: 'michael@sfmp.tz', avatar: 'https://images.unsplash.com/photo-1507003211169-0c8a8f4700b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1w&auto=format&fit=crop&w=150&q=80' }, product: 'Tomatoes', amount: 28000, status: 'Pending', date: '2024-01-13' }
])

let revenueChartInstance = null
let growthChartInstance = null

const getStatusClass = (status) => {
  const classes = {
    'Completed': 'bg-green-100 text-green-800',
    'Processing': 'bg-yellow-100 text-yellow-800',
    'Pending': 'bg-orange-100 text-orange-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-TZ').format(num)
}

const initCharts = () => {
  setTimeout(() => {
    const revenueCtx = document.querySelector('canvas[ref="revenueChart"]')
    if (revenueCtx) {
      if (revenueChartInstance) revenueChartInstance.destroy()
      revenueChartInstance = new ChartJS(revenueCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Revenue (TZS)',
            data: [3200000, 3800000, 3500000, 4200000, 4800000, 5200000, 5800000],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: '#e5e7eb', borderColor: '#e5e7eb' }, ticks: { color: '#6b7280' } },
            y: { grid: { color: '#e5e7eb', borderColor: '#e5e7eb' }, ticks: { color: '#6b7280' } }
          }
        }
      })
    }

    const growthCtx = document.querySelector('canvas[ref="growthChart"]')
    if (growthCtx) {
      if (growthChartInstance) growthChartInstance.destroy()
      growthChartInstance = new ChartJS(growthCtx, {
        type: 'bar',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{
            label: 'New Customers',
            data: [65, 78, 90, 81],
            backgroundColor: '#10b981',
            borderColor: '#10b981',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: '#e5e7eb', borderColor: '#e5e7eb' }, ticks: { color: '#6b7280' } },
            y: { grid: { color: '#e5e7eb', borderColor: '#e5e7eb' }, ticks: { color: '#6b7280' } }
          }
        }
      })
    }
  }, 100)
}

const updateChart = () => {
  if (revenueChartInstance) {
    const datasets = {
      revenue: { label: 'Revenue (TZS)', data: [3200000, 3800000, 3500000, 4200000, 4800000, 5200000, 5800000], borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', tension: 0.4, fill: true },
      orders: { label: 'Orders', data: [120, 145, 130, 160, 180, 195, 210], borderColor: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.1)', tension: 0.4, fill: true },
      customers: { label: 'Customers', data: [800, 850, 900, 950, 1050, 1150, 1250], borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', tension: 0.4, fill: true }
    }
    revenueChartInstance.data.datasets = [datasets[chartType.value]]
    revenueChartInstance.update()
  }
}

onMounted(() => { initCharts() })
onUnmounted(() => {
  if (revenueChartInstance) revenueChartInstance.destroy()
  if (growthChartInstance) growthChartInstance.destroy()
})
</script>

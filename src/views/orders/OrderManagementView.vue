<template>
  <div class="min-h-screen bg-earth-50">
    <!-- Page Header -->
    <div class="page-header px-6 py-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold">Order Management</h1>
        <p class="text-primary-100 mt-2">Track and manage your orders</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Order Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Pending Orders</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ orderStats.pending }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock class="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Confirmed Orders</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ orderStats.confirmed }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle class="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Delivered Orders</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ orderStats.delivered }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Truck class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">TZS {{ orderStats.revenue.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
              <DollarSign class="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by order ID or customer..."
                class="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="statusFilter" class="input-field">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select v-model="dateFilter" class="input-field">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
            <select v-model="typeFilter" class="input-field">
              <option value="">All Types</option>
              <option value="purchase">Purchase Orders</option>
              <option value="sale">Sale Orders</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="order in filteredOrders"
                :key="order.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#{{ order.id }}</div>
                  <div class="text-sm text-gray-500">{{ order.type }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span class="text-xs font-medium">{{ getInitials(order.customer.name) }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ order.customer.name }}</div>
                      <div class="text-sm text-gray-500">{{ order.customer.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ order.items.length }} items
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ order.items.map(item => item.name).join(', ').substring(0, 30) }}...
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    TZS {{ order.total.toLocaleString() }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getStatusColor(order.status)"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewOrder(order)"
                      class="text-primary-600 hover:text-primary-900"
                    >
                      <Eye class="w-4 h-4" />
                    </button>
                    <button
                      v-if="canUpdateStatus(order)"
                      @click="updateOrderStatus(order)"
                      class="text-accent-600 hover:text-accent-900"
                    >
                      <Edit class="w-4 h-4" />
                    </button>
                    <button
                      @click="downloadInvoice(order)"
                      class="text-earth-600 hover:text-earth-900"
                    >
                      <Download class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Order Details Modal -->
      <div
        v-if="showOrderModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div class="relative top-10 mx-auto p-5 border max-w-4xl shadow-lg rounded-lg bg-white">
          <div v-if="selectedOrder" class="mt-3">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h3 class="text-xl font-bold text-gray-900">Order #{{ selectedOrder.id }}</h3>
                <p class="text-gray-600">{{ selectedOrder.type }} - {{ formatDate(selectedOrder.date) }}</p>
              </div>
              <button
                @click="showOrderModal = false"
                class="text-gray-400 hover:text-gray-600"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Customer Information -->
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">Customer Information</h4>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="font-medium">{{ selectedOrder.customer.name }}</p>
                    <p class="text-sm text-gray-600">{{ selectedOrder.customer.email }}</p>
                    <p class="text-sm text-gray-600">{{ selectedOrder.customer.phone }}</p>
                    <p class="text-sm text-gray-600">{{ selectedOrder.customer.location }}</p>
                  </div>
                </div>

                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">Delivery Information</h4>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-sm">{{ selectedOrder.delivery.address }}</p>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ selectedOrder.delivery.method }} - {{ selectedOrder.delivery.timeline }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Order Items -->
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Order Items</h4>
                <div class="space-y-3">
                  <div
                    v-for="item in selectedOrder.items"
                    :key="item.id"
                    class="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p class="font-medium">{{ item.name }}</p>
                      <p class="text-sm text-gray-600">{{ item.quantity }} {{ item.unit }} @ TZS {{ item.price.toLocaleString() }}</p>
                    </div>
                    <p class="font-medium">TZS {{ (item.quantity * item.price).toLocaleString() }}</p>
                  </div>
                </div>

                <!-- Order Summary -->
                <div class="mt-4 pt-4 border-t">
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Subtotal:</span>
                    <span>TZS {{ selectedOrder.subtotal.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Delivery Fee:</span>
                    <span>TZS {{ selectedOrder.deliveryFee.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>TZS {{ selectedOrder.total.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Actions -->
            <div class="mt-6 pt-6 border-t">
              <div class="flex justify-between items-center">
                <div>
                  <span
                    class="px-3 py-1 text-sm font-semibold rounded-full"
                    :class="getStatusColor(selectedOrder.status)"
                  >
                    {{ selectedOrder.status }}
                  </span>
                </div>
                <div class="flex space-x-3">
                  <button
                    v-if="canUpdateStatus(selectedOrder)"
                    @click="updateOrderStatus(selectedOrder)"
                    class="btn-primary"
                  >
                    Update Status
                  </button>
                  <button
                    @click="downloadInvoice(selectedOrder)"
                    class="btn-secondary"
                  >
                    <Download class="w-4 h-4 mr-2" />
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Update Modal -->
      <div
        v-if="showStatusModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Update Order Status</h3>
            <form @submit.prevent="saveStatusUpdate" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">New Status</label>
                <select v-model="newStatus" required class="input-field">
                  <option value="">Select status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  v-model="statusNotes"
                  rows="3"
                  class="input-field"
                  placeholder="Add any notes about this status update..."
                ></textarea>
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showStatusModal = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button type="submit" class="btn-primary">Update Status</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  Clock,
  CheckCircle,
  Truck,
  DollarSign,
  Search,
  Eye,
  Edit,
  Download,
  X
} from 'lucide-vue-next'

const authStore = useAuthStore()

const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('')
const typeFilter = ref('')

const showOrderModal = ref(false)
const showStatusModal = ref(false)
const selectedOrder = ref(null)
const newStatus = ref('')
const statusNotes = ref('')

// Mock orders data
const orders = ref([
  {
    id: 'ORD-001',
    type: 'Purchase Order',
    customer: {
      name: 'Mary Market',
      email: 'mary@market.com',
      phone: '+255 713 456 789',
      location: 'Dar es Salaam, Tanzania'
    },
    items: [
      { id: 1, name: 'Fresh Maize Kernels', quantity: 200, unit: 'kg', price: 1500 },
      { id: 2, name: 'Organic Beans', quantity: 100, unit: 'kg', price: 3500 }
    ],
    subtotal: 650000,
    deliveryFee: 50000,
    total: 700000,
    status: 'confirmed',
    date: '2024-05-15',
    delivery: {
      address: 'Kigamboni, Dar es Salaam',
      method: 'Truck Delivery',
      timeline: '2-3 business days'
    }
  },
  {
    id: 'ORD-002',
    type: 'Sale Order',
    customer: {
      name: 'John Buyer',
      email: 'john@buyer.com',
      phone: '+255 712 345 678',
      location: 'Arusha, Tanzania'
    },
    items: [
      { id: 3, name: 'Fresh Tomatoes', quantity: 150, unit: 'kg', price: 2500 }
    ],
    subtotal: 375000,
    deliveryFee: 30000,
    total: 405000,
    status: 'pending',
    date: '2024-05-16',
    delivery: {
      address: 'Njiro, Arusha',
      method: 'Pickup',
      timeline: 'Same day'
    }
  }
])

const orderStats = computed(() => ({
  pending: orders.value.filter(o => o.status === 'pending').length,
  confirmed: orders.value.filter(o => o.status === 'confirmed').length,
  delivered: orders.value.filter(o => o.status === 'delivered').length,
  revenue: orders.value.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0)
}))

const filteredOrders = computed(() => {
  let filtered = orders.value

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(order =>
      order.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Status filter
  if (statusFilter.value) {
    filtered = filtered.filter(order => order.status === statusFilter.value)
  }

  // Type filter
  if (typeFilter.value) {
    filtered = filtered.filter(order => order.type.toLowerCase().includes(typeFilter.value))
  }

  return filtered
})

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'confirmed': return 'bg-blue-100 text-blue-800'
    case 'processing': return 'bg-purple-100 text-purple-800'
    case 'shipped': return 'bg-indigo-100 text-indigo-800'
    case 'delivered': return 'bg-green-100 text-green-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const canUpdateStatus = (order) => {
  // Logic to determine if user can update status
  return authStore.isAdmin || authStore.isCooperative || (authStore.isFarmer && order.type === 'Sale Order')
}

const viewOrder = (order) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

const updateOrderStatus = (order) => {
  selectedOrder.value = order
  newStatus.value = order.status
  statusNotes.value = ''
  showOrderModal.value = false
  showStatusModal.value = true
}

const saveStatusUpdate = () => {
  if (selectedOrder.value) {
    selectedOrder.value.status = newStatus.value
    window.addNotification({
      type: 'success',
      title: 'Status Updated',
      message: `Order #${selectedOrder.value.id} status updated to ${newStatus.value}.`
    })
    showStatusModal.value = false
  }
}

const downloadInvoice = (order) => {
  // Mock invoice download
  window.addNotification({
    type: 'info',
    title: 'Invoice Downloaded',
    message: `Invoice for order #${order.id} has been downloaded.`
  })
}
</script>

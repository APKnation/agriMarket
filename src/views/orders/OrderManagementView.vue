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
      <!-- Order Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6 bg-yellow-50 border-yellow-200">
          <div class="flex items-center">
            <Clock class="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p class="text-sm text-yellow-600 font-medium">Pending</p>
              <p class="text-2xl font-bold text-yellow-900">{{ orderStats.pending }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6 bg-blue-50 border-blue-200">
          <div class="flex items-center">
            <CheckCircle class="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p class="text-sm text-blue-600 font-medium">Confirmed</p>
              <p class="text-2xl font-bold text-blue-900">{{ orderStats.confirmed }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6 bg-green-50 border-green-200">
          <div class="flex items-center">
            <Truck class="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p class="text-sm text-green-600 font-medium">Delivered</p>
              <p class="text-2xl font-bold text-green-900">{{ orderStats.delivered }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6 bg-purple-50 border-purple-200">
          <div class="flex items-center">
            <DollarSign class="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p class="text-sm text-purple-600 font-medium">Revenue</p>
              <p class="text-2xl font-bold text-purple-900">TZS {{ orderStats.revenue.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Delivered Orders Section -->
      <div v-if="deliveredOrders.length > 0" class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">🎉 Recently Delivered Orders</h2>
          <button 
            @click="showAllDelivered = !showAllDelivered"
            class="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            {{ showAllDelivered ? 'Show Less' : `View All (${deliveredOrders.length})` }}
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(order, index) in displayedDeliveredOrders" 
            :key="order.id"
            class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="font-semibold text-green-900">Order #{{ order.id }}</h3>
                <p class="text-sm text-green-700">{{ new Date(order.date).toLocaleDateString() }}</p>
              </div>
              <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                Delivered
              </span>
            </div>
            
            <div class="mb-3">
              <p class="text-sm font-medium text-gray-900">{{ order.customer.name }}</p>
              <p class="text-xs text-gray-600">{{ order.customer.location }}</p>
            </div>
            
            <div class="mb-3">
              <p class="text-xs text-gray-600 mb-1">Items: {{ order.items.length }}</p>
              <div class="text-xs text-gray-700">
                {{ order.items.slice(0, 2).map(item => item.name).join(', ') }}
                <span v-if="order.items.length > 2">+{{ order.items.length - 2 }} more</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center pt-3 border-t border-green-200">
              <div>
                <p class="text-lg font-bold text-green-900">TZS {{ order.total.toLocaleString() }}</p>
              </div>
              <div class="flex space-x-2">
                <button 
                  @click="viewOrder(order)"
                  class="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  View
                </button>
                <button 
                  @click="downloadInvoice(order)"
                  class="text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  PDF
                </button>
              </div>
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
      <div class="relative overflow-x-auto bg-white shadow-xs rounded-lg border border-gray-200">
        <table class="w-full text-sm text-left rtl:text-right text-gray-700">
          <thead class="text-sm text-gray-700 bg-gray-50 border-b border-gray-300">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input id="table-checkbox-all" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-green-500">
                  <label for="table-checkbox-all" class="sr-only">Table checkbox</label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Order ID
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Customer
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Products
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Total
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Status
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Date
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="order in filteredOrders"
              :key="order.id"
              class="bg-white border-b border-gray-200 hover:bg-gray-50"
            >
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input :id="`table-checkbox-${order.id}`" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-green-500">
                  <label :for="`table-checkbox-${order.id}`" class="sr-only">Table checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <div class="flex flex-col">
                  <span class="font-semibold">#{{ order.id }}</span>
                  <span class="text-xs text-gray-500">{{ order.type || 'Purchase Order' }}</span>
                </div>
              </th>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span class="text-xs font-medium text-green-800">{{ getInitials(order.customer.name) }}</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ order.customer.name }}</div>
                    <div class="text-xs text-gray-500">{{ order.customer.email }}</div>
                    <div class="text-xs text-gray-400">{{ order.customer.phone }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  {{ order.items.length }} items
                </div>
                <div class="text-xs text-gray-500">
                  {{ order.items.map(item => item.name).join(', ').substring(0, 30) }}...
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-semibold text-gray-900">
                  TZS {{ order.total.toLocaleString() }}
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="{
                    'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                    'bg-yellow-100 text-yellow-800': order.status === 'pending',
                    'bg-blue-100 text-blue-800': order.status === 'confirmed',
                    'bg-purple-100 text-purple-800': order.status === 'shipped',
                    'bg-green-100 text-green-800': order.status === 'delivered'
                  }"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  {{ new Date(order.date).toLocaleDateString() }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ new Date(order.date).toLocaleTimeString() }}
                </div>
              </td>
              <td class="flex items-center px-6 py-4 space-x-2">
                <button 
                  @click="viewOrder(order)"
                  class="font-medium text-green-600 hover:text-green-800 hover:underline"
                >
                  View
                </button>
                <button 
                  @click="editOrder(order)"
                  class="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Edit
                </button>
                <button 
                  @click="downloadInvoice(order)"
                  class="font-medium text-gray-600 hover:text-gray-800 hover:underline"
                >
                  PDF
                </button>
                <button 
                  @click="deleteOrder(order)"
                  class="font-medium text-red-600 hover:text-red-800 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-semibold text-gray-900">Order Items</h4>
                  <span class="text-xs text-gray-500">Edit quantities or remove items</span>
                </div>
                <div class="space-y-3">
                  <div
                    v-for="(item, index) in editableOrder.items"
                    :key="item.id"
                    class="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <div class="flex-1">
                        <p class="font-medium text-gray-900">{{ item.name }}</p>
                        <p class="text-sm text-gray-600">Unit Price: TZS {{ item.price.toLocaleString() }}</p>
                      </div>
                      <button 
                        @click="removeItem(index)"
                        class="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div class="flex items-center space-x-3">
                      <label class="text-sm text-gray-600">Quantity:</label>
                      <div class="flex items-center space-x-2">
                        <button 
                          @click="decreaseQuantity(index)"
                          class="w-8 h-8 bg-white border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
                          :disabled="item.quantity <= 1"
                        >
                          <span class="text-gray-600">-</span>
                        </button>
                        <input 
                          v-model.number="item.quantity" 
                          type="number" 
                          min="1" 
                          class="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                          @change="recalculateTotals()"
                        />
                        <button 
                          @click="increaseQuantity(index)"
                          class="w-8 h-8 bg-white border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
                        >
                          <span class="text-gray-600">+</span>
                        </button>
                        <span class="text-sm text-gray-600">{{ item.unit }}</span>
                      </div>
                      <div class="ml-auto">
                        <p class="font-medium text-gray-900">
                          TZS {{ (item.quantity * item.price).toLocaleString() }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Order Summary -->
                <div class="mt-4 pt-4 border-t">
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Subtotal:</span>
                    <span>TZS {{ editableOrder.subtotal.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Delivery Fee:</span>
                    <span>TZS {{ editableOrder.deliveryFee.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Service Fee (2%):</span>
                    <span>TZS {{ editableOrder.serviceFee?.toLocaleString() || 0 }}</span>
                  </div>
                  <div class="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>TZS {{ editableOrder.total.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Actions -->
            <div class="mt-6 pt-6 border-t">
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                  <label class="text-sm font-medium text-gray-700">Order Status:</label>
                  <select 
                    v-model="editableOrder.status" 
                    class="px-3 py-1 text-sm font-medium border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <span
                    class="px-3 py-1 text-sm font-semibold rounded-full"
                    :class="getStatusColor(editableOrder.status)"
                  >
                    {{ editableOrder.status }}
                  </span>
                </div>
                <div class="flex space-x-3">
                  <button
                    @click="saveOrderChanges"
                    class="btn-primary"
                  >
                    Save Changes
                  </button>
                  <button
                    v-if="canUpdateStatus(selectedOrder)"
                    @click="updateOrderStatus(selectedOrder)"
                    class="btn-secondary"
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
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Swal from 'sweetalert2'
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
const editableOrder = ref(null)
const showAllDelivered = ref(false)
const newStatus = ref('')
const statusNotes = ref('')

// Orders from localStorage
const orders = ref([])

// Load orders from localStorage on component mount
const loadOrders = () => {
  const savedOrders = localStorage.getItem('orders')
  if (savedOrders) {
    orders.value = JSON.parse(savedOrders).map(order => {
      const subtotal = order.totals?.subtotal || 0
      const deliveryFee = order.totals?.delivery || order.deliveryFee || 2000 // Prioritize totals.delivery
      const serviceFee = order.totals?.service || Math.round(subtotal * 0.02)
      const total = order.totals?.total || (subtotal + deliveryFee + serviceFee)
      
      return {
        ...order,
        customer: {
          name: order.delivery?.name || 'Guest User',
          email: order.delivery?.email || 'guest@example.com',
          phone: order.delivery?.phone || '+255 XXX XXX XXX',
          location: `${order.delivery?.city || 'Unknown'}, ${order.delivery?.region || 'Tanzania'}`
        },
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        serviceFee: serviceFee,
        total: total,
        delivery: {
          address: order.delivery?.address || 'Unknown Address',
          method: order.payment || 'Standard Delivery',
          timeline: '2-3 business days'
        }
      }
    })
  }
}

onMounted(() => {
  loadOrders()
})

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

// Computed properties for delivered orders
const deliveredOrders = computed(() => {
  return orders.value
    .filter(order => order.status === 'delivered')
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Most recent first
})

const displayedDeliveredOrders = computed(() => {
  if (showAllDelivered.value) {
    return deliveredOrders.value
  } else {
    return deliveredOrders.value.slice(0, 6) // Show only first 6 by default
  }
})

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

const editOrder = (order) => {
  selectedOrder.value = { ...order }
  editableOrder.value = {
    ...order,
    items: order.items.map(item => ({ ...item }))
  }
  showOrderModal.value = true
}

// Item editing functions
const removeItem = (index) => {
  Swal.fire({
    title: "Remove Item?",
    text: `Are you sure you want to remove ${editableOrder.value.items[index].name} from this order?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Remove",
    cancelButtonText: "Cancel"
  }).then((result) => {
    if (result.isConfirmed) {
      editableOrder.value.items.splice(index, 1)
      recalculateTotals()
      
      if (editableOrder.value.items.length === 0) {
        Swal.fire({
          title: "Order Empty",
          text: "This order now has no items. The order will be deleted.",
          icon: "info",
          confirmButtonColor: "#10b981"
        }).then(() => {
          deleteOrder(selectedOrder.value)
        })
      }
    }
  })
}

const increaseQuantity = (index) => {
  editableOrder.value.items[index].quantity += 1
  recalculateTotals()
}

const decreaseQuantity = (index) => {
  if (editableOrder.value.items[index].quantity > 1) {
    editableOrder.value.items[index].quantity -= 1
    recalculateTotals()
  }
}

const recalculateTotals = () => {
  const subtotal = editableOrder.value.items.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
  
  // Free delivery for orders over 10,000 TZS
  const deliveryFee = subtotal > 10000 ? 0 : 2000
  const serviceFee = Math.round(subtotal * 0.02) // 2% service fee
  
  editableOrder.value.subtotal = subtotal
  editableOrder.value.deliveryFee = deliveryFee
  editableOrder.value.serviceFee = serviceFee
  editableOrder.value.total = subtotal + deliveryFee + serviceFee
  
  console.log('Order totals recalculated:', {
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    serviceFee: serviceFee,
    total: editableOrder.value.total
  })
}

const saveOrderChanges = () => {
  // Update the original order with edited data
  const orderIndex = orders.value.findIndex(o => o.id === selectedOrder.value.id)
  if (orderIndex !== -1) {
    const updatedOrder = {
      ...editableOrder.value,
      totals: {
        subtotal: editableOrder.value.subtotal,
        delivery: editableOrder.value.deliveryFee,
        service: editableOrder.value.serviceFee,
        total: editableOrder.value.total
      }
    }
    
    orders.value[orderIndex] = updatedOrder
    
    // Update localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const localStorageIndex = existingOrders.findIndex(o => o.id === selectedOrder.value.id)
    if (localStorageIndex !== -1) {
      existingOrders[localStorageIndex] = updatedOrder
      localStorage.setItem('orders', JSON.stringify(existingOrders))
    }
    
    Swal.fire({
      title: "Order Updated!",
      text: `Order #${selectedOrder.value.id} has been updated successfully.`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    })
    
    showOrderModal.value = false
  }
}

const deleteOrder = (order) => {
  Swal.fire({
    title: "Delete Order?",
    html: `
      <div class="text-left">
        <p>Are you sure you want to delete this order?</p>
        <div class="mt-3 p-3 bg-gray-100 rounded">
          <p class="font-semibold">Order #${order.id}</p>
          <p class="text-sm text-gray-600">Customer: ${order.customer.name}</p>
          <p class="text-sm text-gray-600">Total: TZS ${order.total.toLocaleString()}</p>
        </div>
        <p class="text-sm text-red-600 mt-2">This action cannot be undone.</p>
      </div>
    `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete Order",
    cancelButtonText: "Cancel",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Remove order from localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      const updatedOrders = existingOrders.filter(o => o.id !== order.id)
      localStorage.setItem('orders', JSON.stringify(updatedOrders))
      
      // Update local orders array
      orders.value = orders.value.filter(o => o.id !== order.id)
      
      // Show success notification
      Swal.fire({
        title: "Order Deleted!",
        text: `Order #${order.id} has been deleted successfully.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      })
    }
  })
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

const downloadInvoice = async (order) => {
  try {
    // Create invoice HTML content
    const invoiceHTML = `
      <div id="invoice-content" style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 30px; background: white;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px;">
          <div style="font-size: 24px; font-weight: bold; color: #10b981;">
            🌾 SFMP - Smart Farming Marketplace
          </div>
          <div style="text-align: right;">
            <div style="font-size: 18px; font-weight: bold; color: #333;">INVOICE #${order.id}</div>
            <div style="color: #666; font-size: 14px;">Date: ${new Date(order.date).toLocaleDateString()}</div>
            <div style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; background: #fef3c7; color: #92400e;">${order.status}</div>
          </div>
        </div>

        <div style="margin-bottom: 25px;">
          <div style="font-size: 16px; font-weight: bold; color: #333; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Customer Information</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase;">Name</div>
                <div style="color: #333; font-size: 14px;">${order.customer.name}</div>
              </div>
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase;">Phone</div>
                <div style="color: #333; font-size: 14px;">${order.customer.phone}</div>
              </div>
            </div>
            <div>
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase;">Email</div>
                <div style="color: #333; font-size: 14px;">${order.customer.email}</div>
              </div>
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase;">Location</div>
                <div style="color: #333; font-size: 14px;">${order.customer.location}</div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 25px;">
          <div style="font-size: 16px; font-weight: bold; color: #333; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Delivery Information</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase;">Delivery Address</div>
                <div style="color: #333; font-size: 14px;">${order.delivery.address}</div>
              </div>
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase;">Payment Method</div>
                <div style="color: #333; font-size: 14px;">${order.delivery.method}</div>
              </div>
            </div>
            <div>
              <div style="margin-bottom: 10px;">
                <div style="font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase;">Delivery Timeline</div>
                <div style="color: #333; font-size: 14px;">${order.delivery.timeline}</div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 25px;">
          <div style="font-size: 16px; font-weight: bold; color: #333; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Order Items</div>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr>
                <th style="background: #f8f9fa; padding: 12px; text-align: left; font-weight: bold; color: #333; border-bottom: 2px solid #10b981;">Product</th>
                <th style="background: #f8f9fa; padding: 12px; text-align: left; font-weight: bold; color: #333; border-bottom: 2px solid #10b981;">Quantity</th>
                <th style="background: #f8f9fa; padding: 12px; text-align: left; font-weight: bold; color: #333; border-bottom: 2px solid #10b981;">Unit Price</th>
                <th style="background: #f8f9fa; padding: 12px; text-align: right; font-weight: bold; color: #333; border-bottom: 2px solid #10b981;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.quantity} ${item.unit}</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">TZS ${item.price.toLocaleString()}</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">TZS ${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="margin-bottom: 25px;">
          <div style="text-align: right; margin-top: 20px;">
            <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
              <div style="width: 150px; text-align: right; padding-right: 20px; color: #666;">Subtotal:</div>
              <div style="width: 120px; text-align: right; font-weight: bold;">TZS ${order.subtotal.toLocaleString()}</div>
            </div>
            <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
              <div style="width: 150px; text-align: right; padding-right: 20px; color: #666;">Delivery Fee:</div>
              <div style="width: 120px; text-align: right; font-weight: bold;">TZS ${order.deliveryFee.toLocaleString()}</div>
            </div>
            <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
              <div style="width: 150px; text-align: right; padding-right: 20px; color: #666;">Service Fee (2%):</div>
              <div style="width: 120px; text-align: right; font-weight: bold;">TZS ${(order.serviceFee || 0).toLocaleString()}</div>
            </div>
            <div style="display: flex; justify-content: flex-end; margin-bottom: 8px; border-top: 2px solid #10b981; padding-top: 10px; margin-top: 10px;">
              <div style="width: 150px; text-align: right; padding-right: 20px; color: #333; font-size: 16px;">Total Amount:</div>
              <div style="width: 120px; text-align: right; font-weight: bold; color: #10b981; font-size: 18px;">TZS ${order.total.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
          <p>Thank you for your business! This is a computer-generated invoice.</p>
          <p>SFMP - Smart Farming Marketplace | Connecting Tanzanian Farmers with Buyers</p>
          <p>Contact: support@sfmp.co.tz | Phone: +255 123 456 789</p>
        </div>
      </div>
    `

    // Create a temporary container for the invoice
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = invoiceHTML
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    tempDiv.style.width = '800px'
    document.body.appendChild(tempDiv)

    // Convert HTML to canvas
    const canvas = await html2canvas(tempDiv.querySelector('#invoice-content'), {
      scale: 2,
      useCORS: true,
      allowTaint: true
    })

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')
    
    // Calculate dimensions to fit A4
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    
    // Save PDF
    pdf.save(`Invoice_${order.id}_${new Date().toISOString().split('T')[0]}.pdf`)

    // Clean up
    document.body.removeChild(tempDiv)

    // Show success notification
    if (window.addNotification) {
      window.addNotification({
        type: 'success',
        title: 'PDF Invoice Downloaded',
        message: `PDF invoice for order #${order.id} has been downloaded successfully.`
      })
    } else {
      alert(`PDF invoice for order #${order.id} has been downloaded successfully.`)
    }

  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF invoice. Please try again.')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Professional Header Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-white">Order Management</h1>
            <p class="text-blue-100 mt-2">Track and manage your orders efficiently</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-white">SFMP TANZANIA</div>
            <div class="text-blue-100 text-sm">Smart Farming Marketplace</div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Professional Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <Clock class="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p class="text-sm text-yellow-600 font-medium">Pending Orders</p>
              <p class="text-2xl font-bold text-gray-900">{{ orderStats.pending }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <CheckCircle class="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p class="text-sm text-blue-600 font-medium">Confirmed Orders</p>
              <p class="text-2xl font-bold text-gray-900">{{ orderStats.confirmed }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Truck class="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p class="text-sm text-green-600 font-medium">Delivered Orders</p>
              <p class="text-2xl font-bold text-gray-900">{{ orderStats.delivered }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <DollarSign class="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p class="text-sm text-purple-600 font-medium">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-900">TZS {{ (orderStats.revenue || 0).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Connection Status Indicator -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <component 
              :is="isConnected ? Wifi : WifiOff" 
              :class="getConnectionColor()"
              class="w-5 h-5 mr-2"
            />
            <span :class="getConnectionColor()" class="text-sm font-medium">
              {{ getConnectionText() }}
            </span>
            <span v-if="isConnected" class="ml-2 text-xs text-gray-500">
              Real-time updates active
            </span>
          </div>
          <div v-if="isConnected" class="flex items-center space-x-4 text-xs text-gray-600">
            <span>{{ liveMetrics.totalOrders }} total orders</span>
            <span>TZS {{ (liveMetrics.todayRevenue || 0).toLocaleString() }} today</span>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by order ID or customer..."
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="statusFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
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
            <select v-model="dateFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
            <select v-model="typeFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="">All Types</option>
              <option value="purchase">Purchase Orders</option>
              <option value="sale">Sale Orders</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#{{ order.id }}</div>
                  <div class="text-xs text-gray-500">{{ order.type || 'Purchase Order' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                      <span class="text-xs font-medium text-emerald-800">{{ getInitials(order.customer.name) }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ order.customer.name }}</div>
                      <div class="text-xs text-gray-500">{{ order.customer.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ order.items?.length || 0 }} items</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">TZS {{ (order.totals?.total || order.total || 0).toLocaleString() }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusColor(order.status)" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button @click="viewOrder(order)" class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors">View</button>
                  <button @click="editOrder(order)" class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">Edit</button>
                  <button @click="downloadInvoice(order)" class="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">PDF</button>
                  <button @click="deleteOrder(order)" class="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Order Details Modal -->
      <div v-if="showOrderModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        
        <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-lg bg-white">
          <div v-if="selectedOrder" class="mt-3">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h3 class="text-xl font-bold text-gray-900">Order #{{ selectedOrder.id }}</h3>
                <p class="text-gray-600">{{ selectedOrder.type }} - {{ formatDate(selectedOrder.date) }}</p>
              </div>
              <button @click="showOrderModal = false" class="text-gray-400 hover:text-gray-600">
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
                  </div>
                </div>
              </div>

              <!-- Order Summary -->
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Order Summary</h4>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Subtotal:</span>
                    <span>TZS {{ (selectedOrder.totals?.subtotal || selectedOrder.subtotal || 0).toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-600">Delivery Fee:</span>
                    <span>TZS {{ (selectedOrder.totals?.delivery || selectedOrder.deliveryFee || 0).toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>TZS {{ (selectedOrder.totals?.total || selectedOrder.total || 0).toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Actions -->
            <div class="mt-6 pt-6 border-t">
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-3">
                  <label class="text-sm font-medium text-gray-700">Order Status:</label>
                  <select v-model="editableOrder.status" class="px-3 py-1 text-sm font-medium border border-gray-300 rounded-md">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div class="flex space-x-3">
                  <button @click="saveOrderChanges" class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                    Save Changes
                  </button>
                  <button @click="downloadInvoice(selectedOrder)" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Update Modal -->
      <div v-if="showStatusModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Update Order Status</h3>
            <form @submit.prevent="saveStatusUpdate" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">New Status</label>
                <select v-model="newStatus" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
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
                <textarea v-model="statusNotes" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Add any notes about this status update..."></textarea>
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button type="button" @click="showStatusModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Update Status</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Order Edit Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-7xl shadow-lg rounded-lg bg-white max-h-screen overflow-y-auto">
          <div v-if="editableOrder" class="mt-3">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h3 class="text-xl font-bold text-gray-900">Edit Order #{{ editableOrder.id }}</h3>
                <p class="text-gray-600">{{ editableOrder.type }} - {{ formatDate(editableOrder.date) }}</p>
              </div>
              <div class="flex items-center space-x-3">
                <button @click="saveOrderChanges" class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                  Save Changes
                </button>
                <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-600">
                  <X class="w-6 h-6" />
                </button>
              </div>
            </div>

            <!-- Order Header Information -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <!-- Customer Information -->
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">Customer Information</h4>
                  <div class="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div>
                      <label class="block text-xs font-medium text-gray-700">Name</label>
                      <input v-model="editableOrder.customer.name" type="text" class="w-full px-2 py-1 text-sm border border-gray-300 rounded">
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700">Email</label>
                      <input v-model="editableOrder.customer.email" type="email" class="w-full px-2 py-1 text-sm border border-gray-300 rounded">
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700">Phone</label>
                      <input v-model="editableOrder.customer.phone" type="tel" class="w-full px-2 py-1 text-sm border border-gray-300 rounded">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order Status -->
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-900 mb-2">Order Status</h4>
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <select v-model="editableOrder.status" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Order Summary -->
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Order Summary</h4>
                <div class="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Items:</span>
                    <span class="text-sm font-medium">{{ editableOrder.items?.length || 0 }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Subtotal:</span>
                    <span class="text-sm font-medium">TZS {{ (editableOrder.totals?.subtotal || editableOrder.subtotal || 0).toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Delivery:</span>
                    <span class="text-sm font-medium">TZS {{ (editableOrder.totals?.delivery || editableOrder.deliveryFee || 0).toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>TZS {{ (editableOrder.totals?.total || editableOrder.total || 0).toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Items Table -->
            <div class="mb-6">
              <h4 class="font-semibold text-gray-900 mb-4">Order Items</h4>
              <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table class="w-full">
                  <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in editableOrder.items" :key="index" class="hover:bg-gray-50">
                      <td class="px-4 py-4">
                        <div class="space-y-2">
                          <div>
                            <label class="block text-xs font-medium text-gray-700 mb-1">Product Name</label>
                            <input 
                              v-model="item.name" 
                              @input="onItemChange(index, 'name', $event.target.value)"
                              type="text" 
                              class="w-full px-2 py-1 text-sm border border-gray-300 rounded" 
                              placeholder="Product name"
                            >
                          </div>
                          <div v-if="item.productId">
                            <label class="block text-xs font-medium text-gray-700 mb-1">Product ID</label>
                            <span class="text-xs text-gray-500">#{{ item.productId }}</span>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-4">
                        <div>
                          <label class="block text-xs font-medium text-gray-700 mb-1">Price (TZS)</label>
                          <input 
                            v-model.number="item.price" 
                            @input="onItemChange(index, 'price', $event.target.value)"
                            type="number" 
                            min="0" 
                            step="100" 
                            class="w-full px-2 py-1 text-sm border border-gray-300 rounded" 
                            placeholder="0"
                          >
                        </div>
                      </td>
                      <td class="px-4 py-4">
                        <div>
                          <label class="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                          <input 
                            v-model.number="item.quantity" 
                            @input="onItemChange(index, 'quantity', $event.target.value)"
                            type="number" 
                            min="1" 
                            class="w-full px-2 py-1 text-sm border border-gray-300 rounded" 
                            placeholder="1"
                          >
                        </div>
                      </td>
                      <td class="px-4 py-4">
                        <div class="text-sm font-medium text-gray-900">
                          TZS {{ ((item.price || 0) * (item.quantity || 1)).toLocaleString() }}
                        </div>
                      </td>
                      <td class="px-4 py-4">
                        <button @click="removeOrderItem(index)" class="text-red-600 hover:text-red-900 text-sm">
                          Remove
                        </button>
                      </td>
                    </tr>
                    <!-- Add new item row -->
                    <tr class="bg-gray-50">
                      <td colspan="5" class="px-4 py-4">
                        <button @click="addOrderItem" class="w-full px-4 py-2 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700">
                          + Add New Item
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Delivery Information -->
            <div class="mb-6">
              <h4 class="font-semibold text-gray-900 mb-4">Delivery Information</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                  <textarea v-model="editableOrder.delivery.address" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter delivery address"></textarea>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input v-model="editableOrder.delivery.city" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="City">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <input v-model="editableOrder.delivery.region" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Region">
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Information -->
            <div class="mb-6">
              <h4 class="font-semibold text-gray-900 mb-4">Payment Information</h4>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select v-model="editableOrder.payment" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="cash_on_delivery">Cash on Delivery</option>
                      <option value="mobile_money">Mobile Money</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="card">Card Payment</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <select v-model="editableOrder.paymentStatus" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useProductsStore } from "@/stores/products";
import { useOrdersStore } from "@/stores/orders";
import { useWebSocket } from "@/services/websocket";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import {
  Clock,
  CheckCircle,
  Truck,
  DollarSign,
  Search,
  Download,
  X,
  Wifi,
  WifiOff,
} from "lucide-vue-next";

const authStore = useAuthStore();
const productsStore = useProductsStore();
const ordersStore = useOrdersStore();

// WebSocket service
const { 
  isConnected, 
  connectionStatus, 
  connect, 
  disconnect, 
  realTimeOrders, 
  liveMetrics,
  getConnectionColor,
  getConnectionText 
} = useWebSocket();

/* -----------------------------
   REACTIVE STATE
------------------------------ */
// Use orders store but also keep local reactive reference for compatibility
const searchQuery = ref("");
const statusFilter = ref("");
const dateFilter = ref("");
const typeFilter = ref("");

const showOrderModal = ref(false);
const showStatusModal = ref(false);
const showEditModal = ref(false);
const selectedOrder = ref(null);
const editableOrder = ref(null);
const showAllDelivered = ref(false);
const newStatus = ref("");
const statusNotes = ref("");

// Create a local reactive reference to store orders
const orders = computed(() => ordersStore.orders);

/* -----------------------------
   LOAD ORDERS
------------------------------ */
// Use orders store loadOrders function
const loadOrders = () => {
  console.log('Loading orders from store...');
  ordersStore.loadOrders();
  console.log('Orders loaded:', ordersStore.orders.length);
  console.log('Order stats:', ordersStore.orderStats);
};

onMounted(() => {
  console.log('OrderManagementView mounted');
  console.log('Orders store:', ordersStore);
  console.log('Orders store orders:', ordersStore.orders);
  console.log('Orders store orderStats:', ordersStore.orderStats);
  loadOrders();
  connect(); // Connect to WebSocket for real-time updates
});

onUnmounted(() => {
  disconnect(); // Disconnect WebSocket when component unmounts
});

/* -----------------------------
   ORDER STATS (Enhanced with Real-time Data)
------------------------------ */
const orderStats = computed(() => {
  // Use live metrics if WebSocket is connected, otherwise use store data
  if (isConnected.value && liveMetrics.totalOrders > 0) {
    console.log('Using live metrics for order stats');
    return {
      pending: liveMetrics.pendingOrders,
      confirmed: liveMetrics.confirmedOrders,
      delivered: liveMetrics.deliveredOrders,
      revenue: liveMetrics.todayRevenue,
      totalOrders: liveMetrics.totalOrders
    };
  }
  
  // Fallback to store data - access the computed property directly
  console.log('Using store data for order stats');
  try {
    const stats = ordersStore.orderStats;
    console.log('Store order stats:', stats);
    // Ensure we have a valid stats object
    return stats || {
      pending: 0,
      confirmed: 0,
      delivered: 0,
      revenue: 0,
      totalOrders: 0
    };
  } catch (error) {
    console.error('Error accessing orderStats:', error);
    return {
      pending: 0,
      confirmed: 0,
      delivered: 0,
      revenue: 0,
      totalOrders: 0
    };
  }
});

/* -----------------------------
   FILTERED ORDERS (Enhanced with Real-time Data)
------------------------------ */
const filteredOrders = computed(() => {
  try {
    // Use local computed orders reference
    let allOrders = [...orders.value];
    console.log('Store orders count:', orders.value.length);
    
    // Add real-time orders if they're not already in local orders
    if (isConnected.value && realTimeOrders.value.length > 0) {
      realTimeOrders.value.forEach(rtOrder => {
        if (!allOrders.find(order => order.id === rtOrder.id)) {
          allOrders.unshift(rtOrder); // Add new orders at the top
        }
      });
    }
    
    console.log('All orders count:', allOrders.length);
    console.log('Real-time orders count:', realTimeOrders.value.length);
    console.log('Is connected:', isConnected.value);
    
    let filtered = [...allOrders];

    if (searchQuery.value) {
      filtered = filtered.filter(
        (order) =>
          String(order.id)
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          order.customer?.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()),
      );
    }

    if (statusFilter.value) {
      filtered = filtered.filter((order) => order.status === statusFilter.value);
    }

    if (typeFilter.value) {
      filtered = filtered.filter((order) =>
        (order.type || "").toLowerCase().includes(typeFilter.value),
      );
    }

    console.log('Filtered orders count:', filtered.length);
    return filtered;
  } catch (error) {
    console.error('Error in filteredOrders:', error);
    return [];
  }
});

/* -----------------------------
   DELIVERED ORDERS
------------------------------ */
const deliveredOrders = computed(() => {
  try {
    return orders.value
      .filter((o) => o.status === "delivered")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error in deliveredOrders:', error);
    return [];
  }
});

const displayedDeliveredOrders = computed(() => {
  return showAllDelivered.value
    ? deliveredOrders.value
    : deliveredOrders.value.slice(0, 6);
});

/* -----------------------------
   HELPERS
------------------------------ */
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const formatDate = (date) => new Date(date).toLocaleDateString();

/* -----------------------------
   ORDER ACTIONS
------------------------------ */
const viewOrder = (order) => {
  console.log('View order clicked:', order);
  console.log('showOrderModal before:', showOrderModal.value);
  console.log('selectedOrder before:', selectedOrder.value);
  
  selectedOrder.value = order;
  editableOrder.value = JSON.parse(JSON.stringify(order));
  showOrderModal.value = true;
  
  console.log('showOrderModal after:', showOrderModal.value);
  console.log('selectedOrder after:', selectedOrder.value);
  
  // Force Vue reactivity
  setTimeout(() => {
    console.log('Modal should be visible now');
  }, 100);
};

const editOrder = (order) => {
  console.log('editOrder called with:', order);
  selectedOrder.value = order;
  editableOrder.value = { ...order };
  console.log('editableOrder set to:', editableOrder.value);
  showEditModal.value = true;
  console.log('showEditModal set to true');
  
  // Force Vue reactivity
  setTimeout(() => {
    console.log('Edit modal should be visible now');
  }, 100);
};

const deleteOrder = (order) => {
  console.log('deleteOrder called with:', order);
  Swal.fire({
    title: "Delete Order?",
    text: `Order #${order.id} will be removed.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('User confirmed deletion');
      const deleteResult = ordersStore.deleteOrder(order.id);
      console.log('deleteOrder result:', deleteResult);
      
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Order Deleted!',
        text: `Order #${order.id} has been removed.`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  });
};

const saveOrderChanges = () => {
  console.log('saveOrderChanges called');
  console.log('editableOrder before save:', editableOrder.value);
  
  // Recalculate order totals based on items
  const subtotal = editableOrder.value.items.reduce((sum, item) => {
    return sum + ((item.price || 0) * (item.quantity || 1));
  }, 0);
  
  const deliveryFee = editableOrder.value.totals?.delivery || editableOrder.value.deliveryFee || 2000;
  const serviceFee = Math.round(subtotal * 0.02); // 2% service fee
  const total = subtotal + deliveryFee + serviceFee;
  
  // Update totals in the order
  editableOrder.value.totals = {
    subtotal: subtotal,
    delivery: deliveryFee,
    service: serviceFee,
    total: total
  };
  
  // Also update direct properties for compatibility
  editableOrder.value.subtotal = subtotal;
  editableOrder.value.deliveryFee = deliveryFee;
  editableOrder.value.serviceFee = serviceFee;
  editableOrder.value.total = total;
  
  console.log('Calling ordersStore.updateOrder with:', editableOrder.value.id, editableOrder.value);
  
  // Save to orders store
  const result = ordersStore.updateOrder(editableOrder.value.id, editableOrder.value);
  console.log('updateOrder result:', result);
  
  showEditModal.value = false;
  
  // Show success message
  Swal.fire({
    icon: 'success',
    title: 'Order Updated!',
    text: `Order #${editableOrder.value.id} has been updated successfully.`,
    timer: 3000,
    showConfirmButton: false
  });
};

/* -----------------------------
   ORDER ITEM MANAGEMENT
------------------------------ */
const addOrderItem = () => {
  console.log('addOrderItem called');
  if (!editableOrder.value.items) {
    editableOrder.value.items = [];
  }
  
  const newItem = {
    id: Date.now(), // Temporary ID
    productId: null,
    name: '',
    price: 0,
    quantity: 1,
    unit: 'pcs'
  };
  
  console.log('Adding new item:', newItem);
  editableOrder.value.items.push(newItem);
  console.log('Items after adding:', editableOrder.value.items);
  
  // Force reactivity
  editableOrder.value.items = [...editableOrder.value.items];
};

const onItemChange = (index, field, value) => {
  console.log('onItemChange called:', { index, field, value });
  
  if (editableOrder.value.items && editableOrder.value.items[index]) {
    // Convert value to appropriate type
    if (field === 'price' || field === 'quantity') {
      value = parseFloat(value) || 0;
    } else {
      value = String(value);
    }
    
    editableOrder.value.items[index][field] = value;
    console.log('Item updated:', editableOrder.value.items[index]);
    
    // Force reactivity
    editableOrder.value.items = [...editableOrder.value.items];
  }
};

const removeOrderItem = (index) => {
  console.log('removeOrderItem called with index:', index);
  console.log('Items before removal:', editableOrder.value.items);
  
  if (editableOrder.value.items && editableOrder.value.items.length > index) {
    const removedItem = editableOrder.value.items[index];
    editableOrder.value.items.splice(index, 1);
    console.log('Removed item:', removedItem);
    console.log('Items after removal:', editableOrder.value.items);
    
    // Force reactivity
    editableOrder.value.items = [...editableOrder.value.items];
  } else {
    console.log('Cannot remove item - invalid index or no items');
  }
};

/* -----------------------------
   STATUS UPDATE
------------------------------ */
const updateOrderStatus = (order) => {
  selectedOrder.value = order;
  newStatus.value = order.status;
  showStatusModal.value = true;
};

const saveStatusUpdate = () => {
  if (!selectedOrder.value) return;

  ordersStore.updateOrderStatus(selectedOrder.value.id, newStatus.value, statusNotes.value);
  showStatusModal.value = false;
};

/* -----------------------------
   PDF DOWNLOAD (Compact Single Page Design)
------------------------------ */
const downloadInvoice = async (order) => {
  const pdf = new jsPDF();
  
  // Page setup
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;
  
  // Color scheme matching the image
  const pdfColors = {
    primary: [0, 102, 51],      // Green (like in image)
    secondary: [255, 140, 0],    // Orange (like in image)
    black: [0, 0, 0],
    white: [255, 255, 255],
    gray: [128, 128, 128],
    lightGray: [240, 240, 240]
  };
  
  // Helper function for adding text
  const addText = (text, x, y, fontSize = 11, fontStyle = 'normal', color = pdfColors.black, align = 'left') => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);
    pdf.setTextColor(color[0], color[1], color[2]);
    if (align === 'right') {
      pdf.text(text, pageWidth - x, y, { align: 'right' });
    } else if (align === 'center') {
      pdf.text(text, pageWidth / 2, y, { align: 'center' });
    } else {
      pdf.text(text, x, y);
    }
    return y + (fontSize * 0.4) + 2;
  };
  
  // Helper function for adding lines
  const addLine = (x1, y1, x2, y2, color = pdfColors.black, lineWidth = 0.5) => {
    pdf.setDrawColor(color[0], color[1], color[2]);
    pdf.setLineWidth(lineWidth);
    pdf.line(x1, y1, x2, y2);
  };
  
  // Helper function for adding rectangles
  const addRect = (x, y, width, height, color = pdfColors.black, isFilled = false) => {
    if (isFilled) {
      pdf.setFillColor(color[0], color[1], color[2]);
      pdf.rect(x, y, width, height, 'F');
    } else {
      pdf.setDrawColor(color[0], color[1], color[2]);
      pdf.rect(x, y, width, height);
    }
  };
  
  // Compact Header Section
  addRect(margin, margin, pageWidth - (margin * 2), 30, pdfColors.primary, true);
  
  // Company info on left side - reduced sizes
  yPosition = addText('SFMP TANZANIA', margin, margin + 8, 14, 'bold', pdfColors.white);
  yPosition = addText('Smart Farming Marketplace', margin, yPosition, 8, 'normal', pdfColors.white);
  
  // Invoice details on right side - reduced sizes
  let rightY = margin + 6;
  rightY = addText('INVOICE', pageWidth - margin, rightY, 12, 'bold', pdfColors.white, 'right');
  rightY = addText(`#${order.id}`, pageWidth - margin, rightY, 10, 'bold', pdfColors.white, 'right');
  rightY = addText(new Date(order.date).toLocaleDateString(), pageWidth - margin, rightY, 7, 'normal', pdfColors.lightGray, 'right');
  
  // Customer Information Section - reduced sizes
  yPosition = margin + 40;
  addRect(margin, yPosition, 100, 35, pdfColors.lightGray, false);
  yPosition += 6;
  yPosition = addText('CUSTOMER', margin + 5, yPosition, 8, 'bold', pdfColors.primary);
  yPosition = addText(order.customer?.name || 'Customer Name', margin + 5, yPosition, 7, 'normal', pdfColors.black);
  yPosition = addText(order.customer?.phone || '+255 XXX XXX XXX', margin + 5, yPosition, 6, 'normal', pdfColors.gray);
  yPosition = addText(order.customer?.location || 'Tanzania', margin + 5, yPosition, 6, 'normal', pdfColors.gray);
  
  // Order Details Box - reduced sizes
  let detailsY = margin + 40;
  addRect(pageWidth - margin - 100, detailsY, 100, 35, pdfColors.lightGray, false);
  detailsY += 6;
  detailsY = addText('ORDER INFO', pageWidth - margin - 95, detailsY, 8, 'bold', pdfColors.primary);
  detailsY = addText(`Status: ${order.status?.toUpperCase() || 'PENDING'}`, pageWidth - margin - 95, detailsY, 6, 'normal', pdfColors.black);
  
  // Status badge with colors matching image - reduced size
  const statusColor = order.status === 'delivered' ? pdfColors.primary : 
                     order.status === 'confirmed' ? pdfColors.secondary : 
                     order.status === 'pending' ? pdfColors.gray : pdfColors.gray;
  addRect(pageWidth - margin - 95, detailsY, 50, 6, statusColor, true);
  detailsY = addText(order.status?.toUpperCase() || 'PENDING', pageWidth - margin - 70, detailsY + 5, 6, 'bold', pdfColors.white, 'center');
  
  detailsY += 10;
  detailsY = addText(`Payment: ${order.paymentMethod || 'Cash'}`, pageWidth - margin - 95, detailsY, 6, 'normal', pdfColors.black);
  detailsY = addText(`Delivery: ${order.delivery?.method || 'Standard'}`, pageWidth - margin - 95, detailsY, 6, 'normal', pdfColors.black);
  
  // Items Table - Compact design
  yPosition = margin + 85;
  addLine(margin, yPosition, pageWidth - margin, yPosition, pdfColors.primary, 2);
  yPosition += 6;
  
  // Table Header - reduced sizes
  addText('ITEM DESCRIPTION', margin + 5, yPosition, 7, 'bold', pdfColors.primary);
  addText('QTY', margin + 90, yPosition, 7, 'bold', pdfColors.primary);
  addText('UNIT PRICE', margin + 120, yPosition, 7, 'bold', pdfColors.primary);
  addText('TOTAL', pageWidth - margin - 30, yPosition, 7, 'bold', pdfColors.primary, 'right');
  
  yPosition += 8;
  addLine(margin, yPosition, pageWidth - margin, yPosition, pdfColors.lightGray, 1);
  yPosition += 4;
  
  // Order Items - Compact design with dynamic sizing
  if (order.items && order.items.length > 0) {
    // Calculate how many items can fit based on remaining space
    const remainingSpace = pageHeight - 100; // Leave space for summary and footer
    const itemHeight = 10; // Height per item
    const maxItems = Math.floor(remainingSpace / itemHeight);
    const itemsToShow = order.items.slice(0, maxItems);
    
    itemsToShow.forEach((item, index) => {
      if (index % 2 === 0) {
        addRect(margin, yPosition - 1, pageWidth - (margin * 2), 8, pdfColors.lightGray, true);
      }
      
      // Get item name and price from product store
      let itemName = item.name || `Product ${index + 1}`;
      let itemPrice = 0;
      
      if (item.productId) {
        const product = productsStore.getProductById(item.productId);
        if (product) {
          itemPrice = product.price;
        }
      }
      
      // Fallback to item price if product not found
      if (itemPrice === 0 && item.price) {
        itemPrice = item.price;
      }
      
      // Item description - compact
      const itemLines = pdf.splitTextToSize(itemName, 85);
      itemLines.forEach((line, lineIndex) => {
        yPosition = addText(line, margin + 5, yPosition, 6, 'normal', pdfColors.black);
      });
      
      // Quantity, Unit Price, Total - compact
      const itemY = yPosition - (itemLines.length - 1) * 2;
      addText(`${item.quantity || 1}`, margin + 90, itemY, 6, 'normal', pdfColors.black);
      addText(`TZS ${(itemPrice || 0).toLocaleString()}`, margin + 120, itemY, 6, 'normal', pdfColors.black);
      const itemTotal = itemPrice * (item.quantity || 1);
      addText(`TZS ${(itemTotal || 0).toLocaleString()}`, pageWidth - margin - 30, itemY, 6, 'bold', pdfColors.primary, 'right');
      
      yPosition += 4;
    });
    
    // Show if more items exist
    if (order.items.length > maxItems) {
      addRect(margin, yPosition - 1, pageWidth - (margin * 2), 8, pdfColors.secondary, true);
      yPosition = addText(`+ ${order.items.length - maxItems} more items`, pageWidth / 2, yPosition + 5, 6, 'bold', pdfColors.white, 'center');
    }
  } else {
    yPosition = addText('No items found', margin + 5, yPosition, 6, 'italic', pdfColors.gray);
  }
  
  // Summary Section - Compact design
  yPosition += 10;
  addLine(margin, yPosition, pageWidth - margin, yPosition, pdfColors.primary, 2);
  yPosition += 8;
  
  // Calculate totals from order items using product prices
  let subtotal = 0;
  let deliveryFee = 0;
  let serviceFee = 0;
  let total = 0;
  
  // Debug: Log order items to see structure
  console.log('Order items:', order.items);
  console.log('Order structure:', order);
  
  // First try to use pre-calculated totals from order
  if (order.totals) {
    console.log('Using pre-calculated totals from order');
    subtotal = order.totals.subtotal || 0;
    deliveryFee = order.totals.delivery || 0;
    serviceFee = order.totals.service || 0;
    total = order.totals.total || 0;
    
    console.log('Pre-calculated totals:', { subtotal, deliveryFee, serviceFee, total });
  } else {
    // Fallback to manual calculation if totals not available
    console.log('Calculating totals manually');
    
    if (order.items && order.items.length > 0) {
      subtotal = order.items.reduce((sum, item) => {
        let itemPrice = 0;
        
        // Debug: Log each item
        console.log('Processing item:', item);
        
        // Try to get price from product store first
        if (item.productId) {
          const product = productsStore.getProductById(item.productId);
          if (product) {
            itemPrice = product.price;
            console.log('Found product price:', itemPrice);
          }
        }
        
        // Fallback to item price if product not found
        if (itemPrice === 0 && item.price) {
          itemPrice = item.price;
          console.log('Using item price:', itemPrice);
        }
        
        // Default price if still 0
        if (itemPrice === 0) {
          itemPrice = 1000; // Default price per item
          console.log('Using default price:', itemPrice);
        }
        
        const itemTotal = itemPrice * (item.quantity || 1);
        console.log('Item total:', itemTotal);
        return sum + itemTotal;
      }, 0);
    }
    
    console.log('Calculated subtotal:', subtotal);
    
    // Calculate other fees
    deliveryFee = order.deliveryFee || (subtotal > 0 ? 2000 : 0); // Default 2000 if items exist
    serviceFee = Math.round(subtotal * 0.02); // 2% service fee
    total = subtotal + deliveryFee + serviceFee;
    
    console.log('Final total:', total);
  }
  
  // Summary on the right - reduced sizes
  let summaryY = yPosition;
  summaryY = addText('Subtotal:', pageWidth - margin - 100, summaryY, 7, 'normal', pdfColors.black, 'right');
  addText(`TZS ${(subtotal || 0).toLocaleString()}`, pageWidth - margin - 20, summaryY - 2, 7, 'bold', pdfColors.black, 'right');
  
  summaryY = addText('Delivery Fee:', pageWidth - margin - 100, summaryY, 7, 'normal', pdfColors.black, 'right');
  addText(`TZS ${(deliveryFee || 0).toLocaleString()}`, pageWidth - margin - 20, summaryY - 2, 7, 'bold', pdfColors.black, 'right');
  
  summaryY = addText('Service Fee (2%):', pageWidth - margin - 100, summaryY, 7, 'normal', pdfColors.black, 'right');
  addText(`TZS ${(serviceFee || 0).toLocaleString()}`, pageWidth - margin - 20, summaryY - 2, 7, 'bold', pdfColors.black, 'right');
  
  // Total line - reduced size
  summaryY += 6;
  addLine(pageWidth - margin - 105, summaryY, pageWidth - margin - 15, summaryY, pdfColors.primary, 1);
  summaryY += 4;
  
  // Total amount - reduced size
  addRect(pageWidth - margin - 105, summaryY - 3, 90, 12, pdfColors.primary, true);
  summaryY = addText('TOTAL:', pageWidth - margin - 100, summaryY, 8, 'bold', pdfColors.white, 'right');
  addText(`TZS ${total.toLocaleString()}`, pageWidth - margin - 20, summaryY - 3, 10, 'bold', pdfColors.white, 'right');
  
  // Footer - Compact design
  yPosition = pageHeight - 30;
  addLine(margin, yPosition, pageWidth - margin, yPosition, pdfColors.primary, 2);
  yPosition += 6;
  
  yPosition = addText('Thank you for supporting local farmers!', pageWidth / 2, yPosition, 8, 'bold', pdfColors.primary, 'center');
  yPosition += 4;
  yPosition = addText('SFMP - Smart Farming Marketplace', pageWidth / 2, yPosition, 6, 'normal', pdfColors.gray, 'center');
  yPosition += 3;
  yPosition = addText('support@sfmp.co.tz | +255 123 456 789', pageWidth / 2, yPosition, 5, 'normal', pdfColors.gray, 'center');
  
  // Page number
  addText(`Page 1`, pageWidth / 2, pageHeight - 6, 5, 'normal', pdfColors.gray, 'center');
  
  // Save the PDF
  const timestamp = new Date().toISOString().split('T')[0];
  pdf.save(`SFMP_Invoice_${order.id}_${timestamp}.pdf`);
  
  // Show success message
  if (window.Swal) {
    Swal.fire({
      icon: 'success',
      title: 'Invoice Downloaded!',
      text: `Compact invoice #${order.id} has been generated successfully.`,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }
};
</script>
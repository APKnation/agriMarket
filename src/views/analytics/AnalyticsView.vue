<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed lg:relative z-30 w-16 lg:w-16 bg-white shadow-sm border-r border-gray-200 flex flex-col h-screen lg:h-auto">
      <div class="p-3 lg:p-4 border-b border-gray-200">
        <div class="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-sm lg:text-lg">SF</span>
        </div>
      </div>
      <nav class="flex-1 py-2 lg:py-4">
        <router-link v-for="item in navigation" :key="item.name" :to="item.path"
          class="flex flex-col items-center py-2 lg:py-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors group relative"
          :class="{ 'text-emerald-600 bg-emerald-50': activeTab === item.name.toLowerCase() || (item.name === 'Dashboard' && activeTab === 'dashboard') }">
          <component :is="item.icon" class="w-5 h-5 lg:w-6 lg:h-6 mb-1" />
          <span class="text-xs font-medium hidden lg:block">{{ item.name }}</span>
          <span v-if="item.badge" class="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {{ item.badge }}
          </span>
        </router-link>
      </nav>
      <div class="p-3 lg:p-4 border-t border-gray-200">
        <div class="relative">
          <img src="https://images.unsplash.com/photo-1472099645785-5c8a8f4700b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1w=auto=format&fit=crop&w=150&q=80" 
               alt="Admin" class="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300">
          <div class="absolute bottom-0 right-0 w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="showMobileMenu" class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" @click="showMobileMenu = false"></div>
    
    <!-- Mobile Menu Button -->
    <button @click="showMobileMenu = !showMobileMenu" class="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-md border border-gray-200">
      <Menu class="w-5 h-5 text-gray-600" />
    </button>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col lg:ml-0">
      <header class="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center space-x-2 lg:space-x-4">
            <h1 class="text-xl lg:text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-xs lg:text-sm text-gray-600 hidden sm:inline">Everything is working</span>
            </div>
          </div>
          <div class="flex items-center space-x-2 lg:space-x-4">
            <div class="relative hidden sm:block">
              <input type="text" placeholder="Search..." 
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-32 lg:w-64">
              <Search class="absolute left-3 top-2.5 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
            </div>
            <button class="relative text-gray-600 hover:text-gray-900 transition-colors p-1">
              <Bell class="w-5 h-5 lg:w-6 lg:h-6" />
              <span class="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full"></span>
            </button>
            <button class="flex items-center space-x-1 lg:space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-1">
              <img src="https://images.unsplash.com/photo-1472099645785-5c8a8f4700b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1w=auto=format&fit=crop&w=150&q=80" 
                   alt="Admin" class="w-6 h-6 lg:w-8 lg:h-8 rounded-full">
              <ChevronDown class="w-3 h-3 lg:w-4 lg:h-4 hidden sm:block" />
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 p-3 lg:p-6 bg-gray-50">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center py-12">
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-6 w-6 lg:h-8 lg:w-8 border-b-2 border-emerald-600"></div>
            <p class="mt-4 text-sm lg:text-base text-gray-600">Loading analytics data...</p>
          </div>
        </div>

        <!-- Dashboard Tab -->
        <div v-else-if="activeTab === 'dashboard'" class="space-y-4 lg:space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div class="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
              <div class="flex items-center">
                <div class="p-2 lg:p-3 bg-blue-100 rounded-lg">
                  <Users class="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <div class="ml-3 lg:ml-4">
                  <p class="text-xs lg:text-sm text-gray-600">Total Users</p>
                  <p class="text-lg lg:text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
              <div class="flex items-center">
                <div class="p-2 lg:p-3 bg-green-100 rounded-lg">
                  <ShoppingCart class="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div class="ml-3 lg:ml-4">
                  <p class="text-xs lg:text-sm text-gray-600">Total Orders</p>
                  <p class="text-lg lg:text-2xl font-bold text-gray-900">{{ stats.totalOrders }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
              <div class="flex items-center">
                <div class="p-2 lg:p-3 bg-yellow-100 rounded-lg">
                  <Package class="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
                </div>
                <div class="ml-3 lg:ml-4">
                  <p class="text-xs lg:text-sm text-gray-600">Total Products</p>
                  <p class="text-lg lg:text-2xl font-bold text-gray-900">{{ stats.totalProducts }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
              <div class="flex items-center">
                <div class="p-2 lg:p-3 bg-purple-100 rounded-lg">
                  <DollarSign class="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                </div>
                <div class="ml-3 lg:ml-4">
                  <p class="text-xs lg:text-sm text-gray-600">Total Revenue</p>
                  <p class="text-lg lg:text-2xl font-bold text-gray-900">TZS {{ (stats.totalRevenue || 0).toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Connection Status Indicator -->
          <div class="bg-white rounded-lg shadow-sm border p-3 lg:p-4 mb-4 lg:mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div class="flex items-center">
                <component 
                  :is="isConnected ? Wifi : WifiOff" 
                  :class="getConnectionColor()"
                  class="w-4 h-4 lg:w-5 lg:h-5 mr-2"
                />
                <span :class="getConnectionColor()" class="text-xs lg:text-sm font-medium">
                  {{ getConnectionText() }}
                </span>
                <span v-if="isConnected" class="ml-2 text-xs text-gray-500 hidden sm:inline">
                  Real-time analytics active
                </span>
              </div>
              <div v-if="isConnected" class="flex flex-wrap items-center gap-2 lg:gap-4 text-xs text-gray-600">
                <span>{{ liveMetrics.totalOrders }} orders</span>
                <span>TZS {{ liveRevenue.toLocaleString() }} revenue</span>
                <span>{{ liveMetrics.pendingOrders }} pending</span>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div class="space-y-4">
              <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center justify-between py-2 border-b">
                <div class="flex items-center space-x-3">
                  <div :class="getActivityIconClass(activity.type)">
                    <component :is="getActivityIcon(activity.type)" class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ activity.description }}</p>
                    <p class="text-xs text-gray-500">{{ activity.timestamp }}</p>
                  </div>
                </div>
                <span :class="getStatusBadgeClass(activity.status)">
                  {{ activity.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Tab -->
        <div v-if="activeTab === 'users'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="p-6 border-b">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-900">User Management</h2>
                <div class="flex space-x-2">
                  <select v-model="userFilter" class="px-3 py-2 border rounded-md text-sm">
                    <option value="all">All Users</option>
                    <option value="farmer">Farmers</option>
                    <option value="buyer">Buyers</option>
                    <option value="cooperative">Cooperatives</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in filteredUsers" :key="user.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span class="text-sm font-medium">{{ getInitials(user.name) }}</span>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                          <div class="text-sm text-gray-500">{{ user.phone }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getRoleBadgeClass(user.role)">
                        {{ user.role }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ user.location }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusBadgeClass(user.verified ? 'verified' : 'pending')">
                        {{ user.verified ? 'Verified' : 'Pending' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button @click="viewUserDetails(user)" class="text-emerald-600 hover:text-emerald-900 mr-3">
                        View
                      </button>
                      <button @click="toggleUserStatus(user)" class="text-yellow-600 hover:text-yellow-900 mr-3">
                        {{ user.verified ? 'Suspend' : 'Verify' }}
                      </button>
                      <button @click="deleteUser(user)" class="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Orders Tab -->
        <div v-if="activeTab === 'orders'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="p-6 border-b">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-900">Order Management</h2>
                <div class="flex space-x-2">
                  <select v-model="orderFilter" class="px-3 py-2 border rounded-md text-sm">
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="order in filteredOrders" :key="order.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{{ order.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ order.customer?.name || 'Unknown' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ order.items?.length || 0 }} items
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      TZS {{ (order.total || 0).toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusBadgeClass(order.status)">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ formatDate(order.date) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button @click="viewOrderDetails(order)" class="text-emerald-600 hover:text-emerald-900 mr-3">
                        View
                      </button>
                      <button @click="updateOrderStatus(order)" class="text-yellow-600 hover:text-yellow-900">
                        Update
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Products Tab -->
        <div v-if="activeTab === 'products'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="p-6 border-b">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-900">Product Management</h2>
                <div class="flex space-x-2">
                  <select v-model="productFilter" class="px-3 py-2 border rounded-md text-sm">
                    <option value="all">All Products</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="product in filteredProducts" :key="product.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package class="w-5 h-5 text-gray-500" />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                          <div class="text-sm text-gray-500">{{ product.category }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ product.farmerName }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      TZS {{ product.price?.toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ product.quantity }} {{ product.unit }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusBadgeClass(product.status)">
                        {{ product.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button @click="viewProductDetails(product)" class="text-emerald-600 hover:text-emerald-900 mr-3">
                        View
                      </button>
                      <button @click="toggleProductStatus(product)" class="text-yellow-600 hover:text-yellow-900">
                        {{ product.status === 'available' ? 'Hide' : 'Show' }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Original Charts (when dashboard tab is active) -->
        <div v-if="activeTab === 'dashboard'" class="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <!-- Revenue Analytics -->
          <div class="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 gap-3">
              <h3 class="text-base lg:text-lg font-semibold text-gray-900">Revenue Analytics</h3>
              <select v-model="chartType" @change="updateChart" class="border border-gray-300 rounded-lg px-3 py-1 text-sm w-full sm:w-auto">
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
                <option value="customers">Customers</option>
              </select>
            </div>
            <div class="h-64 lg:h-80">
              <canvas ref="revenueChart"></canvas>
            </div>
          </div>

          <!-- Customer Growth -->
          <div class="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 gap-3">
              <h3 class="text-base lg:text-lg font-semibold text-gray-900">Customer Growth</h3>
              <div class="flex space-x-1 lg:space-x-2">
                <button class="px-2 lg:px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Day</button>
                <button class="px-2 lg:px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg">Week</button>
                <button class="px-2 lg:px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Month</button>
              </div>
            </div>
            <div class="h-64 lg:h-80">
              <canvas ref="growthChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Recent Orders (when dashboard tab is active) -->
        <div v-if="activeTab === 'dashboard'" class="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 gap-3">
            <h3 class="text-base lg:text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button class="text-emerald-600 hover:text-emerald-700 text-sm font-medium">View All</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[500px]">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th class="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th class="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Product</th>
                  <th class="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th class="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Date</th>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import { useProductsStore } from "@/stores/products";
import { useWebSocket } from "@/services/websocket";
import { DollarSign, Users, ShoppingCart, TrendingUp, Search, Bell, ChevronDown, Home, BarChart3, Package, FileText, Settings, Wifi, WifiOff, Menu } from 'lucide-vue-next'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js'
import jsPDF from 'jspdf'
import Swal from 'sweetalert2'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore();
const productsStore = useProductsStore();

// WebSocket service
const { 
  isConnected, 
  connectionStatus, 
  connect, 
  disconnect, 
  liveRevenue,
  liveMetrics,
  getConnectionColor,
  getConnectionText 
} = useWebSocket();

const activeTab = ref('dashboard')
const showMobileMenu = ref(false)
const userFilter = ref('all')
const orderFilter = ref('all')
const productFilter = ref('all')
const isLoading = ref(true)

// Mock data - in real app, this would come from API
const users = ref([])
const orders = ref([])
const products = ref([])
const recentActivity = ref([])

// Chart instances
const revenueChartInstance = ref(null)
const growthChartInstance = ref(null)

// Chart data
const chartType = ref('revenue')
const chartPeriod = ref('weekly')

const metrics = ref({
  totalRevenue: 45000000,
  activeFarmers: 1250,
  totalOrders: 1423,
  avgOrderValue: 5294,
  customerSatisfaction: 4.8
})

const navigation = [
  { name: 'Dashboard', path: '/analytics', icon: Home },
  { name: 'Orders', path: '/orders', icon: FileText },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Settings', path: '/settings', icon: Settings }
]

// Computed properties
const stats = computed(() => ({
  totalUsers: users.value.length,
  totalOrders: orders.value.length,
  totalProducts: products.value.length,
  totalRevenue: metrics.value.totalRevenue
}))

// Methods
const getActivityIcon = (type) => {
  const icons = {
    order: ShoppingCart,
    user: Users,
    product: Package,
    revenue: DollarSign
  }
  return icons[type] || FileText
}

const getActivityIconClass = (type) => {
  const classes = {
    order: 'p-2 bg-blue-100 rounded-lg text-blue-600',
    user: 'p-2 bg-green-100 rounded-lg text-green-600',
    product: 'p-2 bg-yellow-100 rounded-lg text-yellow-600',
    revenue: 'p-2 bg-purple-100 rounded-lg text-purple-600'
  }
  return classes[type] || 'p-2 bg-gray-100 rounded-lg text-gray-600'
}

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800',
    completed: 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800',
    cancelled: 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800'
  }
  return classes[status] || 'px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800'
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800',
    completed: 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800',
    cancelled: 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800'
  }
  return classes[status] || 'px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800'
}

const loadData = async () => {
  console.log('Analytics: Starting data load...');
  try {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      users.value = JSON.parse(savedUsers)
    }

    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      orders.value = JSON.parse(savedOrders)
    }

    // Load products from localStorage
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      products.value = JSON.parse(savedProducts)
    }

    // Update metrics with live data if available
    const liveRevenueValue = isConnected.value ? liveRevenue.value : 0;
    const localRevenue = orders.value.reduce((sum, order) => sum + (order.totals?.total || order.total || 0), 0);
    
    metrics.value = {
      ...metrics.value,
      totalUsers: users.value.length,
      totalOrders: isConnected.value ? liveMetrics.totalOrders : orders.value.length,
      totalProducts: products.value.length,
      totalRevenue: liveRevenueValue || localRevenue
    }

    // Generate recent activity
    recentActivity.value = [
      { id: 1, type: 'order', description: 'New order #12345 placed', status: 'pending', timestamp: '2 hours ago' },
      { id: 2, type: 'user', description: 'New user John Mwangi registered', status: 'verified', timestamp: '4 hours ago' },
      { id: 3, type: 'product', description: 'New product "Fresh Tomatoes" listed', status: 'available', timestamp: '6 hours ago' },
      { id: 4, type: 'revenue', description: 'Revenue milestone: TZS 100,000 reached', status: 'completed', timestamp: '1 day ago' }
    ]

    console.log('Analytics: Data loaded successfully');
    isLoading.value = false
  } catch (error) {
    console.error('Error loading data:', error)
    isLoading.value = false
  }
}

const initCharts = async () => {
  console.log('Analytics: Initializing charts...');
  try {
    // Initialize Chart.js charts
    const ctx = document.getElementById('revenueChart')
    if (!ctx) {
      console.error('Revenue chart canvas not found')
      return
    }

    const ctx2 = document.getElementById('growthChart')
    if (!ctx2) {
      console.error('Growth chart canvas not found')
      return
    }

    // Destroy existing charts if they exist
    if (revenueChartInstance.value) {
      revenueChartInstance.value.destroy()
    }
    if (growthChartInstance.value) {
      growthChartInstance.value.destroy()
    }

    // Chart configuration
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }

    // Revenue Chart
    revenueChartInstance.value = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [0, 0, 0, 0, 0, 0],
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: chartOptions
    })

    // Growth Chart
    growthChartInstance.value = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Users', 'Orders', 'Products', 'Revenue'],
        datasets: [{
          label: 'Growth',
          data: [0, 0, 0, 0],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(147, 51, 234, 0.8)'
          ]
        }]
      },
      options: chartOptions
    })

    console.log('Analytics: Charts initialized successfully');
  } catch (error) {
    console.error('Error initializing charts:', error)
  }
}

const updateChart = () => {
  if (!revenueChartInstance.value) return

  const datasets = {
    revenue: {
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4
    },
    orders: {
      label: 'Orders',
      data: [12, 19, 15, 25, 22, 30, 28],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    },
    users: {
      label: 'Users',
      data: [120, 190, 150, 250, 220, 300, 280],
      borderColor: 'rgb(168, 85, 247)',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      tension: 0.4
    }
  }

  revenueChartInstance.value.data.datasets = [datasets[chartType.value]]
  revenueChartInstance.value.update()
}

onMounted(async () => {
  console.log('Analytics: Component mounted');
  
  // Add a timeout to prevent infinite loading
  const loadingTimeout = setTimeout(() => {
    console.log('Analytics: Loading timeout reached, forcing hide');
    isLoading.value = false;
  }, 5000); // 5 second timeout
  
  try {
    await loadData()
    await initCharts()
    connect(); // Connect to WebSocket for real-time updates
    clearTimeout(loadingTimeout); // Clear timeout if successful
  } catch (error) {
    console.error('Error initializing analytics:', error)
    isLoading.value = false
    clearTimeout(loadingTimeout);
  }
})

onUnmounted(() => {
  if (revenueChartInstance) revenueChartInstance.destroy()
  if (growthChartInstance) growthChartInstance.destroy()
  disconnect(); // Disconnect WebSocket when component unmounts
})

/* -----------------------------
   PDF DOWNLOAD (Compact Single Page Design)
------------------------------ */
const downloadInvoice = async (order) => {
  const pdf = new jsPDF();
  
  // Page setup
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  
  // Color palette (based on image)
  const colors = {
    primary: [0, 102, 51],      // Green (like in image)
    secondary: [255, 140, 0],    // Orange (like in image)
    black: [0, 0, 0],
    white: [255, 255, 255],
    gray: [128, 128, 128],
    lightGray: [240, 240, 240]
  };
  
  // Helper functions
  const addText = (text, x, y, size = 8, style = 'normal', color = colors.black, align = 'left') => {
    pdf.setFontSize(size);
    pdf.setFont('helvetica', style);
    pdf.setTextColor(...color);
    pdf.text(text, x, y, { align });
    return y + size + 1;
  };
  
  const addLine = (x1, y1, x2, y2, color = colors.gray, width = 0.1) => {
    pdf.setDrawColor(...color);
    pdf.setLineWidth(width);
    pdf.line(x1, y1, x2, y2);
  };
  
  const addRect = (x, y, width, height, color = colors.black, fillColor = null) => {
    pdf.setDrawColor(...color);
    if (fillColor) {
      pdf.setFillColor(...fillColor);
      pdf.rect(x, y, width, height, 'FD');
    } else {
      pdf.rect(x, y, width, height);
    }
  };
  
  // Header
  let yPosition = margin;
  
  // Company header with green background
  addRect(margin, yPosition, pageWidth - 2 * margin, 25, colors.primary, colors.primary);
  addText('SFMP - Smart Farming Marketplace', margin + 5, yPosition + 15, 14, 'bold', colors.white);
  yPosition += 30;
  
  // Invoice info
  addText(`Invoice #${order.id}`, margin, yPosition, 12, 'bold');
  addText(`Date: ${new Date(order.date).toLocaleDateString()}`, pageWidth - margin - 40, yPosition, 8, 'normal', colors.black, 'right');
  yPosition += 10;
  
  // Customer and order info boxes
  const boxWidth = (pageWidth - 2 * margin - 10) / 2;
  
  // Customer info box
  addRect(margin, yPosition, boxWidth, 35, colors.primary);
  addText('CUSTOMER INFORMATION', margin + 3, yPosition + 5, 6, 'bold', colors.white);
  addText(order.customer?.name || 'N/A', margin + 3, yPosition + 12, 8, 'bold', colors.black);
  addText(order.customer?.email || 'N/A', margin + 3, yPosition + 19, 7, 'normal', colors.gray);
  addText(order.customer?.phone || 'N/A', margin + 3, yPosition + 26, 7, 'normal', colors.gray);
  
  // Order info box
  addRect(margin + boxWidth + 10, yPosition, boxWidth, 35, colors.primary);
  addText('ORDER INFORMATION', margin + boxWidth + 13, yPosition + 5, 6, 'bold', colors.white);
  addText(`Status: ${order.status}`, margin + boxWidth + 13, yPosition + 12, 8, 'bold', colors.black);
  addText(`Payment: ${order.payment || 'Cash on Delivery'}`, margin + boxWidth + 13, yPosition + 19, 7, 'normal', colors.gray);
  addText(`Type: ${order.type || 'Purchase Order'}`, margin + boxWidth + 13, yPosition + 26, 7, 'normal', colors.gray);
  yPosition += 42;
  
  // Items table header
  addRect(margin, yPosition, pageWidth - 2 * margin, 12, colors.primary, colors.primary);
  addText('ITEM', margin + 3, yPosition + 7, 7, 'bold', colors.white);
  addText('QTY', margin + 90, yPosition + 7, 7, 'bold', colors.white);
  addText('UNIT PRICE', margin + 120, yPosition + 7, 7, 'bold', colors.white);
  addText('TOTAL', pageWidth - margin - 30, yPosition + 7, 7, 'bold', colors.white, 'right');
  yPosition += 15;
  
  // Items list - compact with dynamic fitting
  const maxItems = Math.floor((pageHeight - 180) / 12); // Calculate how many items can fit
  const itemsToShow = Math.min(order.items?.length || 0, maxItems);
  const hasMoreItems = (order.items?.length || 0) > maxItems;
  
  for (let index = 0; index < itemsToShow; index++) {
    const item = order.items[index];
    
    // Alternate row colors
    if (index % 2 === 0) {
      addRect(margin, yPosition - 1, pageWidth - 2 * margin, 10, colors.lightGray, colors.lightGray);
    }
    
    // Get item name and price from product store
    let itemName = item.name || `Product ${index + 1}`;
    let itemPrice = 0;
    
    if (item.productId) {
      const product = productsStore.getProductById(item.productId);
      if (product) {
        itemName = product.name;
        itemPrice = product.price;
      }
    }
    
    // Fallback to item data if product not found
    if (itemPrice === 0 && item.price) {
      itemPrice = item.price;
    }
    
    // Default price if still 0
    if (itemPrice === 0) {
      itemPrice = 1000;
    }
    
    // Item description - compact
    const itemLines = pdf.splitTextToSize(itemName, 85);
    itemLines.forEach((line, lineIndex) => {
      yPosition = addText(line, margin + 5, yPosition, 6, 'normal', colors.black);
    });
    
    // Quantity, Unit Price, Total - compact
    const itemY = yPosition - (itemLines.length - 1) * 2;
    addText(`${item.quantity || 1}`, margin + 90, itemY, 6, 'normal', colors.black);
    addText(`TZS ${itemPrice.toLocaleString()}`, margin + 120, itemY, 6, 'normal', colors.black);
    const itemTotal = itemPrice * (item.quantity || 1);
    addText(`TZS ${itemTotal.toLocaleString()}`, pageWidth - margin - 30, itemY, 6, 'bold', colors.primary, 'right');
    
    yPosition += 4;
  }
  
  // Show "more items" indicator if needed
  if (hasMoreItems) {
    const remainingItems = (order.items?.length || 0) - maxItems;
    addText(`+ ${remainingItems} more items`, margin + 5, yPosition, 6, 'italic', colors.secondary);
    yPosition += 8;
  }
  
  yPosition += 8;
  
  // Summary section - compact
  const summaryY = yPosition;
  addLine(margin, summaryY, pageWidth - margin, summaryY, colors.primary, 0.5);
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
  
  // Summary lines - compact
  addText(`Subtotal: TZS ${subtotal.toLocaleString()}`, pageWidth - margin - 60, summaryY + 8, 7, 'normal', colors.gray, 'right');
  addText(`Delivery: TZS ${deliveryFee.toLocaleString()}`, pageWidth - margin - 60, summaryY + 15, 7, 'normal', colors.gray, 'right');
  addText(`Service: TZS ${serviceFee.toLocaleString()}`, pageWidth - margin - 60, summaryY + 22, 7, 'normal', colors.gray, 'right');
  
  // Total box with green background
  const totalBoxY = summaryY + 28;
  addRect(pageWidth - margin - 65, totalBoxY, 60, 15, colors.primary, colors.primary);
  addText(`TOTAL: TZS ${total.toLocaleString()}`, pageWidth - margin - 5, totalBoxY + 10, 8, 'bold', colors.white, 'right');
  
  // Footer - compact
  const footerY = pageHeight - 25;
  addLine(margin, footerY, pageWidth - margin, footerY, colors.primary, 0.5);
  addText('Thank you for your business!', margin + 5, footerY + 8, 8, 'italic', colors.primary);
  addText('SFMP - Smart Farming Marketplace', pageWidth - margin - 5, footerY + 8, 7, 'normal', colors.gray, 'right');
  addText('Page 1', pageWidth / 2, footerY + 15, 6, 'normal', colors.gray, 'center');
  
  // Save the PDF
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  pdf.save(`SFMP_Invoice_${order.id}_${timestamp}.pdf`);
  
  // Show success message
  Swal.fire({
    icon: 'success',
    title: 'Invoice Downloaded!',
    text: `Invoice for Order #${order.id} has been downloaded successfully.`,
    timer: 3000,
    showConfirmButton: false
  });
};
</script>

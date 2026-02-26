<template>
  <div class="order-notifications">
    <!-- Notification Bell with Badge -->
    <div class="relative">
      <button 
        @click="toggleNotifications"
        class="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        <Bell class="w-6 h-6" />
        <span 
          v-if="unreadCount > 0"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </span>
      </button>

      <!-- Notifications Dropdown -->
      <div 
        v-if="showNotifications"
        class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 class="text-sm font-semibold text-gray-900">Order Notifications</h3>
          <button 
            @click="markAllAsRead"
            class="text-xs text-blue-600 hover:text-blue-800"
          >
            Mark all read
          </button>
        </div>

        <!-- Notifications List -->
        <div class="max-h-64 overflow-y-auto">
          <div 
            v-for="notification in notifications.slice(0, 10)"
            :key="notification.id"
            class="p-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
            :class="{ 'bg-blue-50': !notification.read }"
            @click="handleNotificationClick(notification)"
          >
            <div class="flex items-start">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                :class="getNotificationIconClass(notification.type)"
              >
                <component 
                  :is="getNotificationIcon(notification.type)" 
                  class="w-4 h-4"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ notification.title }}
                </p>
                <p class="text-xs text-gray-600 mt-1">
                  {{ notification.message }}
                </p>
                <div class="flex items-center mt-1 text-xs text-gray-500">
                  <Clock class="w-3 h-3 mr-1" />
                  {{ formatTime(notification.timestamp) }}
                </div>
              </div>
              <div 
                v-if="!notification.read"
                class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"
              ></div>
            </div>
          </div>

          <!-- Empty State -->
          <div 
            v-if="notifications.length === 0"
            class="p-6 text-center"
          >
            <Bell class="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p class="text-sm text-gray-500">No notifications</p>
          </div>
        </div>

        <!-- Footer -->
        <div 
          v-if="notifications.length > 0"
          class="p-3 border-t border-gray-200"
        >
          <button 
            @click="viewAllNotifications"
            class="w-full text-xs text-center text-blue-600 hover:text-blue-800"
          >
            View all notifications
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div 
      v-if="showToast"
      class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 min-w-80 max-w-sm animate-slide-in"
    >
      <div class="flex items-start">
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
          :class="getNotificationIconClass(toastNotification?.type)"
        >
          <component 
            :is="getNotificationIcon(toastNotification?.type)" 
            class="w-4 h-4"
          />
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900">
            {{ toastNotification?.title }}
          </p>
          <p class="text-xs text-gray-600 mt-1">
            {{ toastNotification?.message }}
          </p>
        </div>
        <button 
          @click="hideToast"
          class="ml-3 text-gray-400 hover:text-gray-600"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import {
  Bell,
  CheckCircle,
  Package,
  Truck,
  AlertCircle,
  Clock,
  X,
  DollarSign
} from 'lucide-vue-next'

const ordersStore = useOrdersStore()

// State
const showNotifications = ref(false)
const showToast = ref(false)
const toastNotification = ref(null)
const notifications = ref([])

// Computed
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

// Methods
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
  saveNotifications()
}

const handleNotificationClick = (notification) => {
  notification.read = true
  saveNotifications()
  
  // Handle specific notification actions
  if (notification.action) {
    handleNotificationAction(notification)
  }
  
  showNotifications.value = false
}

const handleNotificationAction = (notification) => {
  switch (notification.action.type) {
    case 'view_order':
      // Navigate to order details
      console.log('Navigate to order:', notification.action.orderId)
      break
    case 'track_order':
      // Open order tracking
      console.log('Track order:', notification.action.orderId)
      break
    case 'view_analytics':
      // Navigate to analytics
      console.log('Navigate to analytics')
      break
  }
}

const addNotification = (notification) => {
  const newNotification = {
    id: Date.now(),
    read: false,
    timestamp: new Date().toISOString(),
    ...notification
  }
  
  notifications.value.unshift(newNotification)
  saveNotifications()
  
  // Show toast for important notifications
  if (notification.showToast !== false) {
    showToastNotification(newNotification)
  }
}

const showToastNotification = (notification) => {
  toastNotification.value = notification
  showToast.value = true
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideToast()
  }, 5000)
}

const hideToast = () => {
  showToast.value = false
  toastNotification.value = null
}

const viewAllNotifications = () => {
  // Navigate to full notifications page
  console.log('Navigate to notifications page')
  showNotifications.value = false
}

const getNotificationIcon = (type) => {
  const icons = {
    order_created: Package,
    order_confirmed: CheckCircle,
    order_shipped: Truck,
    order_delivered: CheckCircle,
    order_cancelled: AlertCircle,
    payment_received: DollarSign,
    low_stock: AlertCircle,
    system: Bell
  }
  return icons[type] || Bell
}

const getNotificationIconClass = (type) => {
  const classes = {
    order_created: 'bg-blue-100 text-blue-600',
    order_confirmed: 'bg-green-100 text-green-600',
    order_shipped: 'bg-purple-100 text-purple-600',
    order_delivered: 'bg-green-100 text-green-600',
    order_cancelled: 'bg-red-100 text-red-600',
    payment_received: 'bg-green-100 text-green-600',
    low_stock: 'bg-orange-100 text-orange-600',
    system: 'bg-gray-100 text-gray-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString()
}

const saveNotifications = () => {
  localStorage.setItem('order_notifications', JSON.stringify(notifications.value))
}

const loadNotifications = () => {
  try {
    const saved = localStorage.getItem('order_notifications')
    if (saved) {
      notifications.value = JSON.parse(saved)
    } else {
      // Create sample notifications
      createSampleNotifications()
    }
  } catch (error) {
    console.error('Error loading notifications:', error)
    notifications.value = []
  }
}

const createSampleNotifications = () => {
  const sampleNotifications = [
    {
      type: 'order_created',
      title: 'New Order Received',
      message: 'Order #12348 has been placed',
      action: { type: 'view_order', orderId: 12348 },
      showToast: true
    },
    {
      type: 'order_confirmed',
      title: 'Order Confirmed',
      message: 'Order #12347 payment has been confirmed',
      action: { type: 'track_order', orderId: 12347 },
      showToast: true
    },
    {
      type: 'order_shipped',
      title: 'Order Shipped',
      message: 'Order #12346 is out for delivery',
      action: { type: 'track_order', orderId: 12346 },
      showToast: true
    }
  ]
  
  sampleNotifications.forEach((notification, index) => {
    const timestamp = new Date(Date.now() - (index * 3600000)).toISOString()
    addNotification({ ...notification, timestamp })
  })
}

// Watch for order changes and create notifications
const watchOrderChanges = () => {
  // This would typically be done with a proper event system
  // For now, we'll just check periodically
  setInterval(() => {
    // Check for new orders and create notifications
    const recentOrders = ordersStore.recentOrders
    if (recentOrders.length > 0) {
      const latestOrder = recentOrders[0]
      const orderAge = Date.now() - new Date(latestOrder.createdAt).getTime()
      
      // If order is less than 5 minutes old, show notification
      if (orderAge < 300000) {
        addNotification({
          type: 'order_created',
          title: 'New Order Received',
          message: `Order #${latestOrder.id} has been placed`,
          action: { type: 'view_order', orderId: latestOrder.id }
        })
      }
    }
  }, 30000) // Check every 30 seconds
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.order-notifications')) {
    showNotifications.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadNotifications()
  document.addEventListener('click', handleClickOutside)
  watchOrderChanges()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Expose methods for external use
defineExpose({
  addNotification
})
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

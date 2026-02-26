<template>
  <div class="order-tracker">
    <!-- Order Timeline -->
    <div class="relative">
      <!-- Timeline Line -->
      <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      
      <!-- Timeline Items -->
      <div class="space-y-6">
        <div
          v-for="(step, index) in timelineSteps"
          :key="step.status"
          class="relative flex items-start"
        >
          <!-- Status Circle -->
          <div
            class="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-300"
            :class="getStatusCircleClass(step)"
          >
            <component
              :is="step.icon"
              :class="getStatusIconClass(step)"
              class="w-6 h-6"
            />
          </div>
          
          <!-- Status Content -->
          <div class="ml-6 flex-1">
            <div class="bg-white rounded-lg border p-4 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-900">{{ step.title }}</h3>
                <span
                  v-if="step.completed"
                  class="text-xs text-gray-500"
                >
                  {{ getStepCompletedTime(step.status) }}
                </span>
              </div>
              
              <p class="text-sm text-gray-600 mb-2">{{ step.description }}</p>
              
              <!-- Step Details -->
              <div v-if="step.details" class="text-xs text-gray-500 space-y-1">
                <div v-for="detail in step.details" :key="detail.label">
                  <span class="font-medium">{{ detail.label }}:</span>
                  <span>{{ detail.value }}</span>
                </div>
              </div>
              
              <!-- Current Step Actions -->
              <div
                v-if="step.status === currentStatus && step.actions"
                class="mt-3 pt-3 border-t border-gray-100"
              >
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="action in step.actions"
                    :key="action.label"
                    @click="action.handler"
                    class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
                    :class="action.class"
                  >
                    <component
                      v-if="action.icon"
                      :is="action.icon"
                      class="w-3 h-3 mr-1 inline"
                    />
                    {{ action.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Summary Card -->
    <div class="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Customer Info -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-2">Customer Information</h4>
          <div class="space-y-1 text-sm text-gray-600">
            <div><strong>Name:</strong> {{ order.customer?.name }}</div>
            <div><strong>Email:</strong> {{ order.customer?.email }}</div>
            <div><strong>Phone:</strong> {{ order.customer?.phone }}</div>
            <div><strong>Location:</strong> {{ order.delivery?.address }}</div>
          </div>
        </div>
        
        <!-- Order Info -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-2">Order Details</h4>
          <div class="space-y-1 text-sm text-gray-600">
            <div><strong>Order ID:</strong> #{{ order.id }}</div>
            <div><strong>Date:</strong> {{ formatDate(order.date) }}</div>
            <div><strong>Payment:</strong> {{ formatPaymentMethod(order.payment) }}</div>
            <div><strong>Total:</strong> TZS {{ (order.totals?.total || order.total || 0).toLocaleString() }}</div>
          </div>
        </div>
      </div>
      
      <!-- Items Summary -->
      <div class="mt-4 pt-4 border-t border-green-200">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Items ({{ order.items?.length || 0 }})</h4>
        <div class="space-y-1">
          <div
            v-for="(item, index) in order.items?.slice(0, 3)"
            :key="index"
            class="flex justify-between text-sm text-gray-600"
          >
            <span>{{ item.quantity }}x {{ item.name }}</span>
            <span>TZS {{ ((item.price || 0) * (item.quantity || 1)).toLocaleString() }}</span>
          </div>
          <div
            v-if="order.items?.length > 3"
            class="text-xs text-gray-500 italic"
          >
            +{{ order.items.length - 3 }} more items
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
          
          <form @submit.prevent="handleStatusUpdate" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">New Status</label>
              <select
                v-model="newStatus"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select status</option>
                <option
                  v-for="status in availableStatusTransitions"
                  :key="status.value"
                  :value="status.value"
                >
                  {{ status.label }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                v-model="statusNotes"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Add notes about this status update..."
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
              <button
                type="submit"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Update Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import {
  Package,
  CheckCircle,
  Truck,
  Home,
  CreditCard,
  Clock,
  AlertCircle,
  Phone,
  MessageSquare,
  MapPin
} from 'lucide-vue-next'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['status-updated'])

const ordersStore = useOrdersStore()

// Modal state
const showStatusModal = ref(false)
const newStatus = ref('')
const statusNotes = ref('')

// Current status
const currentStatus = computed(() => props.order.status)

// Timeline steps based on order status
const timelineSteps = computed(() => {
  const steps = [
    {
      status: 'pending',
      title: 'Order Placed',
      description: 'Order has been received and is awaiting confirmation',
      icon: Package,
      completed: ['confirmed', 'processing', 'shipped', 'delivered'].includes(currentStatus.value),
      current: currentStatus.value === 'pending',
      details: [
        { label: 'Order ID', value: `#${props.order.id}` },
        { label: 'Placed on', value: formatDate(props.order.date) }
      ]
    },
    {
      status: 'confirmed',
      title: 'Order Confirmed',
      description: 'Order has been confirmed and payment verified',
      icon: CheckCircle,
      completed: ['processing', 'shipped', 'delivered'].includes(currentStatus.value),
      current: currentStatus.value === 'confirmed',
      details: [
        { label: 'Payment Method', value: formatPaymentMethod(props.order.payment) },
        { label: 'Confirmed by', value: 'System' }
      ]
    },
    {
      status: 'processing',
      title: 'Processing',
      description: 'Order is being prepared for shipment',
      icon: Clock,
      completed: ['shipped', 'delivered'].includes(currentStatus.value),
      current: currentStatus.value === 'processing',
      details: [
        { label: 'Processing Time', value: '1-2 hours' },
        { label: 'Items', value: `${props.order.items?.length || 0} products` }
      ]
    },
    {
      status: 'shipped',
      title: 'Out for Delivery',
      description: 'Order has been shipped and is on its way',
      icon: Truck,
      completed: currentStatus.value === 'delivered',
      current: currentStatus.value === 'shipped',
      details: [
        { label: 'Delivery Address', value: props.order.delivery?.address },
        { label: 'Estimated Delivery', value: 'Today by 6 PM' }
      ]
    },
    {
      status: 'delivered',
      title: 'Delivered',
      description: 'Order has been successfully delivered',
      icon: Home,
      completed: currentStatus.value === 'delivered',
      current: currentStatus.value === 'delivered',
      details: [
        { label: 'Delivered to', value: props.order.customer?.name },
        { label: 'Delivery Time', value: getStepCompletedTime('delivered') }
      ]
    }
  ]

  // Add cancelled step if applicable
  if (currentStatus.value === 'cancelled') {
    steps.push({
      status: 'cancelled',
      title: 'Order Cancelled',
      description: 'Order was cancelled',
      icon: AlertCircle,
      completed: true,
      current: true,
      details: [
        { label: 'Cancelled on', value: formatDate(props.order.updatedAt) },
        { label: 'Reason', value: props.order.statusNotes || 'No reason provided' }
      ]
    })
  }

  return steps
})

// Available status transitions based on current status
const availableStatusTransitions = computed(() => {
  const transitions = {
    pending: [
      { value: 'confirmed', label: 'Confirm Order' },
      { value: 'cancelled', label: 'Cancel Order' }
    ],
    confirmed: [
      { value: 'processing', label: 'Start Processing' },
      { value: 'cancelled', label: 'Cancel Order' }
    ],
    processing: [
      { value: 'shipped', label: 'Mark as Shipped' },
      { value: 'cancelled', label: 'Cancel Order' }
    ],
    shipped: [
      { value: 'delivered', label: 'Mark as Delivered' }
    ],
    delivered: [],
    cancelled: []
  }

  return transitions[currentStatus.value] || []
})

// Helper functions
const getStatusCircleClass = (step) => {
  if (step.completed) {
    return 'bg-green-100 border-green-500'
  } else if (step.current) {
    return 'bg-blue-100 border-blue-500'
  } else {
    return 'bg-gray-100 border-gray-300'
  }
}

const getStatusIconClass = (step) => {
  if (step.completed) {
    return 'text-green-600'
  } else if (step.current) {
    return 'text-blue-600'
  } else {
    return 'text-gray-400'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-TZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPaymentMethod = (method) => {
  const methods = {
    'cash_on_delivery': 'Cash on Delivery',
    'mobile_money': 'Mobile Money',
    'bank_transfer': 'Bank Transfer',
    'card': 'Card Payment'
  }
  return methods[method] || method
}

const getStepCompletedTime = (status) => {
  const statusHistory = props.order.statusHistory || []
  const step = statusHistory.find(h => h.status === status)
  return step ? formatDate(step.timestamp) : ''
}

// Actions
const openStatusModal = () => {
  showStatusModal.value = true
  newStatus.value = ''
  statusNotes.value = ''
}

const handleStatusUpdate = () => {
  if (!newStatus.value) return

  ordersStore.updateOrderStatus(props.order.id, newStatus.value, statusNotes.value)
  
  emit('status-updated', {
    orderId: props.order.id,
    newStatus: newStatus.value,
    notes: statusNotes.value
  })

  showStatusModal.value = false
  statusNotes.value = ''
}

// Add actions to current step
const currentStep = computed(() => 
  timelineSteps.value.find(step => step.current)
)

// Add actions dynamically to current step
if (currentStep.value && availableStatusTransitions.value.length > 0) {
  currentStep.value.actions = [
    {
      label: 'Update Status',
      icon: CheckCircle,
      class: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      handler: openStatusModal
    }
  ]

  if (currentStatus.value === 'shipped') {
    currentStep.value.actions.push({
      label: 'Track Delivery',
      icon: MapPin,
      class: 'bg-green-100 text-green-700 hover:bg-green-200',
      handler: () => {
        // Open delivery tracking
        console.log('Track delivery for order', props.order.id)
      }
    })
  }

  if (currentStatus.value === 'confirmed' || currentStatus.value === 'processing') {
    currentStep.value.actions.push({
      label: 'Contact Customer',
      icon: Phone,
      class: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      handler: () => {
        // Open contact modal or initiate call
        window.open(`tel:${props.order.customer?.phone}`)
      }
    })
  }
}
</script>

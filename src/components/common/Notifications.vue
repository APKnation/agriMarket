<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="max-w-sm bg-white rounded-lg shadow-lg border-l-4 p-4 transform transition-all duration-300"
      :class="{
        'border-green-500': notification.type === 'success',
        'border-blue-500': notification.type === 'info',
        'border-yellow-500': notification.type === 'warning',
        'border-red-500': notification.type === 'error'
      }"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <CheckCircle v-if="notification.type === 'success'" class="w-5 h-5 text-green-500" />
          <Info v-else-if="notification.type === 'info'" class="w-5 h-5 text-blue-500" />
          <AlertTriangle v-else-if="notification.type === 'warning'" class="w-5 h-5 text-yellow-500" />
          <XCircle v-else-if="notification.type === 'error'" class="w-5 h-5 text-red-500" />
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
          <p class="mt-1 text-sm text-gray-500">{{ notification.message }}</p>
        </div>
        <button
          @click="removeNotification(notification.id)"
          class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-vue-next'

const notifications = ref([])

const addNotification = (notification) => {
  const id = Date.now()
  notifications.value.push({
    id,
    ...notification
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(id)
  }, 5000)
}

const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index !== -1) {
    notifications.value.splice(index, 1)
  }
}

// Make the addNotification function available globally
window.addNotification = addNotification
</script>

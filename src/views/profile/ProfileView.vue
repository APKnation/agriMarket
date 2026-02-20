<template>
  <div class="min-h-screen bg-earth-50">
    <div class="max-w-4xl mx-auto px-6 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

      <div class="card">
        <div class="p-6">
          <!-- Profile Header -->
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-2xl">{{ getInitials(authStore.user?.name) }}</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{{ authStore.user?.name }}</h2>
              <p class="text-gray-600">{{ authStore.user?.role }}</p>
              <p class="text-sm text-gray-500 mt-1">Member since {{ formatDate(authStore.user?.registrationDate) }}</p>
            </div>
          </div>

          <!-- Profile Form -->
          <form @submit.prevent="updateProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  v-model="profileForm.firstName"
                  type="text"
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  v-model="profileForm.lastName"
                  type="text"
                  class="input-field"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                v-model="profileForm.email"
                type="email"
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                v-model="profileForm.phone"
                type="tel"
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                v-model="profileForm.location"
                type="text"
                class="input-field"
              />
            </div>

            <!-- Farmer Specific Fields -->
            <div v-if="authStore.isFarmer" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Farm Size (hectares)</label>
                <input
                  v-model="profileForm.farmSize"
                  type="number"
                  step="0.1"
                  class="input-field"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Primary Crops</label>
                <textarea
                  v-model="profileForm.crops"
                  rows="3"
                  class="input-field"
                  placeholder="List your primary crops..."
                ></textarea>
              </div>
            </div>

            <div class="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn-primary px-6 py-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const profileForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  farmSize: '',
  crops: ''
})

const getInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}

const updateProfile = () => {
  window.addNotification({
    type: 'success',
    title: 'Profile Updated',
    message: 'Your profile has been updated successfully.'
  })
}

onMounted(() => {
  if (authStore.user) {
    const nameParts = authStore.user.name.split(' ')
    profileForm.value = {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: authStore.user.email || '',
      phone: authStore.user.phone || '',
      location: authStore.user.location || '',
      farmSize: authStore.user.farmSize || '',
      crops: authStore.user.crops?.join(', ') || ''
    }
  }
})
</script>

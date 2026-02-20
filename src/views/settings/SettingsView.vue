<template>
  <div class="min-h-screen bg-earth-50">
    <div class="max-w-4xl mx-auto px-6 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div class="space-y-6">
        <!-- Notification Settings -->
        <div class="card">
          <div class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
            <div class="space-y-4">
              <label class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900">Email Notifications</p>
                  <p class="text-sm text-gray-500">Receive email updates about your orders and activities</p>
                </div>
                <input
                  v-model="settings.emailNotifications"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </label>
              <label class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900">SMS Notifications</p>
                  <p class="text-sm text-gray-500">Receive SMS updates for important events</p>
                </div>
                <input
                  v-model="settings.smsNotifications"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </label>
              <label class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900">Order Updates</p>
                  <p class="text-sm text-gray-500">Get notified when your order status changes</p>
                </div>
                <input
                  v-model="settings.orderUpdates"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </label>
            </div>
          </div>
        </div>

        <!-- Language Settings -->
        <div class="card">
          <div class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Language & Region</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select v-model="settings.language" class="input-field">
                  <option value="en">English</option>
                  <option value="sw">Swahili</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select v-model="settings.currency" class="input-field">
                  <option value="TZS">Tanzanian Shilling (TZS)</option>
                  <option value="USD">US Dollar (USD)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select v-model="settings.timezone" class="input-field">
                  <option value="EAT">East Africa Time (EAT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Privacy Settings -->
        <div class="card">
          <div class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h2>
            <div class="space-y-4">
              <label class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900">Profile Visibility</p>
                  <p class="text-sm text-gray-500">Make your profile visible to other users</p>
                </div>
                <input
                  v-model="settings.profileVisible"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </label>
              <label class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900">Location Sharing</p>
                  <p class="text-sm text-gray-500">Share your location with buyers and partners</p>
                </div>
                <input
                  v-model="settings.locationSharing"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </label>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="card">
          <div class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Security</h2>
            <div class="space-y-4">
              <button class="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-900">Change Password</p>
                    <p class="text-sm text-gray-500">Update your account password</p>
                  </div>
                  <ChevronRight class="w-5 h-5 text-gray-400" />
                </div>
              </button>
              <button class="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p class="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <ChevronRight class="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button @click="saveSettings" class="btn-primary px-6 py-2">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

const settings = ref({
  emailNotifications: true,
  smsNotifications: false,
  orderUpdates: true,
  language: 'en',
  currency: 'TZS',
  timezone: 'EAT',
  profileVisible: true,
  locationSharing: true
})

const saveSettings = () => {
  window.addNotification({
    type: 'success',
    title: 'Settings Saved',
    message: 'Your settings have been updated successfully.'
  })
}
</script>

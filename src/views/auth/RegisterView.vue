<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-earth-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center">
          <div class="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-3xl">🌾</span>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">{{ languageStore.t('joinSFMP') }}</h2>
          <p class="mt-2 text-sm text-gray-600">{{ languageStore.t('connectTanzanian') }}</p>
        </div>

      <!-- Registration Form -->
      <div class="card p-8">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Account Type Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Account Type
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label
                v-for="type in accountTypes"
                :key="type.value"
                class="relative flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors"
                :class="form.role === type.value ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'"
              >
                <input
                  v-model="form.role"
                  :value="type.value"
                  type="radio"
                  class="sr-only"
                />
                <span class="text-2xl mb-1">{{ type.icon }}</span>
                <span class="text-sm font-medium">{{ type.label }}</span>
              </label>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="input-field"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="input-field"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              {{ languageStore.t('phoneNumber') }}
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              class="input-field"
              :placeholder="languageStore.t('enterPhone')"
              pattern="[\+]?[0-9\s]{9,15}"
            />
          </div>

          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              id="location"
              v-model="form.location"
              required
              class="input-field"
            >
              <option value="">Select your region</option>
              <option v-for="region in tanzanianRegions" :key="region" :value="region">
                {{ region }}
              </option>
            </select>
          </div>

          <!-- Farmer Specific Fields -->
          <div v-if="form.role === 'farmer'" class="space-y-6">
            <div>
              <label for="farmSize" class="block text-sm font-medium text-gray-700 mb-2">
                Farm Size (hectares)
              </label>
              <input
                id="farmSize"
                v-model="form.farmSize"
                type="number"
                step="0.1"
                min="0.1"
                class="input-field"
                placeholder="Enter farm size in hectares"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Primary Crops
              </label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <label
                  v-for="crop in commonCrops"
                  :key="crop"
                  class="flex items-center space-x-2"
                >
                  <input
                    v-model="form.crops"
                    :value="crop"
                    type="checkbox"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span class="text-sm">{{ crop }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Password Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="input-field pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Eye v-if="!showPassword" class="w-5 h-5 text-gray-400" />
                  <EyeOff v-else class="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="input-field pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Eye v-if="!showConfirmPassword" class="w-5 h-5 text-gray-400" />
                  <EyeOff v-else class="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.agreeToTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-700">
              I agree to the
              <a href="#" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
              and
              <a href="#" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full btn-primary py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>
      </div>

      <!-- Sign In Link -->
      <div class="text-center mt-6">
        <p class="text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            Sign in here
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLanguageStore } from '@/stores/language'
import { Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const languageStore = useLanguageStore()

const form = ref({
  role: 'farmer',
  firstName: '',
  lastName: '',
  phone: '',
  location: '',
  farmSize: '',
  crops: [],
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const isLoading = ref(false)
const error = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const accountTypes = [
  { value: 'farmer', label: 'Farmer', icon: '👨‍🌾' },
  { value: 'buyer', label: 'Buyer', icon: '🛒' },
  { value: 'cooperative', label: 'Cooperative', icon: '🤝' },
  { value: 'admin', label: 'Admin', icon: '👤' }
]

const tanzanianRegions = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi', 'Kigoma',
  'Kilimanjaro', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza',
  'Njombe', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga', 'Simiyu', 'Singida', 'Tabora', 'Tanga'
]

const commonCrops = [
  'Maize', 'Beans', 'Rice', 'Wheat', 'Sorghum', 'Millet', 'Cassava', 'Sweet Potatoes',
  'Tomatoes', 'Onions', 'Cabbage', 'Carrots', 'Bananas', 'Mangoes', 'Citrus', 'Coffee', 'Tea'
]

const handleRegister = async () => {
  isLoading.value = true
  error.value = ''

  // Validate passwords match
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    isLoading.value = false
    return
  }

  try {
    const userData = {
      name: `${form.value.firstName} ${form.value.lastName}`,
      phone: form.value.phone,
      location: form.value.location,
      role: form.value.role,
      password: form.value.password
    }

    // Add farmer-specific data
    if (form.value.role === 'farmer') {
      userData.farmSize = form.value.farmSize
      userData.crops = form.value.crops
    }

    const result = await authStore.register(userData)
    if (result.success) {
      router.push('/dashboard')
    } else {
      error.value = result.error || 'Registration failed. Please try again.'
    }
  } catch (err) {
    error.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

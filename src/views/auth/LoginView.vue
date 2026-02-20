<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-earth-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-white font-bold text-3xl">🌾</span>
        </div>
        <div class="text-center">
<h1 class="text-3xl font-bold text-gray-900">{{ languageStore.t('welcomeBack') }}</h1>
          <p class="mt-2 text-sm text-gray-600">
            {{ languageStore.t('signInToAccount') }}
          </p>
        </div>
      </div>

      <!-- Login Form -->
      <div class="card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
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
                placeholder="Enter your password"
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

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember"
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-700">
                {{ languageStore.t('rememberMe') }}
              </label>
            </div>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-500">
              {{ languageStore.t('forgotPassword') }}
            </a>
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
              Signing in...
            </span>
            <span v-else>{{ languageStore.t('signIn') }}</span>
          </button>
        </form>

        <!-- Demo Accounts -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-600 mb-3">Demo Accounts:</p>
          <div class="space-y-2 text-xs">
            <div class="bg-gray-50 p-2 rounded">
              <strong>Farmer:</strong> +255712345678 / password
            </div>
            <div class="bg-gray-50 p-2 rounded">
              <strong>Buyer:</strong> +255713456789 / password
            </div>
            <div class="bg-gray-50 p-2 rounded">
              <strong>Cooperative:</strong> +255714567890 / password
            </div>
            <div class="bg-gray-50 p-2 rounded">
              <strong>Admin:</strong> +255715678901 / password
            </div>
          </div>
        </div>
      </div>

      <!-- Sign Up Link -->
      <div class="text-center">
        <p class="text-sm text-gray-600">
          {{ languageStore.t('dontHaveAccount') }}
          <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-500">
            {{ languageStore.t('signUpHere') }}
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
  phone: '',
  password: '',
  remember: false
})

const isLoading = ref(false)
const error = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''

  try {
    const result = await authStore.login(form.value)
    if (result.success) {
      router.push('/dashboard')
    } else {
      error.value = result.error || languageStore.t('loginFailed')
    }
  } catch (err) {
    error.value = languageStore.t('unexpectedError')
  } finally {
    isLoading.value = false
  }
}
</script>

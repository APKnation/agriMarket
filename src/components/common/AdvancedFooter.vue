<template>
  <footer class="bg-gradient-to-br from-teal-800 via-teal-900 to-teal-950 text-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ffffff\" fill-opacity=\"0.1\"><path d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/></g></g></svg>');"></div>
    </div>
    
    <div class="relative z-10">
      <!-- Main Footer Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <!-- Brand Section -->
          <div class="lg:col-span-2">
            <div class="mb-8">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                  <span class="text-white font-bold text-2xl">🌾</span>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white">SFMP</h3>
                  <p class="text-yellow-400 text-sm">{{ languageStore.t('tanzania') }}</p>
                </div>
              </div>
              
              <p class="text-teal-100 leading-relaxed mb-6 max-w-md">
                {{ languageStore.t('footerDescription') }}
              </p>
              
              <!-- Social Media -->
              <div class="flex space-x-3">
                <a 
                  v-for="social in socialMedia" 
                  :key="social.name"
                  :href="social.url" 
                  :aria-label="social.name"
                  class="w-10 h-10 bg-teal-700/50 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-teal-600/30"
                >
                  <span class="text-lg">{{ social.icon }}</span>
                </a>
              </div>
            </div>
            
            <!-- Mobile App Download -->
            <div class="bg-teal-700/30 rounded-xl p-6 border border-teal-600/30">
              <h4 class="font-semibold mb-3 text-yellow-400">{{ languageStore.t('mobileApp') }}</h4>
              <p class="text-sm text-teal-100 mb-4">{{ languageStore.t('downloadApp') }}</p>
              <div class="flex flex-col sm:flex-row gap-3">
                <button class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm">
                  <span>📱</span>
                  <span>App Store</span>
                </button>
                <button class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm">
                  <span>🤖</span>
                  <span>Google Play</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold text-lg mb-6 text-yellow-400">{{ languageStore.t('quickLinks') }}</h4>
            <ul class="space-y-3">
              <li v-for="link in quickLinks" :key="link.name">
                <router-link 
                  :to="link.to" 
                  class="text-teal-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span class="transform group-hover:translate-x-1 transition-transform">→</span>
                  <span>{{ link.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h4 class="font-semibold text-lg mb-6 text-yellow-400">{{ languageStore.t('services') }}</h4>
            <ul class="space-y-3">
              <li v-for="service in services" :key="service.name">
                <router-link 
                  :to="service.to" 
                  class="text-teal-100 hover:text-yellow-400 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <span class="transform group-hover:translate-x-1 transition-transform">→</span>
                  <span>{{ service.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Contact & Support -->
          <div>
            <h4 class="font-semibold text-lg mb-6 text-yellow-400">{{ languageStore.t('contactSupport') }}</h4>
            <div class="space-y-4">
              <!-- Contact Info -->
              <div class="space-y-3">
                <div v-for="contact in contactInfo" :key="contact.type" class="flex items-start space-x-3">
                  <component :is="contact.icon" class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p class="text-teal-100 font-medium">{{ contact.label }}</p>
                    <p class="text-sm text-teal-200">{{ contact.value }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Newsletter -->
              <div class="bg-teal-700/30 rounded-xl p-4 border border-teal-600/30">
                <h5 class="font-medium mb-2 text-yellow-400">{{ languageStore.t('newsletter') }}</h5>
                <p class="text-sm text-teal-100 mb-3">{{ languageStore.t('newsletterDesc') }}</p>
                <form @submit.prevent="handleNewsletter" class="flex flex-col space-y-2">
                  <input
                    v-model="newsletterEmail"
                    type="email"
                    :placeholder="languageStore.t('enterEmail')"
                    class="w-full px-3 py-2 bg-teal-800/50 border border-teal-600/50 rounded-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                  <button 
                    type="submit"
                    :disabled="newsletterLoading"
                    class="bg-yellow-500 hover:bg-yellow-600 text-teal-900 px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <span v-if="newsletterLoading" class="animate-spin">⏳</span>
                    <span>{{ languageStore.t('subscribe') }}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-12 pt-8 border-t border-teal-700/50">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <!-- Copyright -->
            <div class="text-center md:text-left">
              <p class="text-teal-200 text-sm">
                {{ languageStore.t('copyright', { year: new Date().getFullYear() }) }}
              </p>
              <p class="text-teal-300 text-xs mt-1">
                {{ languageStore.t('allRightsReserved') }}
              </p>
            </div>
            
            <!-- Bottom Links -->
            <div class="flex flex-wrap justify-center md:justify-end items-center space-x-6 text-sm">
              <router-link 
                v-for="link in bottomLinks" 
                :key="link.name"
                :to="link.to" 
                class="text-teal-300 hover:text-yellow-400 transition-colors"
              >
                {{ link.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Top Button -->
      <button
        @click="scrollToTop"
        :class="['fixed bottom-8 right-8 bg-yellow-500 hover:bg-yellow-600 text-teal-900 p-3 rounded-full shadow-lg transition-all duration-300 z-20', showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0']"
        :aria-label="languageStore.t('backToTop')"
      >
        <ArrowUp class="w-5 h-5" />
      </button>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Phone, Mail, MapPin, ArrowUp, Globe, HeadphonesIcon, Shield, Users } from 'lucide-vue-next'
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()
const newsletterEmail = ref('')
const newsletterLoading = ref(false)
const showBackToTop = ref(false)

// Social Media Links
const socialMedia = ref([
  { name: 'Facebook', url: '#', icon: 'f' },
  { name: 'Twitter', url: '#', icon: '𝕏' },
  { name: 'Instagram', url: '#', icon: '📷' },
  { name: 'LinkedIn', url: '#', icon: 'in' }
])

// Quick Links
const quickLinks = computed(() => [
  { name: languageStore.t('homepage'), to: '/' },
  { name: languageStore.t('aboutUs'), to: '/about' },
  { name: languageStore.t('dashboard'), to: '/dashboard' },
  { name: languageStore.t('farmers'), to: '/farmers' },
  { name: languageStore.t('crops'), to: '/crops' }
])

// Services
const services = computed(() => [
  { name: languageStore.t('marketplace'), to: '/products' },
  { name: languageStore.t('analytics'), to: '/analytics' },
  { name: languageStore.t('training'), to: '/training' },
  { name: languageStore.t('support'), to: '/support' }
])

// Contact Info
const contactInfo = computed(() => [
  {
    type: 'phone',
    icon: Phone,
    label: languageStore.t('hotline'),
    value: '+255 22 211 0000'
  },
  {
    type: 'email',
    icon: Mail,
    label: languageStore.t('email'),
    value: 'info@sfmp.tz'
  },
  {
    type: 'location',
    icon: MapPin,
    label: languageStore.t('headquarters'),
    value: languageStore.t('dodomaTanzania')
  }
])

// Bottom Links
const bottomLinks = computed(() => [
  { name: languageStore.t('privacyPolicy'), to: '/privacy' },
  { name: languageStore.t('termsOfServices'), to: '/terms' },
  { name: languageStore.t('cookiePolicy'), to: '/cookies' }
])

// Newsletter Handler
const handleNewsletter = async () => {
  if (!newsletterEmail.value) return
  
  newsletterLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    window.addNotification({
      type: 'success',
      title: languageStore.t('subscriptionSuccess'),
      message: languageStore.t('subscriptionMessage')
    })
    
    newsletterEmail.value = ''
  } catch (error) {
    window.addNotification({
      type: 'error',
      title: languageStore.t('subscriptionError'),
      message: languageStore.t('subscriptionErrorMessage')
    })
  } finally {
    newsletterLoading.value = false
  }
}

// Scroll to Top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Handle scroll visibility for back to top button
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

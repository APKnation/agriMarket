<template>
  <footer class="bg-teal-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo and Description -->
        <div class="col-span-1 sm:col-span-2 lg:col-span-1">
          <div class="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-3 mb-6">
            <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4 sm:mb-0">
              <span class="text-white font-bold text-xl sm:text-2xl">🌾</span>
            </div>
            <div class="text-center sm:text-left"<div>
              <h3 class="text-xl font-bold">SFMP Tanzania</h3>
              <p class="text-sm text-teal-200">{{ languageStore.t('programSFMP') }}</p>
            </div>
          </div>
          <p class="text-teal-100 text-sm leading-relaxed mb-6">
            {{ languageStore.t('connectingFarmers') }}
          </p>
          
          <!-- Social Media Icons -->
          <div class="flex justify-center sm:justify-start space-x-4">
            <a href="#" class="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
              <span class="text-sm">𝕏</span>
            </a>
            <a href="#" class="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
              <span class="text-sm">in</span>
            </a>
            <a href="#" class="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
              <span class="text-sm">📷</span>
            </a>
            <a href="#" class="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
              <span class="text-sm">f</span>
            </a>
          </div>
        </div>

        <!-- Site Map -->
        <div class="col-span-1">
          <h4 class="font-semibold mb-4 text-center sm:text-left">{{ languageStore.t('siteMap') }}</h4>
          <ul class="space-y-2 text-sm text-center sm:text-left">
            <li><router-link to="/" class="text-teal-100 hover:text-white transition-colors block">{{ languageStore.t('homepage') }}</router-link></li>
            <li><router-link to="/crops" class="text-teal-100 hover:text-white transition-colors block">{{ languageStore.t('technology') }}</router-link></li>
            <li><router-link to="/about" class="text-teal-100 hover:text-white transition-colors block">{{ languageStore.t('aboutUs') }}</router-link></li>
            <li><router-link to="/products" class="text-teal-100 hover:text-white transition-colors block">{{ languageStore.t('resourcesNews') }}</router-link></li>
            <li><router-link to="/careers" class="text-teal-100 hover:text-white transition-colors block">{{ languageStore.t('careers') }}</router-link></li>
            <li><router-link to="/contact" class="text-teal-100 hover:text-white transition-colors block">{{ languageStore.t('contactUs') }}</router-link></li>
            <li><router-link to="/portal" class="text-teal-100 hover:text-white transition-colors block">{{ languageStore.t('portal') }}</router-link></li>
          </ul>
        </div>

        <!-- Get in Touch -->
        <div class="col-span-1">
          <h4 class="font-semibold mb-4 text-center sm:text-left">{{ languageStore.t('getInTouch') }}</h4>
          <div class="space-y-3 text-sm">
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-2">
              <Phone class="w-4 h-4 text-teal-200 flex-shrink-0" />
              <span class="text-teal-100">+255 22 211 0000</span>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-2">
              <Mail class="w-4 h-4 text-teal-200 flex-shrink-0" />
              <span class="text-teal-100">info@sfmp.tz</span>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-2">
              <MapPin class="w-4 h-4 text-teal-200 flex-shrink-0" />
              <span class="text-teal-100">Dodoma, Tanzania</span>
            </div>
          </div>
          
          <!-- Newsletter Signup -->
          <div class="mt-4">
            <p class="text-sm text-teal-100 mb-2 text-center sm:text-left">{{ languageStore.t('subscribeNewsletter') }}</p>
            <div class="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                :placeholder="languageStore.t('enterEmail')"
                class="flex-1 px-3 py-2 bg-teal-700 border border-teal-600 rounded-lg text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
              />
              <button class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
                {{ languageStore.t('subscribe') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Legal -->
        <div class="col-span-1">
          <h4 class="font-semibold mb-4 text-center sm:text-left">{{ languageStore.t('legal') }}</h4>
          <ul class="space-y-2 text-sm text-center sm:text-left">
            <li><router-link to="/privacy" class="text-teal-100 hover:text-white transition-colors block">{{ languageStore.t('privacyPolicy') }}</router-link></li>
            <li><router-link to="/terms" class="text-teal-100 hover:text-white transition-colors block">{{ languageStore.t('termsOfServices') }}</router-link></li>
            <li><router-link to="/concerns" class="text-teal-100 hover:text-white transition-colors block">{{ languageStore.t('farmersConcerns') }}</router-link></li>
          </ul>
        </div>
      </div>

      <!-- Back to Top Button -->
      <div class="mt-8 text-center">
        <button
          @click="scrollToTop"
          class="bg-teal-700 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors w-full sm:w-auto"
        >
          {{ languageStore.t('backToTop') }}
        </button>
      </div>
    </div>

    <!-- Golden Strip at Bottom -->
    <div class="bg-yellow-600 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-sm">
          {{ languageStore.t('copyright', { year: new Date().getFullYear() }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Phone, Mail, MapPin } from 'lucide-vue-next'
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

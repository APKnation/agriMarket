<template>
  <footer class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-t border-slate-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Logo and Description -->
        <div class="col-span-1 sm:col-span-2 lg:col-span-1">
          <div class="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-4 mb-8">
            <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-0 shadow-2xl transform transition-transform hover:scale-110 hover:rotate-6">
              <span class="text-white font-bold text-2xl sm:text-3xl">🌾</span>
            </div>
            <div class="text-center sm:text-left">
              <h3 class="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent mb-2">SFMP Tanzania</h3>
              <p class="text-sm text-slate-400 font-medium">{{ languageStore.t('programSFMP') }}</p>
            </div>
          </div>
          <p class="text-slate-300 text-base leading-relaxed mb-8">
            {{ languageStore.t('connectingFarmers') }}
          </p>
          
          <!-- Social Media Icons -->
          <div class="flex justify-center sm:justify-start space-x-4">
            <a href="#" class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg">
              <span class="text-lg">𝕏</span>
            </a>
            <a href="#" class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg">
              <span class="text-lg">in</span>
            </a>
            <a href="#" class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg">
              <span class="text-lg">📷</span>
            </a>
            <a href="#" class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-lg">
              <span class="text-lg">f</span>
            </a>
          </div>
        </div>

        <!-- Site Map -->
        <div class="col-span-1">
          <h4 class="text-lg font-bold mb-6 text-center sm:text-left bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">{{ languageStore.t('siteMap') }}</h4>
          <ul class="space-y-3 text-base text-center sm:text-left">
            <li><router-link to="/" class="text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 block">{{ languageStore.t('homepage') }}</router-link></li>
            <li><router-link to="/crops" class="text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 block">{{ languageStore.t('technology') }}</router-link></li>
            <li><router-link to="/about" class="text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 block">{{ languageStore.t('aboutUs') }}</router-link></li>
            <li><router-link to="/products" class="text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 block">{{ languageStore.t('resourcesNews') }}</router-link></li>
            <li><router-link to="/careers" class="text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 block">{{ languageStore.t('careers') }}</router-link></li>
            <li><router-link to="/contact" class="text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 block">{{ languageStore.t('contactUs') }}</router-link></li>
            <li><router-link to="/portal" class="text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 block">{{ languageStore.t('portal') }}</router-link></li>
          </ul>
        </div>

        <!-- Get in Touch -->
        <div class="col-span-1">
          <h4 class="text-lg font-bold mb-6 text-center sm:text-left bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">{{ languageStore.t('getInTouch') }}</h4>
          <div class="space-y-4 text-base">
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-3 p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-300">
              <Phone class="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span class="text-slate-300">+255 22 211 0000</span>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-3 p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-300">
              <Mail class="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span class="text-slate-300">info@sfmp.tz</span>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-3 p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-300">
              <MapPin class="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span class="text-slate-300">Dodoma, Tanzania</span>
            </div>
          </div>
          
          <!-- Newsletter Signup -->
          <div class="mt-6">
            <p class="text-base text-slate-300 mb-3 text-center sm:text-left">{{ languageStore.t('subscribeNewsletter') }}</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                :placeholder="languageStore.t('enterEmail')"
                class="flex-1 px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 w-full sm:w-auto"
              />
              <button class="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 w-full sm:w-auto font-medium">
                {{ languageStore.t('subscribe') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Legal -->
        <div class="col-span-1">
          <h4 class="text-lg font-bold mb-6 text-center sm:text-left bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">{{ languageStore.t('legal') }}</h4>
          <ul class="space-y-3 text-base text-center sm:text-left">
            <li><router-link to="/privacy" class="text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 block">{{ languageStore.t('privacyPolicy') }}</router-link></li>
            <li><router-link to="/terms" class="text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 block">{{ languageStore.t('termsOfServices') }}</router-link></li>
            <li><router-link to="/concerns" class="text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1 block">{{ languageStore.t('farmersConcerns') }}</router-link></li>
          </ul>
        </div>
      </div>

      <!-- Back to Top Button -->
      <div class="mt-12 text-center">
        <button
          @click="scrollToTop"
          class="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 w-full sm:w-auto font-medium"
        >
          {{ languageStore.t('backToTop') }}
        </button>
      </div>
    </div>

    <!-- Bottom Strip -->
    <div class="bg-gradient-to-r from-emerald-600 to-green-600 py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-base font-medium">
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

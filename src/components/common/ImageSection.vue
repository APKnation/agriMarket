<template>
  <section class="relative w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50/70">
    <!-- Subtle background overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-transparent to-green-50/40 pointer-events-none"></div>

    <div class="relative z-10 w-full">
      <!-- Header – responsive text sizing -->
      <div class="text-center mb-8 md:mb-16 px-4 sm:px-6 lg:px-12 pt-10 md:pt-16">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {{ title }}
        </h2>
        <p class="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed px-2 sm:px-0">
          {{ description }}
        </p>
      </div>

      <!-- Carousel container -->
      <div class="relative w-full overflow-hidden shadow-2xl">
        <div class="relative w-full overflow-hidden" :style="{ height: slideHeight }">
          <div
            class="flex h-full w-full transition-transform duration-700 ease-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="min-w-full h-full flex flex-col md:flex-row"
            >
              <!-- Image area -->
              <div class="relative w-full md:w-[70%] h-[45vh] md:h-full min-h-[280px] overflow-hidden group">
                <img
                  :src="slide.image || defaultImages[index] || imageSrc"
                  :alt="slide.alt || 'Tanzania agriculture'"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 md:group-hover:scale-[1.03]"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 md:from-black/15 md:via-transparent md:to-black/5 pointer-events-none"></div>
              </div>

              <!-- Content area -->
              <div class="relative w-full md:w-[30%] min-h-[45vh] md:min-h-0 bg-gradient-to-t md:bg-gradient-to-l from-emerald-950/90 via-green-950/90 to-emerald-950/85 md:from-emerald-950/95 md:via-green-950/92 md:to-emerald-950/88 flex flex-col">
                <!-- Main message – centered on mobile, top-aligned on desktop -->
                <div class="flex-1 flex flex-col items-center justify-center text-white px-5 sm:px-8 md:px-6 lg:px-10 xl:px-12 py-8 md:py-0 text-center md:text-center">
                  <!-- Flag only on last slide -->
                  <div
                    v-if="index === totalSlides - 1"
                    class="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] font-black mb-5 md:mb-6 drop-shadow-2xl animate-pulse"
                  >
                    🇹🇿
                  </div>

                  <h3 class="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight drop-shadow-2xl mb-3 md:mb-4">
                    {{ slide.headline }}
                  </h3>

                  <p class="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-semibold opacity-95 drop-shadow-lg px-2 sm:px-0">
                    {{ slide.subtitle }}
                  </p>
                </div>

                <!-- Bottom overlay content -->
                <div class="px-5 sm:px-8 md:px-6 lg:px-10 xl:px-12 pb-8 md:pb-10 lg:pb-12 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div class="text-center">
                    <h4 class="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg mb-3 md:mb-4">
                      {{ slide.overlayTitle }}
                    </h4>

                    <p class="text-sm sm:text-base md:text-base lg:text-lg xl:text-xl text-white/90 mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed">
                      {{ slide.overlayDescription }}
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-4 lg:gap-6 justify-center items-center">
                      <router-link
                        :to="slide.primaryLink || primaryButtonLink"
                        class="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl md:rounded-2xl font-bold text-base sm:text-lg md:text-lg lg:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl min-w-[180px] sm:min-w-[200px] md:min-w-[220px]"
                      >
                        {{ slide.primaryText || primaryButtonText }}
                        <ArrowRight class="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 transition-transform group-hover:translate-x-2" />
                      </router-link>

                      <router-link
                        :to="slide.secondaryLink || secondaryButtonLink"
                        class="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/50 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl md:rounded-2xl font-bold text-base sm:text-lg md:text-lg lg:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl min-w-[180px] sm:min-w-[200px] md:min-w-[220px]"
                      >
                        {{ slide.secondaryText || secondaryButtonText }}
                        <Info class="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 transition-transform group-hover:rotate-12" />
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation – bigger on desktop, still usable on mobile -->
          <button
            @click="previousSlide"
            :disabled="currentSlide === 0"
            class="absolute left-3 sm:left-5 md:left-8 lg:left-10 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 border border-white/30 disabled:opacity-40 z-20 shadow-lg"
          >
            <svg class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            @click="nextSlide"
            :disabled="currentSlide === totalSlides - 1"
            class="absolute right-3 sm:right-5 md:right-8 lg:right-10 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 border border-white/30 disabled:opacity-40 z-20 shadow-lg"
          >
            <svg class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Indicators – larger spacing on bigger screens -->
          <div class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 sm:space-x-4 z-20">
            <button
              v-for="(_, i) in totalSlides"
              :key="i"
              @click="goToSlide(i)"
              class="w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 shadow-md"
              :class="{
                'bg-emerald-400 scale-125 ring-2 ring-emerald-300 ring-offset-2': currentSlide === i,
                'bg-white/70 hover:bg-white': currentSlide !== i
              }"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ArrowRight, Info } from 'lucide-vue-next'

const props = defineProps({
  title: { type: String, default: 'Growing Together, Harvesting Success' },
  description: { type: String, default: 'Join thousands of Tanzanian farmers transforming agriculture with modern digital tools' },
  imageSrc: { type: String, default: '/images/heroes/a.jpeg' },
  primaryButtonText: { type: String, default: 'Join Now' },
  primaryButtonLink: { type: String, default: '/register' },
  secondaryButtonText: { type: String, default: 'Learn More' },
  secondaryButtonLink: { type: String, default: '/about' }
})

const currentSlide = ref(0)
const totalSlides = 6

// Responsive height calculation
const slideHeight = computed(() => {
  if (window.innerWidth < 768) return 'auto'           // mobile → natural height
  if (window.innerWidth < 1024) return '750px'        // tablet
  if (window.innerWidth < 1280) return '800px'        // small desktop
  return '900px'                                      // large desktop
})

const defaultImages = [
  '/images/heroes/a.jpeg',
  '/images/heroes/f.jpeg',
  '/images/heroes/cropmanage.jpg',
  '/images/heroes/market1.jpg',
  '/images/heroes/g.jpeg',
  '/images/heroes/a.jpeg'
]

const slides = ref([
  {
    headline: 'EMPOWERING FARMERS',
    subtitle: 'Modern tools for better farming in Tanzania',
    overlayTitle: 'Technology in Your Hands',
    overlayDescription: 'Access weather forecasts, pest alerts, soil advice and expert tips directly from your phone — no matter where your farm is located.'
  },
  {
    headline: 'DIRECT MARKET CONNECTIONS',
    subtitle: 'Sell directly to buyers – higher profits',
    overlayTitle: 'Eliminate Middlemen',
    overlayDescription: 'Connect straight with buyers, cooperatives, exporters and processors. Get better prices and faster payments with full transparency.'
  },
  {
    headline: 'INTELLIGENT FARM MANAGEMENT',
    subtitle: 'Data-driven decisions for higher yields',
    overlayTitle: 'Grow Smarter Every Season',
    overlayDescription: 'Track your crops, record inputs & harvests, compare performance across seasons and receive personalized recommendations to increase productivity.'
  },
  {
    headline: 'TRANSPARENT & FAIR PRICING',
    subtitle: 'Clear market prices – no hidden fees',
    overlayTitle: 'Real-Time Market Intelligence',
    overlayDescription: 'See daily & weekly prices from multiple markets across Tanzania. Make informed selling decisions and never accept below-value offers again.'
  },
  {
    headline: 'JOIN THE AGRICULTURE REVOLUTION',
    subtitle: 'Already helping over 10,000 Tanzanian farmers',
    overlayTitle: 'Thousands Are Already Winning',
    overlayDescription: 'Smallholders, youth farmers, women groups and cooperatives are increasing income, reducing losses and building better futures together on our platform.'
  },
  {
    headline: 'MADE FOR TANZANIA',
    subtitle: 'Local needs • Global standards • Real impact',
    overlayTitle: 'Proudly Tanzanian',
    overlayDescription: 'Designed specifically for our soils, crops, weather patterns and markets — combining local knowledge with world-class technology to strengthen Tanzanian agriculture.'
  }
])

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? totalSlides - 1 : currentSlide.value - 1
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides
}

const goToSlide = (index) => {
  currentSlide.value = index
}

let interval = null
const startAutoPlay = () => { interval = setInterval(nextSlide, 6500) }
const stopAutoPlay = () => { if (interval) clearInterval(interval) }

onMounted(() => {
  startAutoPlay()
  window.addEventListener('resize', () => {}) // force re-compute if needed
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
/* You can add more responsive utilities here if needed */
@media (max-width: 640px) {
  .min-h-[280px] {
    min-height: 220px;
  }
}
</style>
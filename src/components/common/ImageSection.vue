<template>
  <section class="relative w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50/70 font-inter">
    <!-- Subtle background overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/70 via-transparent to-green-50/40 pointer-events-none"></div>

    <div class="relative z-10 w-full">
      <!-- Header – responsive text sizing -->
      <div class="text-center mb-6 md:mb-12 px-4 sm:px-6 lg:px-12 pt-8 md:pt-12">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          {{ title }}
        </h2>
        <p class="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed px-2 sm:px-0">
          {{ description }}
        </p>
      </div>

      <!-- Carousel container -->
      <div class="relative w-full overflow-hidden shadow-2xl">
        <div class="relative w-full overflow-hidden">
          <div
            class="flex h-full w-full transition-transform duration-700 ease-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="min-w-full h-full"
            >
              <!-- Mobile Layout: Single stacked card -->
              <div class="sm:hidden flex flex-col h-[70vh] max-h-[600px] bg-gradient-to-b from-emerald-900 via-green-900 to-emerald-950">
                <!-- Image on top - takes 35% height -->
                <div class="relative h-[35%] w-full overflow-hidden">
                  <img
                    :src="slide.image || defaultImages[index] || imageSrc"
                    :alt="slide.alt || 'Tanzania agriculture'"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/90"></div>
                </div>

                <!-- Content below - takes 65% height -->
                <div class="flex-1 flex flex-col justify-between p-3 text-white overflow-y-auto">
                  <!-- Main content -->
                  <div class="text-center">
                    <!-- Flag only on last slide -->
                    <div
                      v-if="index === totalSlides - 1"
                      class="text-4xl font-black mb-1 drop-shadow-2xl"
                    >
                      <span class="text-xl font-bold">TZ</span>
                    </div>

                    <h3 class="text-xl font-extrabold leading-tight tracking-tight drop-shadow-lg mb-1">
                      {{ slide.headline }}
                    </h3>

                    <p class="text-base font-semibold opacity-90 drop-shadow-md leading-relaxed">
                      {{ slide.subtitle }}
                    </p>
                  </div>

                  <!-- Bottom content -->
                  <div class="mt-2 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                    <h4 class="text-base font-bold text-white drop-shadow-md mb-1">
                      {{ slide.overlayTitle }}
                    </h4>

                    <p class="text-xs text-white/90 mb-2 leading-relaxed">
                      {{ slide.overlayDescription }}
                    </p>

                    <div class="inline-flex items-center justify-center bg-emerald-500/20 rounded-full px-3 py-1.5 border border-emerald-400/30">
                      <span class="text-white text-xs font-medium">
                        {{ slide.inspiration || 'Transforming Agriculture Together' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Desktop Layout: Side by side (md and up) -->
              <div class="hidden sm:flex h-[500px] md:h-[600px] lg:h-[700px]">
                <!-- Image area -->
                <div class="relative w-[70%] h-full overflow-hidden group">
                  <img
                    :src="slide.image || defaultImages[index] || imageSrc"
                    :alt="slide.alt || 'Tanzania agriculture'"
                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5 pointer-events-none"></div>
                </div>

                <!-- Content area -->
                <div class="relative w-[30%] h-full bg-gradient-to-l from-emerald-950/95 via-green-950/92 to-emerald-950/88 flex flex-col">
                  <!-- Main message -->
                  <div class="flex-1 flex flex-col items-center justify-center text-white px-6 lg:px-10 text-center">
                    <!-- Flag only on last slide -->
                    <div
                      v-if="index === totalSlides - 1"
                      class="text-8xl md:text-9xl lg:text-[10rem] font-black mb-6 drop-shadow-2xl animate-pulse"
                    >
                      <span class="text-5xl md:text-6xl lg:text-7xl font-bold">TZ</span>
                    </div>

                    <h3 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-2xl mb-4 hover:scale-105 transition-transform duration-300">
                      {{ slide.headline }}
                    </h3>

                    <p class="text-xl md:text-2xl lg:text-3xl font-semibold opacity-95 drop-shadow-lg leading-relaxed hover:opacity-100 transition-opacity duration-500">
                      {{ slide.subtitle }}
                    </p>
                  </div>

                  <!-- Bottom overlay content -->
                  <div class="px-6 lg:px-10 pb-10 lg:pb-12 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <div class="text-center">
                      <h4 class="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-4 tracking-tight">
                        {{ slide.overlayTitle }}
                      </h4>

                      <p class="text-base md:text-lg text-white/90 mb-6 max-w-xl mx-auto leading-relaxed">
                        {{ slide.overlayDescription }}
                      </p>

                      <div class="inline-flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                        <span class="text-white font-medium tracking-wide">
                          {{ slide.inspiration || 'Transforming Agriculture Together' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation buttons - positioned for both mobile and desktop -->
          <button
            @click="previousSlide"
            :disabled="currentSlide === 0"
            class="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/70 hover:scale-110 transition-all duration-300 border border-white/30 disabled:opacity-40 z-20 shadow-lg"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            @click="nextSlide"
            :disabled="currentSlide === totalSlides - 1"
            class="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/70 hover:scale-110 transition-all duration-300 border border-white/30 disabled:opacity-40 z-20 shadow-lg"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Indicators -->
          <div class="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-3 z-20">
            <button
              v-for="(_, i) in totalSlides"
              :key="i"
              @click="goToSlide(i)"
              class="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 shadow-md"
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
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Growing Together, Harvesting Success' },
  description: { type: String, default: 'Join thousands of Tanzanian farmers transforming agriculture with modern digital tools' },
  imageSrc: { type: String, default: '/images/heroes/a.jpeg' }
})

const currentSlide = ref(0)
const totalSlides = 6

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

onMounted(() => { startAutoPlay() })
onUnmounted(() => { stopAutoPlay() })
</script>

<style scoped>
/* Mobile-specific adjustments */
@media (max-width: 640px) {
  /* Ensure slide takes full viewport height without causing page scroll */
  .min-w-full {
    height: 70vh;
    max-height: 600px;
  }
  
  /* Smooth scrolling for content if needed, but ideally content fits */
  .overflow-y-auto {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
  }
  
  .overflow-y-auto::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
}

/* Touch-friendly improvements */
button {
  touch-action: manipulation;
}

/* Prevent text selection on swipe */
.carousel-container {
  user-select: none;
  -webkit-user-select: none;
}
</style>
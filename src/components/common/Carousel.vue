<template>
  <div class="relative overflow-hidden">
    <!-- Carousel Container -->
    <div class="relative h-96 md:h-[500px]">
      <!-- Slides -->
      <div 
        class="flex transition-transform duration-500 ease-in-out h-full"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="w-full flex-shrink-0"
        >
          <div class="h-full relative overflow-hidden">
          <!-- Moving Background Image -->
          <div 
            class="absolute inset-0 bg-cover bg-center"
            :style="{
              backgroundImage: `url('${slide.backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: 'slideBackground 20s linear infinite'
            }"
          ></div>
          
          <!-- Overlay for text readability -->
          <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          
          <!-- Content -->
          <div class="relative z-10 h-full flex items-center justify-center text-white">
            <div class="text-center px-6 max-w-4xl mx-auto">
              <!-- Icon -->
              <div class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <component :is="slide.icon" class="w-10 h-10" />
              </div>
              
              <!-- Title -->
              <h2 class="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                {{ slide.title }}
              </h2>
              
              <!-- Description -->
              <p class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                {{ slide.description }}
              </p>
              
              <!-- CTA Button -->
              <router-link
                :to="slide.ctaLink"
                class="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all transform hover:scale-105 animate-fade-in-up animation-delay-400"
              >
                {{ slide.ctaText }}
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      <!-- Navigation Dots -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-colors"
          :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
      
      <!-- Navigation Arrows -->
      <button
        @click="previousSlide"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        @click="nextSlide"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { 
  Users, 
  Sprout, 
  ShoppingCart, 
  TrendingUp, 
  Globe,
  Award 
} from 'lucide-vue-next'

const languageStore = useLanguageStore()
const currentSlide = ref(0)
const autoplayInterval = ref(null)

const slides = ref([
  {
    title: languageStore.t('carouselTitle1'),
    description: languageStore.t('carouselDesc1'),
    ctaText: languageStore.t('getStarted'),
    ctaLink: '/register',
    icon: Users,
    backgroundImage: '/images/heroes/market.jpg'
  },
  {
    title: languageStore.t('carouselTitle2'),
    description: languageStore.t('carouselDesc2'),
    ctaText: languageStore.t('learnMore'),
    ctaLink: '/crops',
    icon: Sprout,
    backgroundImage: '/images/heroes/cropmanage.jpg'
  },
  {
    title: languageStore.t('carouselTitle3'),
    description: languageStore.t('carouselDesc3'),
    ctaText: languageStore.t('exploreMarket'),
    ctaLink: '/products',
    icon: ShoppingCart,
    backgroundImage: '/images/heroes/market1.jpg'
  },
  {
    title: languageStore.t('carouselTitle4'),
    description: languageStore.t('carouselDesc4'),
    ctaText: languageStore.t('viewDashboard'),
    ctaLink: '/dashboard',
    icon: TrendingUp,
    backgroundImage: '/images/heroes/market.jpg'
  }
])

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoplay()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
  resetAutoplay()
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
  resetAutoplay()
}

const startAutoplay = () => {
  autoplayInterval.value = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = null
  }
}

const resetAutoplay = () => {
  stopAutoplay()
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
/* Background slide animation */
@keyframes slideBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Fade in up animation */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation utilities */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

/* Button hover effects */
.transform\:hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Background image animation */
.bg-cover.bg-center {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

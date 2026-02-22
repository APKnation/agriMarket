<template>
  <div class="min-h-screen relative">
    <!-- Background Image -->
    <div class="fixed inset-0 z-0">
      <div
        class="w-full h-full bg-gradient-to-br from-primary-900/80 to-earth-900/80"
      ></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10">
      <!-- Dynamic Carousel Hero Section -->
      <section class="relative min-h-[650px] overflow-hidden">
        <!-- Background -->
        <div class="absolute inset-0">
          <!-- Only show background on desktop/tablet -->
          <div
            v-if="!isMobile"
            class="absolute inset-0 bg-cover bg-center"
            style="background-image: url('/images/heroes/cropmanage.jpg');"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent md:from-black/85 md:via-black/60"
          ></div>
        </div>
        
        <!-- Content -->
        <div class="relative z-20 max-w-7xl mx-auto px-0 py-0">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-1 items-center">
            <!-- LEFT SIDE - Hero words with background image on mobile -->
            <div
              class="text-center lg:text-left relative rounded-2xl overflow-hidden p-8 sm:p-12"
              :class="{ 'mobile-bg': isMobile, 'bg-transparent': !isMobile }"
              :style="
                isMobile
                  ? 'background-image: url(\'/images/heroes/cropmanage.jpg\'); background-size: cover; background-position: center;'
                  : ''
              "
            >
              <!-- Mobile overlay for text readability -->
              <div v-if="isMobile" class="absolute inset-0 bg-black/60"></div>

              <!-- Text content with relative positioning for mobile -->
              <div :class="{ 'relative z-10': isMobile }">
                <h1
                  class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-2 sm:mb-2"
                >
                  {{ languageStore.t("sustainableFarm") }}
                </h1>
                <p
                  class="text-lg sm:text-xl text-white/80 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0"
                >
                  {{ languageStore.t("connectingFarmers") }}
                </p>
                <div
                  class="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start mb-6 sm:mb-8"
                >
                  <router-link
                    to="/register"
                    class="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition duration-300 hover:scale-105 shadow-lg text-center"
                  >
                    {{ languageStore.t("getStarted") }}
                  </router-link>
                  <router-link
                    to="/login"
                    class="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition duration-300 hover:scale-105 text-center"
                  >
                    {{ languageStore.t("signIn") }}
                  </router-link>
                </div>
              </div>
            </div>

            <!-- RIGHT SIDE - Success Stories Cards -->
            <div class="hidden lg:block">
              <!-- Success Stories Grid -->
              <div class="grid grid-cols-1 gap-6">
                <!-- Maria K. Card -->
                <div class="group relative">
                  <div
                    class="relative w-full h-64 transform-style-preserve-3d transition-all duration-700 ease-out"
                  >
                    <!-- Card Front -->
                    <div
                      class="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl shadow-2xl hover:shadow-3xl border-2 border-emerald-200/50 overflow-hidden transform rotate-y-0 group-hover:rotate-y-180 transition-transform duration-700 preserve-3d"
                    >
                      <div class="relative w-full h-full overflow-hidden rounded-3xl">
                        <img
                          src="/images/heroes/tomato-farmer.jpg"
                          alt="Maria K. - Tomato Farmer Success Story"
                          class="w-full h-full object-cover hover:scale-110 transition-transform duration-700 filter brightness-110 contrast-105"
                        />
                        <div
                          class="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-emerald-900/30 to-transparent"
                        ></div>
                        <div class="absolute bottom-0 left-0 right-0 p-6">
                          <div
                            class="bg-gradient-to-r from-emerald-500 to-green-500 backdrop-blur-xl inline-block px-4 py-2 rounded-full text-white font-bold text-sm shadow-xl mb-4"
                          >
                            🌟 SUCCESS STORY
                          </div>
                          <h3 class="text-2xl font-bold text-white mb-2 drop-shadow-2xl">
                            Maria K.
                          </h3>
                          <p class="text-emerald-100 text-sm">Smallholder Farmer</p>
                        </div>
                      </div>
                    </div>

                    <!-- Card Back -->
                    <div
                      class="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 rounded-3xl shadow-2xl border-2 border-emerald-400/50 overflow-hidden transform rotate-y-180 backface-hidden"
                    >
                      <div
                        class="p-6 text-white h-full flex flex-col justify-between"
                      >
                        <div>
                          <h3
                            class="text-xl font-bold mb-3 bg-gradient-to-r from-emerald-100 to-green-100 bg-clip-text text-transparent"
                          >
                            Maria K. - Smallholder Farmer
                          </h3>
                          <p class="text-emerald-50 mb-4 leading-relaxed text-sm">
                            "I joined SFMP last year and my tomato harvest increased by 40%. I found buyers who pay much better prices than the local market."
                          </p>
                          <div class="flex flex-wrap gap-2 mb-4">
                            <span
                              class="bg-emerald-400/30 backdrop-blur-sm text-emerald-100 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/50"
                              >✓ 40% better harvest</span
                            >
                            <span
                              class="bg-green-400/30 backdrop-blur-sm text-green-100 px-3 py-1 rounded-full text-xs font-bold border border-green-400/50"
                              >✓ 25% higher prices</span
                            >
                          </div>
                        </div>
                        <div class="flex justify-center">
                          <router-link
                            to="/success-stories/maria"
                            class="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/50 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 text-sm"
                          >
                            Read Full Story
                            <ArrowRight
                              class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                            />
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Joseph M. Card -->
                <div class="group relative">
                  <div
                    class="relative w-full h-64 transform-style-preserve-3d transition-all duration-700 ease-out"
                  >
                    <!-- Card Front -->
                    <div
                      class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl shadow-2xl hover:shadow-3xl border-2 border-blue-200/50 overflow-hidden transform rotate-y-0 group-hover:rotate-y-180 transition-transform duration-700 preserve-3d"
                    >
                      <div class="relative w-full h-full overflow-hidden rounded-3xl">
                        <img
                          src="/images/heroes/farmers-group.jpg"
                          alt="Joseph M. - Cooperative Leader Success Story"
                          class="w-full h-full object-cover hover:scale-110 transition-transform duration-700 filter brightness-110 contrast-105"
                        />
                        <div
                          class="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/30 to-transparent"
                        ></div>
                        <div class="absolute bottom-0 left-0 right-0 p-6">
                          <div
                            class="bg-gradient-to-r from-blue-500 to-indigo-500 backdrop-blur-xl inline-block px-4 py-2 rounded-full text-white font-bold text-sm shadow-xl mb-4"
                          >
                            🌟 SUCCESS STORY
                          </div>
                          <h3 class="text-2xl font-bold text-white mb-2 drop-shadow-2xl">
                            Joseph M.
                          </h3>
                          <p class="text-blue-100 text-sm">Cooperative Leader</p>
                        </div>
                      </div>
                    </div>

                    <!-- Card Back -->
                    <div
                      class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl border-2 border-blue-400/50 overflow-hidden transform rotate-y-180 backface-hidden"
                    >
                      <div
                        class="p-6 text-white h-full flex flex-col justify-between"
                      >
                        <div>
                          <h3
                            class="text-xl font-bold mb-3 bg-gradient-to-r from-blue-100 to-indigo-100 bg-clip-text text-transparent"
                          >
                            Joseph M. - Cooperative Leader
                          </h3>
                          <p class="text-blue-50 mb-4 leading-relaxed text-sm">
                            "Our cooperative has 50 farmers. With SFMP, we sell together and reduced waste by 60%."
                          </p>
                          <div class="flex flex-wrap gap-2 mb-4">
                            <span
                              class="bg-blue-400/30 backdrop-blur-sm text-blue-100 px-3 py-1 rounded-full text-xs font-bold border border-blue-400/50"
                              >✓ 50 farmers helped</span
                            >
                            <span
                              class="bg-indigo-400/30 backdrop-blur-sm text-indigo-100 px-3 py-1 rounded-full text-xs font-bold border border-indigo-400/50"
                              >✓ 60% less waste</span
                            >
                          </div>
                        </div>
                        <div class="flex justify-center">
                          <router-link
                            to="/success-stories/joseph"
                            class="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/50 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 text-sm"
                          >
                            Read Full Story
                            <ArrowRight
                              class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                            />
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Aisha R. Card -->
                <div class="group relative">
                  <div
                    class="relative w-full h-64 transform-style-preserve-3d transition-all duration-700 ease-out"
                  >
                    <!-- Card Front -->
                    <div
                      class="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-3xl shadow-2xl hover:shadow-3xl border-2 border-orange-200/50 overflow-hidden transform rotate-y-0 group-hover:rotate-y-180 transition-transform duration-700 preserve-3d"
                    >
                      <div class="relative w-full h-full overflow-hidden rounded-3xl">
                        <img
                          src="/images/heroes/youth-farmer.jpg"
                          alt="Aisha R. - Youth Farmer Success Story"
                          class="w-full h-full object-cover hover:scale-110 transition-transform duration-700 filter brightness-110 contrast-105"
                        />
                        <div
                          class="absolute inset-0 bg-gradient-to-t from-orange-900/60 via-orange-900/30 to-transparent"
                        ></div>
                        <div class="absolute bottom-0 left-0 right-0 p-6">
                          <div
                            class="bg-gradient-to-r from-orange-500 to-amber-500 backdrop-blur-xl inline-block px-4 py-2 rounded-full text-white font-bold text-sm shadow-xl mb-4"
                          >
                            🌟 SUCCESS STORY
                          </div>
                          <h3 class="text-2xl font-bold text-white mb-2 drop-shadow-2xl">
                            Aisha R.
                          </h3>
                          <p class="text-orange-100 text-sm">Youth Farmer</p>
                        </div>
                      </div>
                    </div>

                    <!-- Card Back -->
                    <div
                      class="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 rounded-3xl shadow-2xl border-2 border-orange-400/50 overflow-hidden transform rotate-y-180 backface-hidden"
                    >
                      <div
                        class="p-6 text-white h-full flex flex-col justify-between"
                      >
                        <div>
                          <h3
                            class="text-xl font-bold mb-3 bg-gradient-to-r from-orange-100 to-amber-100 bg-clip-text text-transparent"
                          >
                            Aisha R. - Youth Farmer
                          </h3>
                          <p class="text-orange-50 mb-4 leading-relaxed text-sm">
                            "I'm young and SFMP taught me new ways to farm. Now I help other young people in my village."
                          </p>
                          <div class="flex flex-wrap gap-2 mb-4">
                            <span
                              class="bg-orange-400/30 backdrop-blur-sm text-orange-100 px-3 py-1 rounded-full text-xs font-bold border border-orange-400/50"
                              >✓ Youth leader</span
                            >
                            <span
                              class="bg-amber-400/30 backdrop-blur-sm text-amber-100 px-3 py-1 rounded-full text-xs font-bold border border-amber-400/50"
                              >✓ New methods</span
                            >
                          </div>
                        </div>
                        <div class="flex justify-center">
                          <router-link
                            to="/success-stories/aisha"
                            class="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/50 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 text-sm"
                          >
                            Read Full Story
                            <ArrowRight
                              class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                            />
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Carousel -->
            <div class="lg:hidden relative h-[500px] sm:h-[550px] overflow-visible">
              <div class="relative h-full">
                <!-- Carousel Container -->
                <div
                  class="flex transition-transform duration-500 ease-in-out h-full"
                  :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                  <!-- Mobile Success Story Cards -->
                  <div
                    v-for="(story, index) in mobileStories"
                    :key="index"
                    class="min-w-full h-full flex items-center justify-center px-1 sm:px-2"
                  >
                    <div
                      class="relative w-full max-w-xl sm:max-w-sm h-64 sm:h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20"
                    >
                      <img
                        :src="story.image"
                        :alt="story.alt"
                        class="w-full h-full object-cover"
                      />
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                      ></div>
                      <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div
                          class="bg-gradient-to-r from-emerald-500/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block mb-3 text-xs font-semibold text-emerald-300"
                        >
                          🌟 SUCCESS STORY
                        </div>
                        <h3 class="text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg">
                          {{ story.name }}
                        </h3>
                        <p class="text-sm sm:text-base opacity-90 font-medium">
                          {{ story.role }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Carousel Controls -->
              <button
                @click="previousSlide"
                class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/20 z-10"
              >
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>

              <button
                @click="nextSlide"
                class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/20 z-10"
              >
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>

              <!-- Carousel Indicators -->
              <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 sm:space-x-4">
                <button
                  v-for="(_, index) in 3"
                  :key="index"
                  @click="goToSlide(index)"
                  class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 shadow-lg"
                  :class="currentSlide === index ? 'bg-emerald-500 w-6 sm:w-8' : 'bg-white/50 hover:bg-white/80'"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="py-20 bg-accent-600/90 backdrop-blur-sm">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Farming Journey?
          </h2>
          <p class="text-xl text-accent-100 mb-8">
            Join thousands of Tanzanian farmers who are already benefiting from SFMP's digital platform.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/register"
              class="btn-primary bg-white text-accent-600 hover:bg-accent-50 px-8 py-3 text-lg"
            >
              Get Started Today
            </router-link>
            <router-link
              to="/contact"
              class="btn-secondary bg-accent-700 text-white hover:bg-accent-800 px-8 py-3 text-lg border-accent-500"
            >
              Contact Us
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { UserPlus, Sprout, ShoppingCart, ArrowRight } from "lucide-vue-next";
import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();

// Mobile detection
const isMobile = ref(false);
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// Carousel functionality for mobile
const currentSlide = ref(0);
const totalSlides = 3;
let autoPlayInterval = null;

// Mobile stories data
const mobileStories = ref([
  {
    name: "Maria K.",
    role: "Smallholder Farmer",
    image: "/images/heroes/tomato-farmer.jpg",
    alt: "Maria K. - Tomato Farmer Success Story"
  },
  {
    name: "Joseph M.",
    role: "Cooperative Leader",
    image: "/images/heroes/farmers-group.jpg",
    alt: "Joseph M. - Cooperative Leader Success Story"
  },
  {
    name: "Aisha R.",
    role: "Youth Farmer",
    image: "/images/heroes/youth-farmer.jpg",
    alt: "Aisha R. - Youth Farmer Success Story"
  }
]);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides;
};

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? totalSlides - 1 : currentSlide.value - 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  startAutoPlay();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  stopAutoPlay();
});
</script>

<style scoped>
/* Netflix-style Animations */
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

/* 3D Transform Classes */
.preserve-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

/* 3D Rotation Classes */
.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Animation utilities */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Netflix-style hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Button hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Backdrop blur effects */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.backdrop-blur-md {
  backdrop-filter: blur(8px);
}

/* Netflix-style gradient overlay */
.bg-gradient-to-t {
  background-image: linear-gradient(to top, var(--tw-gradient-stops));
}

/* Feature pills hover */
.bg-white\/10:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Scroll indicator animation */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translateY(0);
  }
  40%,
  43% {
    transform: translateY(-10px);
  }
  70% {
    transform: translateY(-5px);
  }
  90% {
    transform: translateY(-2px);
  }
}

/* Netflix-style text effects */
.text-white\/90 {
  color: rgba(255, 255, 255, 0.9);
}

.text-white\/80 {
  color: rgba(255, 255, 255, 0.8);
}

/* 3D Hover Effects */
.hover\:rotate-y-180:hover {
  transform: rotateY(180deg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }

  .text-7xl {
    font-size: 3.5rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }
}

/* Performance optimizations */
* {
  transition: all 0.3s ease;
}

/* 3D Performance */
.preserve-3d,
.transform-style-preserve-3d {
  will-change: transform;
  backface-visibility: hidden;
}

/* Netflix-style button focus states */
.focus\:outline-none:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.5);
}

/* Enhanced 3D Shadows */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>

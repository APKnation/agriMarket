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
            style="
              background-image: url(&quot;/images/heroes/cropmanage.jpg&quot;);
            "
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

            <!-- RIGHT SIDE - Original structure preserved, but images only (no overlay text) -->

            <!-- Mobile: Enhanced Single Card Carousel – images only -->
            <div
              class="lg:hidden relative h-[500px] sm:h-[550px] overflow-visible"
            >
              <div class="relative h-full">
                <div
                  class="flex transition-transform duration-500 ease-in-out h-full"
                  :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                  <!-- Mobile Card 1 -->
                  <div
                    class="min-w-full h-full flex items-center justify-center px-1 sm:px-2"
                  >
                    <div
                      class="relative w-full max-w-xl sm:max-w-sm h-64 sm:h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20"
                    >
                      <img
                        src="/images/heroes/market.jpg"
                        class="w-full h-full object-cover"
                        alt="Farmers Market"
                      />
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                      ></div>
                      <!-- ALL TEXT REMOVED -->
                    </div>
                  </div>

                  <!-- Mobile Card 2 -->
                  <div
                    class="min-w-full h-full flex items-center justify-center px-2 sm:px-4"
                  >
                    <div
                      class="relative w-full max-w-xl sm:max-w-sm h-64 sm:h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20"
                    >
                      <img
                        src="/images/heroes/cropmanage.jpg"
                        class="w-full h-full object-cover"
                        alt="Crop Management"
                      />
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                      ></div>
                      <!-- ALL TEXT REMOVED -->
                    </div>
                  </div>

                  <!-- Mobile Card 3 -->
                  <div
                    class="min-w-full h-full flex items-center justify-center px-2 sm:px-4"
                  >
                    <div
                      class="relative w-full max-w-xl sm:max-w-sm h-64 sm:h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20"
                    >
                      <img
                        src="/images/heroes/market1.jpg"
                        class="w-full h-full object-cover"
                        alt="Marketplace"
                      />
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                      ></div>
                      <!-- ALL TEXT REMOVED -->
                    </div>
                  </div>

                  <!-- Mobile Card 4 -->
                  <div
                    class="min-w-full h-full flex items-center justify-center px-2 sm:px-4"
                  >
                    <div
                      class="relative w-full max-w-xl sm:max-w-sm h-64 sm:h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20"
                    >
                      <img
                        src="/images/heroes/register.png"
                        class="w-full h-full object-cover"
                        alt="Join SFMP"
                      />
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                      ></div>
                      <!-- ALL TEXT REMOVED -->
                    </div>
                  </div>

                  <!-- Mobile Card 5 -->
                  <div
                    class="min-w-full h-full flex items-center justify-center px-2 sm:px-4"
                  >
                    <div
                      class="relative w-full max-w-xl sm:max-w-sm h-64 sm:h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20"
                    >
                      <img
                        src="/images/heroes/cropmanage.jpg"
                        class="w-full h-full object-cover"
                        alt="Tanzania Focus"
                      />
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                      ></div>
                      <!-- ALL TEXT REMOVED -->
                    </div>
                  </div>
                </div>
              </div>

              <!-- Controls (kept exactly as original) -->
              <button
                @click="previousSlide"
                class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/20 z-10"
              >
                <svg
                  class="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>

              <button
                @click="nextSlide"
                class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/20 z-10"
              >
                <svg
                  class="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>

              <!-- Indicators (kept exactly as original) -->
              <div
                class="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 sm:space-x-4"
              >
                <button
                  v-for="(_, index) in 5"
                  :key="index"
                  @click="goToSlide(index)"
                  class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 shadow-lg"
                  :class="
                    currentSlide === index
                      ? 'bg-emerald-500 w-6 sm:w-8'
                      : 'bg-white/50 hover:bg-white/80'
                  "
                ></button>
              </div>
            </div>

            <!-- Tablet: Enhanced 2x2 Grid Layout – images only -->
            <div class="lg:hidden md:block hidden relative h-[600px] p-4">
              <div class="grid grid-cols-2 gap-4 h-full">
                <!-- Top Left -->
                <div
                  class="relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 transform -rotate-2 hover:rotate-0 transition-all duration-300"
                >
                  <img
                    src="/images/heroes/cropmanage.jpg"
                    class="w-full h-48 object-cover"
                    alt="Crop Management"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                  ></div>
                  <!-- Text removed -->
                </div>

                <!-- Top Right -->
                <div
                  class="relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 transform rotate-2 hover:rotate-0 transition-all duration-300"
                >
                  <img
                    src="/images/heroes/market1.jpg"
                    class="w-full h-48 object-cover"
                    alt="Marketplace"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                  ></div>
                  <!-- Text removed -->
                </div>

                <!-- Bottom Main Card -->
                <div
                  class="col-span-2 relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src="/images/heroes/market.jpg"
                    class="w-full h-56 object-cover"
                    alt="Farmers Market"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                  ></div>
                  <!-- Text removed -->
                </div>
              </div>
            </div>

            <!-- Desktop: Original Absolute Positioning Layout – images only -->
            <div class="relative hidden lg:block h-[700px] preserve-3d">
              <!-- TOP LEFT CARD -->
              <div
                class="absolute top-16 left-8 w-64 z-20 transform -rotate-3 hover:rotate-0 hover:rotate-y-180 transition-all duration-700 preserve-3d"
              >
                <div
                  class="rounded-xl overflow-hidden shadow-xl border border-white/10 transform-style-preserve-3d"
                >
                  <div class="relative transform-style-preserve-3d">
                    <img
                      src="/images/heroes/cropmanage.jpg"
                      class="h-80 w-full object-cover backface-hidden"
                    />
                    <!-- Back face removed – keep only front image -->
                  </div>
                </div>
              </div>

              <!-- TOP RIGHT CARD -->
              <div
                class="absolute top-16 right-8 w-64 z-20 transform rotate-3 hover:rotate-0 hover:rotate-x-12 hover:translate-z-10 transition-all duration-700 preserve-3d"
              >
                <div
                  class="rounded-xl overflow-hidden shadow-xl border border-white/10 transform-style-preserve-3d"
                >
                  <div class="relative transform-style-preserve-3d">
                    <img
                      src="/images/heroes/market1.jpg"
                      class="h-80 w-full object-cover"
                    />
                    <!-- Text & back removed -->
                  </div>
                </div>
              </div>

              <!-- CENTER MAIN CARD -->
              <div
                class="absolute top-40 left-1/2 transform -translate-x-1/2 w-80 z-30 transform hover:scale-105 transition-all duration-700 hover:rotate-y-12 hover:rotate-x-6 hover:translate-z-20 preserve-3d"
              >
                <div
                  class="rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform-style-preserve-3d"
                >
                  <div class="relative transform-style-preserve-3d">
                    <img
                      src="/images/heroes/market.jpg"
                      class="w-full h-72 object-cover"
                    />
                    <!-- Text & back removed -->
                  </div>
                </div>
              </div>

              <!-- BOTTOM LEFT SMALL CARD -->
              <div
                class="absolute bottom-32 left-16 w-56 z-10 transform rotate-2 hover:scale-110 hover:rotate-z-6 hover:translate-y-[-20px] transition-all duration-700 preserve-3d"
              >
                <div
                  class="rounded-xl overflow-hidden shadow-lg border border-white/10 transform-style-preserve-3d"
                >
                  <div class="relative transform-style-preserve-3d">
                    <img
                      src="/images/heroes/register.png"
                      class="h-48 w-full object-cover"
                    />
                    <!-- Text removed -->
                  </div>
                </div>
              </div>

              <!-- BOTTOM RIGHT SMALL CARD -->
              <div
                class="absolute bottom-32 right-16 w-56 z-10 transform -rotate-2 hover:rotate-180 hover:scale-110 transition-all duration-700 preserve-3d"
              >
                <div
                  class="rounded-xl overflow-hidden shadow-lg border border-white/10 transform-style-preserve-3d"
                >
                  <div class="relative transform-style-preserve-3d">
                    <img
                      src="/images/heroes/cropmanage.jpg"
                      class="h-48 w-full object-cover backface-hidden"
                    />
                    <!-- Back face removed -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div class="w-6 h-1 bg-white/40 rounded-full"></div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-white/95 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {{ languageStore.t("howItWorks") }}
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ languageStore.t("empoweringFarmers") }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlogCard
              image-src="/images/heroes/market.jpg"
              image-alt="Tanzanian farmer using mobile phone for registration"
              :title="languageStore.t('register')"
              :description="languageStore.t('createAccount')"
              :read-more-text="languageStore.t('learnMore')"
              read-more-link="/register"
            />

            <BlogCard
              image-src="/images/heroes/cropmanage.jpg"
              image-alt="Farmer managing crops with digital tools"
              :title="languageStore.t('manageCrops')"
              :description="languageStore.t('trackPlanting')"
              :read-more-text="languageStore.t('learnMore')"
              read-more-link="/crops"
            />

            <BlogCard
              image-src="/images/heroes/market1.jpg"
              image-alt="Farmers market with fresh produce trading"
              :title="languageStore.t('connectTrade')"
              :description="languageStore.t('marketplaceAccess')"
              :read-more-text="languageStore.t('learnMore')"
              read-more-link="/products"
            />
          </div>
        </div>
      </section>

      <!-- User Roles Section -->
      <section class="py-20 bg-earth-50/90 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              SFMP Tanzania serves different roles in the agricultural ecosystem
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="card p-6 text-center hover:shadow-lg transition-shadow">
              <div
                class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <UserPlus class="w-8 h-8 text-primary-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Farmers</h3>
              <p class="text-gray-600">
                Grow and manage crops with digital tools
              </p>
            </div>

            <div class="card p-6 text-center hover:shadow-lg transition-shadow">
              <div
                class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <ShoppingCart class="w-8 h-8 text-accent-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Buyers</h3>
              <p class="text-gray-600">
                Connect directly with farmers and purchase quality produce
              </p>
            </div>

            <div class="card p-6 text-center hover:shadow-lg transition-shadow">
              <div
                class="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Users class="w-8 h-8 text-earth-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Cooperatives</h3>
              <p class="text-gray-600">
                Manage groups of farmers and aggregate production
              </p>
            </div>

            <div class="card p-6 hover:shadow-lg transition-shadow">
              <div class="text-3xl mb-4">📊</div>
              <h3 class="text-lg font-semibold mb-2">Administrators</h3>
              <p class="text-gray-600 text-sm mb-4">
                Oversee operations, analyze data, and ensure platform quality
              </p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>• System oversight</li>
                <li>• Analytics</li>
                <li>• Quality control</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Image Section Component -->
      <ImageSection />

      <!-- Statistics Section -->
      <section
        class="py-16 md:py-20 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 relative overflow-hidden"
      >
        <div class="absolute inset-0 opacity-10">
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_0%,transparent_50%)]"
          ></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2
              class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Impact in Numbers
            </h2>
            <p class="text-xl text-emerald-50 max-w-2xl mx-auto">
              Making a difference across Tanzania's agricultural landscape
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div
              class="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20"
            >
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">
                10,000+
              </div>
              <p class="text-emerald-50 font-medium">Farmers Connected</p>
            </div>

            <div
              class="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20"
            >
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">
                50,000+
              </div>
              <p class="text-emerald-50 font-medium">Tons of Produce Traded</p>
            </div>

            <div
              class="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20"
            >
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">
                500+
              </div>
              <p class="text-emerald-50 font-medium">Buyer Partners</p>
            </div>

            <div
              class="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20"
            >
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">
                25%
              </div>
              <p class="text-emerald-50 font-medium">Income Increase</p>
            </div>
          </div>
        </div>
      </section>
      <!-- Related Section -->
      <!-- Related Section -->
      <section
        class="relative w-full py-16 md:py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50/70 overflow-hidden min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[700px]"
      >
        <!-- Background pattern -->
        <div class="absolute inset-0 opacity-10">
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.08)_0%,transparent_50%)]"
          ></div>
        </div>

        <div
          class="relative z-10 w-full h-full flex flex-col items-center justify-center"
        >
          <!-- Header -->
          <div class="text-center mb-12 max-w-3xl px-4"></div>

          <!-- Full-width Image -->
          <div
            class="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
          >
            <img
              src="/images/heroes/g.jpeg"
              alt="Related Initiative"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Optional Call-to-Action Button -->
          <div class="mt-8"></div>
        </div>
      </section>
      <!-- Final CTA Section -->
      <section class="py-20 bg-accent-600/90 backdrop-blur-sm">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Farming Journey?
          </h2>
          <p class="text-xl text-accent-100 mb-8">
            Join thousands of Tanzanian farmers who are already benefiting from
            SFMP's digital platform.
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
import BlogCard from "@/components/common/BlogCard.vue";
import ImageSection from "@/components/common/ImageSection.vue";

const languageStore = useLanguageStore();

// Mobile detection
const isMobile = ref(false);
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// Carousel functionality for mobile
const currentSlide = ref(0);
const totalSlides = 5;
let autoPlayInterval = null;

// Success Stories Carousel (if you still use it elsewhere – otherwise remove)
const successSlide = ref(0);
const totalSuccessSlides = 3;
let successAutoPlayInterval = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides;
};

const previousSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? totalSlides - 1 : currentSlide.value - 1;
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
  if (autoPlayInterval) clearInterval(autoPlayInterval);
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
/* Your original style block remains unchanged */
</style>

<template>
  <div class="min-h-screen relative font-inter">
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
                  class="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-2 sm:mb-2 tracking-tight"
                >
                  {{ languageStore.t("sustainableFarm") }}
                </h1>

                <p
                  class="text-lg sm:text-xl text-white/80 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
                >
                  {{ languageStore.t("connectingFarmers") }}
                </p>

                <div
                  class="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start mb-6 sm:mb-8"
                >
                  <router-link
                    to="/register"
                    class="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-base sm:text-lg transition duration-300 hover:scale-105 shadow-lg text-center"
                  >
                    {{ languageStore.t("getStarted") }}
                  </router-link>

                  <router-link
                    to="/login"
                    class="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-base sm:text-lg transition duration-300 hover:scale-105 text-center"
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
      <section class="py-8 bg-white/95 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Simple Steps to Get Started
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Begin your journey in minutes with our streamlined onboarding process
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
      <section class="py-8 bg-earth-50/90 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Find Your Role in Ecosystem
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Whether you grow, buy, or organize, there's a place for you in our network
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
              <p class="text-gray-600 font-normal leading-relaxed">
                Cultivate success with smart farming tools and direct market access
              </p>
            </div>

            <div class="card p-6 text-center hover:shadow-lg transition-shadow">
              <div
                class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <ShoppingCart class="w-8 h-8 text-accent-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Buyers</h3>
              <p class="text-gray-600 font-normal leading-relaxed">
                Source premium produce directly from verified Tanzanian farmers
              </p>
            </div>

            <div class="card p-6 text-center hover:shadow-lg transition-shadow">
              <div
                class="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Users class="w-8 h-8 text-earth-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Cooperatives</h3>
              <p class="text-gray-600 font-normal leading-relaxed">
                Empower farming communities with collective strength and shared resources
              </p>
            </div>

            <div class="card p-6 hover:shadow-lg transition-shadow">
              <div class="text-3xl mb-4">📊</div>
              <h3 class="text-lg font-semibold mb-2">Administrators</h3>
              <p class="text-gray-600 text-sm mb-4 font-normal leading-relaxed">
                Drive agricultural transformation through data-driven insights and platform excellence
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
        class="py-8 md:py-12 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 relative overflow-hidden"
      >
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-8">
      <h2
        class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
      >
        Transforming Lives Through Agriculture
      </h2>
      <p class="text-xl text-emerald-50 max-w-2xl mx-auto font-normal leading-relaxed">
        Real stories of change from communities across Tanzania
      </p>
    </div>

    <!-- Mobile carousel (single card) -->
    <div class="lg:hidden">
      <div class="relative overflow-hidden" x-data="{ mobileCardIndex: 0 }">
        <div
          class="flex transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${mobileCardIndex * 100}%)` }"
        >
          <!-- Market Access Card -->
          <div class="w-full flex-shrink-0 px-4">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-emerald-700/80 to-teal-600/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-105 rotate-1 group-hover:rotate-0"></div>
              <div class="relative bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-8 flex flex-col justify-center group-hover:border-emerald-400/60 transition-all duration-700">
                <div class="text-center relative z-10">
                  <div class="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-emerald-200 mb-4">Market Access</h3>
                  <p class="text-emerald-100 font-normal leading-relaxed max-w-sm mx-auto">
                    Farmers connect directly with buyers, eliminating middlemen and ensuring fair prices for their produce
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Digital Tools Card -->
          <div class="w-full flex-shrink-0 px-4">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/80 to-indigo-600/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-105 -rotate-1 group-hover:rotate-0"></div>
              <div class="relative bg-white/10 backdrop-blur-md border border-blue-400/30 rounded-2xl p-8 flex flex-col justify-center group-hover:border-blue-400/60 transition-all duration-700">
                <div class="text-center relative z-10">
                  <div class="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-blue-200 mb-4">Digital Tools</h3>
                  <p class="text-blue-100 font-normal leading-relaxed max-w-sm mx-auto">
                    Mobile technology and modern farming equipment help increase productivity and crop quality
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Community Growth Card -->
          <div class="w-full flex-shrink-0 px-4">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/80 to-pink-600/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-105 rotate-1 group-hover:rotate-0"></div>
              <div class="relative bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-2xl p-8 flex flex-col justify-center group-hover:border-purple-400/60 transition-all duration-700">
                <div class="text-center relative z-10">
                  <div class="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-purple-200 mb-4">Community Growth</h3>
                  <p class="text-purple-100 font-normal leading-relaxed max-w-sm mx-auto">
                    Cooperatives and farming groups work together, sharing resources and knowledge for collective success
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sustainable Future Card -->
          <div class="w-full flex-shrink-0 px-4">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-amber-600/80 to-yellow-600/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-105 -rotate-1 group-hover:rotate-0"></div>
              <div class="relative bg-white/10 backdrop-blur-md border border-orange-400/30 rounded-2xl p-8 flex flex-col justify-center group-hover:border-orange-400/60 transition-all duration-700">
                <div class="text-center relative z-10">
                  <div class="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-amber-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-orange-200 mb-4">Sustainable Future</h3>
                  <p class="text-orange-100 font-normal leading-relaxed max-w-sm mx-auto">
                    Environmentally friendly practices ensure productive land for future generations
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Financial Empowerment Card -->
          <div class="w-full flex-shrink-0 px-4">
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-rose-600/90 via-pink-700/80 to-fuchsia-600/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-105 -rotate-1 group-hover:rotate-0"></div>
              <div class="relative bg-white/10 backdrop-blur-md border border-rose-400/30 rounded-2xl p-8 flex flex-col justify-center group-hover:border-rose-400/60 transition-all duration-700">
                <div class="text-center relative z-10">
                  <div class="w-20 h-20 bg-gradient-to-br from-rose-500/20 to-pink-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-rose-200 mb-4">Financial Empowerment</h3>
                  <p class="text-rose-100 font-normal leading-relaxed max-w-sm mx-auto">
                    Access to microfinance and digital payments helps farmers invest in their operations and secure their financial future
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <div class="flex justify-center mt-8 space-x-4" x-data="{ mobileCardIndex: 0 }">
        <button
          @click="mobileCardIndex = mobileCardIndex > 0 ? mobileCardIndex - 1 : 0"
          :disabled="mobileCardIndex === 0"
          class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-all duration-300 hover:bg-white/30"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div class="flex space-x-2 items-center">
          <template x-for="i in 5">
            <button
              @click="mobileCardIndex = i - 1"
              class="h-2 rounded-full transition-all duration-300"
              :class="{
                'bg-emerald-400 w-8': mobileCardIndex === i - 1,
                'bg-white/50 w-2': mobileCardIndex !== i - 1
              }"
            ></button>
          </template>
        </div>
        <button
          @click="mobileCardIndex = mobileCardIndex < 4 ? mobileCardIndex + 1 : 4"
          :disabled="mobileCardIndex === 4"
          class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-all duration-300 hover:bg-white/30"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Desktop view (full width grid) -->
    <div class="hidden lg:grid lg:grid-cols-5 gap-6">
      <!-- Market Access Card -->
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-600/90 via-emerald-700/80 to-teal-600/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-105 rotate-1 group-hover:rotate-0"></div>
        <div class="relative bg-white/10 backdrop-blur-md border border-emerald-400/30 rounded-2xl p-6 h-full flex flex-col justify-center group-hover:border-emerald-400/60 transition-all duration-700">
          <div class="text-center relative z-10">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-emerald-500/40 group-hover:to-emerald-600/50 transition-all duration-500">
              <svg class="w-8 h-8 text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-emerald-200 mb-2 group-hover:text-white transition-colors duration-300">Market Access</h3>
            <p class="text-emerald-100 text-sm font-normal leading-relaxed group-hover:text-emerald-50 transition-colors duration-300">
              Farmers connect directly with buyers, eliminating middlemen and ensuring fair prices for their produce
            </p>
          </div>
        </div>
      </div>

      <!-- Digital Tools Card -->
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/80 to-indigo-600/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-105 -rotate-1 group-hover:rotate-0"></div>
        <div class="relative bg-white/10 backdrop-blur-md border border-blue-400/30 rounded-2xl p-6 h-full flex flex-col justify-center group-hover:border-blue-400/60 transition-all duration-700">
          <div class="text-center relative z-10">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-500/40 group-hover:to-blue-600/50 transition-all duration-500">
              <svg class="w-8 h-8 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-blue-200 mb-2 group-hover:text-white transition-colors duration-300">Digital Tools</h3>
            <p class="text-blue-100 text-sm font-normal leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
              Mobile technology and modern farming equipment help increase productivity and crop quality
            </p>
          </div>
        </div>
      </div>

      <!-- Community Growth Card -->
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/80 to-pink-600/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-105 rotate-1 group-hover:rotate-0"></div>
        <div class="relative bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-2xl p-6 h-full flex flex-col justify-center group-hover:border-purple-400/60 transition-all duration-700">
          <div class="text-center relative z-10">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500/40 group-hover:to-purple-600/50 transition-all duration-500">
              <svg class="w-8 h-8 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-purple-200 mb-2 group-hover:text-white transition-colors duration-300">Community Growth</h3>
            <p class="text-purple-100 text-sm font-normal leading-relaxed group-hover:text-purple-50 transition-colors duration-300">
              Cooperatives and farming groups work together, sharing resources and knowledge for collective success
            </p>
          </div>
        </div>
      </div>

      <!-- Sustainable Future Card -->
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-amber-600/80 to-yellow-600/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-105 -rotate-1 group-hover:rotate-0"></div>
        <div class="relative bg-white/10 backdrop-blur-md border border-orange-400/30 rounded-2xl p-6 h-full flex flex-col justify-center group-hover:border-orange-400/60 transition-all duration-700">
          <div class="text-center relative z-10">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-amber-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-orange-500/40 group-hover:to-amber-600/50 transition-all duration-500">
              <svg class="w-8 h-8 text-orange-300 group-hover:text-orange-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-orange-200 mb-2 group-hover:text-white transition-colors duration-300">Sustainable Future</h3>
            <p class="text-orange-100 text-sm font-normal leading-relaxed group-hover:text-orange-50 transition-colors duration-300">
              Environmentally friendly practices ensure productive land for future generations
            </p>
          </div>
        </div>
      </div>

      <!-- Financial Empowerment Card -->
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-br from-rose-600/90 via-pink-700/80 to-fuchsia-600/70 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-105 -rotate-1 group-hover:rotate-0"></div>
        <div class="relative bg-white/10 backdrop-blur-md border border-rose-400/30 rounded-2xl p-6 h-full flex flex-col justify-center group-hover:border-rose-400/60 transition-all duration-700">
          <div class="text-center relative z-10">
            <div class="w-16 h-16 bg-gradient-to-br from-rose-500/20 to-pink-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-rose-500/40 group-hover:to-pink-600/50 transition-all duration-500">
              <svg class="w-8 h-8 text-rose-300 group-hover:text-rose-200 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-rose-200 mb-2 group-hover:text-white transition-colors duration-300">Financial Empowerment</h3>
            <p class="text-rose-100 text-sm font-normal leading-relaxed group-hover:text-rose-50 transition-colors duration-300">
              Access to microfinance and digital payments helps farmers invest in their operations and secure their financial future
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  <!-- Agriculture Section - Text Over Image -->
<section class="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">

  <!-- Background Image -->
  <img
    src="/images/heroes/g.jpeg"
    alt="Agriculture in Tanzania"
    class="absolute inset-0 w-full h-full object-cover"
  />

  <!-- Dark Gradient Overlay (for readability) -->
  <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>

  <!-- Content -->
  <div class="relative z-10 w-full px-4 md:px-8 lg:px-12 pt-12 md:pt-16 lg:pt-20">

    <div class="max-w-5xl">

      <span class="inline-block text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4">
        Our Mission
      </span>

      <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
        Thriving Communities Rooted in 
        <span class="text-emerald-400">Agriculture</span>
      </h2>

      <div class="w-20 h-1 bg-emerald-400 mb-6 rounded-full"></div>

      <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-normal max-w-4xl">
        Across rural Tanzania, agriculture is more than farming — it is a source of joy, unity, 
        and shared prosperity. Communities come together to cultivate the land, celebrate harvests, 
        and support one another through every season. The smiles in our fields reflect opportunity, 
        dignity, and hope. Through agriculture, families earn sustainable incomes, children grow in 
        secure environments, and villages flourish with renewed energy and pride.
      </p>

    </div>
  </div>

</section>
      <!-- Final CTA Section -->
      <section class="py-8 bg-accent-600/90 backdrop-blur-sm">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Join Tanzania's Agricultural Revolution
          </h2>
          <p class="text-xl text-accent-100 mb-8 font-normal leading-relaxed">
            Be part of the digital transformation that's empowering farmers 
            and strengthening communities across the nation.
          </p>
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

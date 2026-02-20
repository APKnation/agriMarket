<template>
  <div class="min-h-screen relative">
    <!-- Background Image -->
    <div class="fixed inset-0 z-0">
      <div class="w-full h-full bg-gradient-to-br from-primary-900/80 to-earth-900/80"></div>
    </div>
    
    <!-- Content Container -->
    <div class="relative z-10">
      <!-- Dynamic Carousel Hero Section -->
    <section class="relative min-h-[650px] bg-black overflow-hidden">

  <!-- Background -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-cover bg-center"
         style="background-image: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url('/images/heroes/cropmanage.jpg');
                background-size: cover;
                background-position: center;">
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
  </div>

  <!-- Content -->
  <div class="relative z-20 max-w-7xl mx-auto px-6 py-24">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

      <!-- LEFT SIDE -->
      <div class="text-center lg:text-left">

        <h1 class="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          {{ languageStore.t('sustainableFarm') }}
        </h1>

        <p class="text-xl text-white/80 mb-10 max-w-xl">
          {{ languageStore.t('connectingFarmers') }}
        </p>

        <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-8">
          <router-link
            to="/register"
            class="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition duration-300 hover:scale-105 shadow-lg">
            {{ languageStore.t('getStarted') }}
          </router-link>

          <router-link
            to="/login"
            class="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition duration-300 hover:scale-105">
            {{ languageStore.t('signIn') }}
          </router-link>
        </div>

      </div>

      <!-- RIGHT SIDE (Clustered Cards Layout with 3D Animations) -->
      <div class="relative hidden lg:block h-[700px] preserve-3d">

        <!-- TOP LEFT CARD (3D Flip) -->
        <div class="absolute top-16 left-8 w-64 z-20 transform -rotate-3 hover:rotate-0 hover:rotate-y-180 transition-all duration-700 preserve-3d">
          <div class="rounded-xl overflow-hidden shadow-xl border border-white/10 transform-style-preserve-3d">
            <div class="relative transform-style-preserve-3d">
              <img src="/images/heroes/cropmanage.jpg"
                   class="h-80 w-full object-cover backface-hidden"/>
              <!-- 3D Card Back -->
              <div class="absolute inset-0 bg-gradient-to-br from-green-600/20 to-earth-600/20 transform rotate-y-180 backface-hidden">
                <div class="flex items-center justify-center h-full">
                  <div class="text-center text-white p-6">
                    <h3 class="text-xl font-bold mb-2">Crop Management</h3>
                    <p class="text-sm opacity-80">Smart farming solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TOP RIGHT CARD (3D Tilt) -->
        <div class="absolute top-16 right-8 w-64 z-20 transform rotate-3 hover:rotate-0 hover:rotate-x-12 hover:translate-z-10 transition-all duration-700 preserve-3d">
          <div class="rounded-xl overflow-hidden shadow-xl border border-white/10 transform-style-preserve-3d">
            <div class="relative transform-style-preserve-3d">
              <img src="/images/heroes/market1.jpg"
                   class="h-80 w-full object-cover"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transform translate-z-5"></div>
              <!-- 3D Shadow Layer -->
              <div class="absolute inset-0 bg-black/20 transform translate-z-[-10] scale-110"></div>
            </div>
          </div>
        </div>

        <!-- CENTER MAIN CARD -->
        <div class="absolute top-40 left-1/2 transform -translate-x-1/2 w-80 z-30 transform hover:scale-105 transition-all duration-700 hover:rotate-y-12 hover:rotate-x-6 hover:translate-z-20 preserve-3d">
          <div class="rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform-style-preserve-3d">
            <div class="relative transform-style-preserve-3d">
              <img src="/images/heroes/market.jpg"
                   class="w-full h-72 object-cover"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transform translate-z-10"></div>
              <!-- 3D Card Back -->
              <div class="absolute inset-0 bg-gradient-to-br from-red-600/20 to-blue-600/20 transform rotate-y-180 backface-hidden">
                <div class="flex items-center justify-center h-full">
                  <div class="text-center text-white p-6">
                    <h3 class="text-2xl font-bold mb-2">Farmers Market</h3>
                    <p class="text-sm opacity-80">Connect with local farmers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM LEFT SMALL CARD (3D Float) -->
        <div class="absolute bottom-32 left-16 w-56 z-10 transform rotate-2 hover:scale-110 hover:rotate-z-6 hover:translate-y-[-20px] transition-all duration-700 preserve-3d">
          <div class="rounded-xl overflow-hidden shadow-lg border border-white/10 transform-style-preserve-3d">
            <div class="relative transform-style-preserve-3d">
              <img src="/images/heroes/register.png"
                   class="h-48 w-full object-cover"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transform translate-z-5"></div>
              <!-- 3D Glow Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-primary-600/30 to-accent-600/30 transform translate-z-10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>
        </div>

        <!-- BOTTOM RIGHT SMALL CARD (3D Spin) -->
        <div class="absolute bottom-32 right-16 w-56 z-10 transform -rotate-2 hover:rotate-180 hover:scale-110 transition-all duration-700 preserve-3d">
          <div class="rounded-xl overflow-hidden shadow-lg border border-white/10 transform-style-preserve-3d">
            <div class="relative transform-style-preserve-3d">
              <img src="/images/heroes/cropmanage.jpg"
                   class="h-48 w-full object-cover backface-hidden"/>
              <!-- 3D Card Back -->
              <div class="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 transform rotate-y-180 backface-hidden">
                <div class="flex items-center justify-center h-full">
                  <div class="text-center text-white p-4">
                    <h3 class="text-lg font-bold mb-1">Tanzania Focus</h3>
                    <p class="text-xs opacity-80">Local solutions</p>
                  </div>
                </div>
              </div>
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
            {{ languageStore.t('howItWorks') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {{ languageStore.t('empoweringFarmers') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Register Card -->
          <BlogCard
            image-src="/images/heroes/market.jpg"
            image-alt="Tanzanian farmer using mobile phone for registration"
            :title="languageStore.t('register')"
            :description="languageStore.t('createAccount')"
            :read-more-text="languageStore.t('learnMore')"
            read-more-link="/register"
          />
          
          <!-- Manage Crops Card -->
          <BlogCard
            image-src="/images/heroes/cropmanage.jpg"
            image-alt="Farmer managing crops with digital tools"
            :title="languageStore.t('manageCrops')"
            :description="languageStore.t('trackPlanting')"
            :read-more-text="languageStore.t('learnMore')"
            read-more-link="/crops"
          />
          
          <!-- Connect & Trade Card -->
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
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Farmers</h3>
            <p class="text-gray-600">Grow and manage crops with digital tools</p>
          </div>
          
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart class="w-8 h-8 text-accent-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Buyers</h3>
            <p class="text-gray-600">Connect directly with farmers and purchase quality produce</p>
          </div>
          
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users class="w-8 h-8 text-earth-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Cooperatives</h3>
            <p class="text-gray-600">Manage groups of farmers and aggregate production</p>
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

    <!-- Statistics Section -->
    <section class="py-20 bg-primary-600/90 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Impact in Numbers
          </h2>
          <p class="text-xl text-primary-100 max-w-2xl mx-auto">
            Making a difference across Tanzania's agricultural landscape
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">10,000+</div>
            <p class="text-primary-100">Farmers Connected</p>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">50,000+</div>
            <p class="text-primary-100">Tons of Produce Traded</p>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
            <p class="text-primary-100">Buyer Partners</p>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">25%</div>
            <p class="text-primary-100">Income Increase</p>
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
import { UserPlus, Sprout, ShoppingCart } from 'lucide-vue-next'
import { useLanguageStore } from '@/stores/language'
import BlogCard from '@/components/common/BlogCard.vue'
import Carousel from '@/components/common/Carousel.vue'

const languageStore = useLanguageStore()
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

.rotate-x-6 {
  transform: rotateX(6deg);
}

.rotate-x-12 {
  transform: rotateX(12deg);
}

.rotate-y-12 {
  transform: rotateY(12deg);
}

.rotate-z-6 {
  transform: rotateZ(6deg);
}

/* 3D Translation Classes */
.translate-z-10 {
  transform: translateZ(10px);
}

.translate-z-20 {
  transform: translateZ(20px);
}

.translate-z-5 {
  transform: translateZ(5px);
}

.translate-z-[-10] {
  transform: translateZ(-10px);
}

.translate-y-[-20px] {
  transform: translateY(-20px);
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

.animation-delay-600 {
  animation-delay: 0.6s;
}

/* Netflix-style hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Button hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
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
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
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

.hover\:rotate-x-12:hover {
  transform: rotateX(12deg);
}

.hover\:rotate-x-6:hover {
  transform: rotateX(6deg);
}

.hover\:rotate-y-12:hover {
  transform: rotateY(12deg);
}

.hover\:rotate-z-6:hover {
  transform: rotateZ(6deg);
}

.hover\:translate-z-20:hover {
  transform: translateZ(20px);
}

.hover\:translate-z-10:hover {
  transform: translateZ(10px);
}

.hover\:translate-z-5:hover {
  transform: translateZ(5px);
}

.hover\:translate-y-[-20px]:hover {
  transform: translateY(-20px);
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

/* 3D Card Effects */
.hover\:rotate-180:hover {
  transform: rotate(180deg);
}

/* Custom 3D Transforms */
.transform {
  transform-style: preserve-3d;
}

/* Enhanced 3D Shadows */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>

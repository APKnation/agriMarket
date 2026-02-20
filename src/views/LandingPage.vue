<template>
  <div class="min-h-screen relative">
    <!-- Background Image -->
    <div class="fixed inset-0 z-0">
      <div class="w-full h-full bg-gradient-to-br from-primary-900/80 to-earth-900/80"></div>
    </div>
    
    <!-- Content Container -->
    <div class="relative z-10">
      <!-- Dynamic Carousel Hero Section -->
      <section class="relative">
        <Carousel />
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
            image-src="https://images.unsplash.com/photo-1592924357228-91a4daadc1cf?w=400&h=200&fit=crop"
            image-alt="Register illustration"
            :title="languageStore.t('register')"
            :description="languageStore.t('createAccount')"
            :read-more-text="languageStore.t('learnMore')"
            read-more-link="/register"
          />
          
          <!-- Manage Crops Card -->
          <BlogCard
            image-src="https://images.unsplash.com/photo-1592924357228-91a4daadc1cf?w=400&h=200&fit=crop"
            image-alt="Crops management illustration"
            :title="languageStore.t('manageCrops')"
            :description="languageStore.t('trackPlanting')"
            :read-more-text="languageStore.t('learnMore')"
            read-more-link="/crops"
          />
          
          <!-- Connect & Trade Card -->
          <BlogCard
            image-src="https://images.unsplash.com/photo-1592924357228-91a4daadc1cf?w=400&h=200&fit=crop"
            image-alt="Marketplace illustration"
            :title="languageStore.t('connectTrade')"
            :description="languageStore.t('listProducts')"
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

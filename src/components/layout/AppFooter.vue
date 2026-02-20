<template>
<footer class="relative bg-gradient-to-br from-[#0b1c14] via-[#10281d] to-[#0b1c14] text-gray-300 border-t border-white/10 overflow-hidden">

  <!-- Background Glow -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full"></div>
    <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-6 py-16">

    <div class="grid grid-cols-1 md:grid-cols-4 gap-12">

      <!-- Logo -->
      <div class="space-y-5">
        <div class="flex items-center space-x-4">
          <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
            <span class="text-white text-2xl">🌾</span>
          </div>
          <h3 class="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            SFMP
          </h3>
        </div>

        <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
          Empowering Tanzanian farmers through digital innovation and sustainable agriculture solutions.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="text-lg font-semibold mb-6 text-white">Quick Links</h4>
        <div class="space-y-3 text-sm">
          <router-link to="/" class="block text-gray-400 hover:text-emerald-400 transition">Home</router-link>
          <router-link to="/products" class="block text-gray-400 hover:text-emerald-400 transition">Marketplace</router-link>
          <router-link to="/farmers" class="block text-gray-400 hover:text-emerald-400 transition">Farmers</router-link>
          <router-link to="/crops" class="block text-gray-400 hover:text-emerald-400 transition">Crops</router-link>
          <router-link to="/orders" class="block text-gray-400 hover:text-emerald-400 transition">Orders</router-link>
          <router-link to="/analytics" class="block text-gray-400 hover:text-emerald-400 transition">Analytics</router-link>
        </div>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-lg font-semibold mb-6 text-white">Contact</h4>
        <div class="space-y-3 text-sm text-gray-400">
          <p>📧 info@sfmp.tz</p>
          <p>📞 +255 22 211 0000</p>
          <p>📍 Dodoma, Tanzania</p>
        </div>
      </div>

      <!-- Newsletter -->
      <div>
        <h4 class="text-lg font-semibold mb-6 text-white">Subscribe to Newsletter</h4>

        <form @submit.prevent="subscribe" class="space-y-4">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition text-white placeholder-gray-500"
          />

          <button
            type="submit"
            class="w-full bg-emerald-600 hover:bg-emerald-700 transition duration-300 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/30">
            Subscribe
          </button>

          <p v-if="successMessage" class="text-emerald-400 text-sm">
            {{ successMessage }}
          </p>
        </form>
      </div>

    </div>

    <!-- Bottom Links -->
    <div class="mt-12 border-t border-white/10 pt-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Legal Links -->
        <div>
          <h4 class="text-sm font-semibold mb-4 text-white">Legal</h4>
          <div class="flex flex-wrap gap-4 text-sm">
            <router-link to="/login" class="text-gray-400 hover:text-emerald-400 transition">Login</router-link>
            <router-link to="/register" class="text-gray-400 hover:text-emerald-400 transition">Register</router-link>
            <router-link to="/profile" class="text-gray-400 hover:text-emerald-400 transition">Profile</router-link>
            <router-link to="/settings" class="text-gray-400 hover:text-emerald-400 transition">Settings</router-link>
          </div>
        </div>

        <!-- Platform Links -->
        <div>
          <h4 class="text-sm font-semibold mb-4 text-white">Platform</h4>
          <div class="flex flex-wrap gap-4 text-sm">
            <router-link to="/dashboard" class="text-gray-400 hover:text-emerald-400 transition">Dashboard</router-link>
            <router-link to="/products/new" class="text-gray-400 hover:text-emerald-400 transition">Add Product</router-link>
            <router-link to="/farmers" class="text-gray-400 hover:text-emerald-400 transition">Farmer Directory</router-link>
            <router-link to="/orders" class="text-gray-400 hover:text-emerald-400 transition">Order History</router-link>
          </div>
        </div>
      </div>

    <!-- Bottom -->
    <div class="mt-14 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
      <p>© {{ currentYear }} SFMP Tanzania. All rights reserved.</p>

      <button
        @click="scrollToTop"
        class="mt-4 md:mt-0 text-emerald-400 hover:text-emerald-300 transition">
        ↑ Back to top
      </button>
    </div>

  </div>

  </div>
</footer>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const email = ref('')
const successMessage = ref('')

const subscribe = () => {
  if (!email.value) return

  // Simulate API call
  successMessage.value = "Thank you for subscribing!"
  email.value = ''

  setTimeout(() => {
    successMessage.value = ''
  }, 4000)
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
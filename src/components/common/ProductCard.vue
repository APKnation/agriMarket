<template>
  <div class="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
    <!-- Product Image with Overlay -->
    <div class="relative overflow-hidden h-48 sm:h-56 md:h-64">
      <img 
        :src="product.image || '/images/products/placeholder.jpg'" 
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      <!-- Status Badge -->
      <div class="absolute top-2 sm:top-4 right-2 sm:right-4">
        <span 
          :class="getStatusClass(product.status)"
          class="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
        >
          {{ product.status || 'Available' }}
        </span>
      </div>
      
      <!-- Quick Actions Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between">
          <button 
            @click="viewDetails"
            class="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-white transition-colors"
          >
            <Eye class="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
            <span class="hidden sm:inline">View</span>
          </button>
          <button 
            @click="addToCart"
            class="bg-primary-600 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            <ShoppingCart class="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
            <span class="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Product Content -->
    <div class="p-3 sm:p-4 md:p-6">
      <!-- Category Badge -->
      <div class="flex items-center justify-between mb-2 sm:mb-3">
        <span class="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          {{ product.category }}
        </span>
        <div class="flex items-center text-yellow-500">
          <Star class="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
          <span class="text-xs sm:text-sm text-gray-600 ml-1">{{ product.rating || '4.5' }}</span>
        </div>
      </div>
      
      <!-- Product Name -->
      <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
        {{ product.name }}
      </h3>
      
      <!-- Description -->
      <p class="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
        {{ product.description || 'High quality agricultural product from local Tanzanian farmers.' }}
      </p>
      
      <!-- Product Details -->
      <div class="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm">
        <div class="flex items-center text-gray-500">
          <MapPin class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span class="sm:inline">{{ product.location || 'Tanzania' }}</span>
          <span class="sm:hidden">📍</span>
        </div>
        <div class="flex items-center text-gray-500">
          <Package class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span class="sm:inline">{{ product.quantity || 'Available' }}</span>
          <span class="sm:hidden">✓</span>
        </div>
      </div>
      
      <!-- Price and Action -->
      <div class="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
        <div>
          <span class="text-lg sm:text-2xl font-bold text-primary-600">
            TZS {{ formatPrice(product.price) }}
          </span>
          <span class="text-xs sm:text-sm text-gray-500 block">per {{ product.unit || 'kg' }}</span>
        </div>
        
        <div class="flex space-x-1 sm:space-x-2">
          <button 
            @click="toggleFavorite"
            :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
            class="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Heart :class="isFavorite ? 'fill-current' : ''" class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button 
            @click="contactSeller"
            class="bg-accent-600 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-accent-700 transition-colors"
          >
            <span class="sm:inline">Contact</span>
            <span class="sm:hidden">💬</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Eye, ShoppingCart, Star, MapPin, Package, Heart } from 'lucide-vue-next'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      description: '',
      price: 0,
      category: '',
      status: 'available',
      rating: 4.5,
      location: 'Tanzania',
      quantity: 'Available',
      unit: 'kg',
      image: null
    })
  }
})

const emit = defineEmits(['view-details', 'add-to-cart', 'toggle-favorite', 'contact-seller'])

const isFavorite = ref(false)

const getStatusClass = (status) => {
  const statusClasses = {
    'available': 'bg-green-500/80 text-white',
    'sold': 'bg-red-500/80 text-white',
    'pending': 'bg-yellow-500/80 text-white',
    'reserved': 'bg-blue-500/80 text-white'
  }
  return statusClasses[status.toLowerCase()] || statusClasses['available']
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-TZ').format(price)
}

const viewDetails = () => {
  emit('view-details', props.product)
}

const addToCart = () => {
  emit('add-to-cart', props.product)
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  emit('toggle-favorite', props.product)
}

const contactSeller = () => {
  emit('contact-seller', props.product)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

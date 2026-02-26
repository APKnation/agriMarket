<template>
  <div class="min-h-screen bg-earth-50 pb-32">
    <!-- Page Header -->
    <div class="page-header px-4 py-6 md:px-6 md:py-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl md:text-3xl font-bold">Products Marketplace</h1>
        <p class="text-green-100 mt-2 text-sm md:text-base">Browse quality agricultural products from Tanzanian farmers</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
      <!-- Filters Section -->
      <div class="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Category:</label>
            <select v-model="selectedCategory" class="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">All Categories</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="legumes">Legumes</option>
            </select>
          </div>
          
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Sort by:</label>
            <select v-model="sortBy" class="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Price Range:</label>
            <select v-model="priceRange" class="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">All Prices</option>
              <option value="0-1000">Under TZS 1,000</option>
              <option value="1000-5000">TZS 1,000 - 5,000</option>
              <option value="5000+">Above TZS 5,000</option>
            </select>
          </div>
          
          <button 
            @click="clearFilters"
            class="sm:ml-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @view-details="viewProductDetails"
          @add-to-cart="addToCart"
          @toggle-favorite="toggleFavorite"
          @contact-seller="contactSeller"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <div class="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package class="w-12 h-12 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
          <p class="text-gray-600 mb-4">Try adjusting your filters or check back later.</p>
          <button @click="clearFilters" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Cart Sidebar - Right Side with Vue Transition -->
    <Transition name="slide-right">
      <div 
        v-if="cart.length > 0" 
        class="fixed right-0 top-0 h-full w-80 bg-gray-900 shadow-2xl z-40 border-l border-gray-700 flex flex-col md:w-80 sm:w-72 cart-sidebar-mobile"
      >
        <!-- Cart Header -->
        <div class="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <ShoppingCart class="w-5 h-5 md:w-6 md:h-6" />
              <h3 class="text-sm font-bold md:text-lg">Shopping Cart</h3>
              <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{{ cart.length }}</span>
            </div>
            <button 
              @click="clearCart" 
              class="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              title="Clear Cart"
            >
              <X class="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        <!-- Cart Items - Scrollable -->
        <div class="flex-1 overflow-y-auto bg-gray-800 p-3 md:p-4">
          <div class="space-y-2 md:space-y-3">
            <div 
              v-for="(item, index) in cart" 
              :key="item.id" 
              class="bg-gray-700 rounded-lg p-2 md:p-3 hover:bg-gray-600 transition-colors border border-gray-600"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-white text-xs md:text-sm truncate">{{ item.name }}</h4>
                  <p class="text-xs text-gray-300 mt-1">{{ item.farmer }}</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs md:text-sm font-bold text-green-400">TZS {{ formatPrice(item.price * item.quantity) }}</span>
                    <div class="flex items-center gap-1 md:gap-2">
                      <button 
                        @click="decreaseQuantity(index)"
                        class="w-5 h-5 md:w-6 md:h-6 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs flex items-center justify-center"
                      >
                        -
                      </button>
                      <span class="text-xs text-gray-400 w-3 md:w-4 text-center">{{ item.quantity }}</span>
                      <button 
                        @click="increaseQuantity(index)"
                        class="w-5 h-5 md:w-6 md:h-6 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  @click="removeFromCart(index)" 
                  class="text-red-400 hover:bg-red-900 p-1 rounded transition-colors ml-1 md:ml-2 flex-shrink-0"
                  title="Remove item"
                >
                  <X class="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Footer - Fixed at bottom -->
        <div class="border-t border-gray-600 p-3 md:p-4 bg-gray-900 flex-shrink-0">
          <!-- Total -->
          <div class="flex items-center justify-between mb-3 md:mb-4">
            <span class="text-sm md:text-lg font-bold text-white">Total:</span>
            <span class="text-sm md:text-xl font-bold text-green-400">TZS {{ formatPrice(cartTotal) }}</span>
          </div>
          
          <!-- Action Buttons -->
          <div class="space-y-2">
            <button 
              @click="viewCart" 
              class="w-full px-3 py-2 md:px-4 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2 transition-colors text-xs md:text-sm"
            >
              <Eye class="w-3 h-3 md:w-4 md:h-4" />
              <span class="sm:inline">View Cart Details</span>
              <span class="sm:hidden">View Cart</span>
            </button>
            <button 
              @click="checkout" 
              class="w-full px-3 py-2 md:px-4 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2 transition-colors text-xs md:text-sm"
            >
              <ShoppingCart class="w-3 h-3 md:w-4 md:h-4" />
              <span class="sm:inline">Proceed to Checkout</span>
              <span class="sm:hidden">Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Floating Cart Button (when cart is empty) -->
    <div 
      v-if="cart.length === 0" 
      class="fixed right-4 bottom-4 bg-gray-600 text-white p-3 rounded-full shadow-lg z-30 md:right-6 md:bottom-6"
    >
      <ShoppingCart class="w-5 h-5 md:w-6 md:h-6" />
    </div>

    <!-- Toast Notification -->
    <Transition name="fade">
      <div 
        v-if="showToast" 
        class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 md:px-6 md:py-4 rounded-lg shadow-xl z-50 flex items-center gap-2 md:gap-3 max-w-xs md:max-w-none"
      >
        <CheckCircle class="w-4 h-4 md:w-6 md:h-6" />
        <div class="flex-1 min-w-0">
          <span class="font-medium text-xs md:text-sm">{{ toastMessage }}</span>
          <div class="text-xs mt-1 opacity-90">Cart: {{ cart.length }} items</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Package, ShoppingCart, CheckCircle, X, Eye } from 'lucide-vue-next'
import ProductCard from '@/components/common/ProductCard.vue'
import { useProductsStore } from '@/stores/products'

// Use products store
const productsStore = useProductsStore()
const router = useRouter()

// Reactive data
const selectedCategory = ref('')
const sortBy = ref('name')
const priceRange = ref('')
const cart = ref([])
const showToast = ref(false)
const toastMessage = ref('')

// Get products from store (no loading)
const products = computed(() => productsStore.products || [])

// Computed property for filtered products
const filteredProducts = computed(() => {
  let filtered = products.value
  
  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }
  
  // Filter by price range
  if (priceRange.value) {
    const [min, max] = priceRange.value.split('-').map(p => p === '+' ? Infinity : parseInt(p))
    filtered = filtered.filter(product => {
      if (max === Infinity) return product.price >= min
      return product.price >= min && product.price <= max
    })
  }
  
  // Sort products
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      default:
        return a.name.localeCompare(b.name)
    }
  })
  
  return filtered
})

// Clear filters
const clearFilters = () => {
  selectedCategory.value = ''
  sortBy.value = 'name'
  priceRange.value = ''
}

// View product details
const viewProductDetails = (product) => {
  router.push(`/products/${product.id}`)
}

// Toggle favorite
const toggleFavorite = (product) => {
  console.log('Toggle favorite:', product.name)
}

// Contact seller
const contactSeller = (product) => {
  console.log('Contact seller:', product.farmerName || 'Farmer')
}

// Shopping cart functionality
const showNotification = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Add to cart function
const addToCart = (product) => {
  console.log('Marketplace: addToCart called with product:', product)
  
  const existingItem = cart.value.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity += 1
    showNotification(`${product.name} quantity updated (${existingItem.quantity})`)
  } else {
    cart.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      unit: product.unit || 'kg',
      image: product.image,
      farmer: product.farmerName || 'Local Farmer'
    })
    showNotification(`${product.name} added to cart!`)
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart.value))
  console.log('Cart updated:', cart.value)
}

// Increase quantity
const increaseQuantity = (index) => {
  cart.value[index].quantity += 1
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

// Decrease quantity
const decreaseQuantity = (index) => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity -= 1
    localStorage.setItem('cart', JSON.stringify(cart.value))
  } else {
    removeFromCart(index)
  }
}

// Remove from cart function
const removeFromCart = (index) => {
  const item = cart.value[index]
  cart.value.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cart.value))
  showNotification(`${item.name} removed from cart`)
}

// Clear cart function
const clearCart = () => {
  cart.value = []
  localStorage.removeItem('cart')
  showNotification('Cart cleared')
}

// Calculate cart total
const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

// Checkout function
const checkout = () => {
  if (cart.value.length === 0) return
  
  console.log('Proceeding to checkout with items:', cart.value)
  router.push('/checkout')
}

// View cart function
const viewCart = () => {
  showCart.value = !showCart.value
}

// Load cart from localStorage on mount
onMounted(() => {
  try {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      cart.value = JSON.parse(savedCart)
      console.log('Loaded cart from storage:', cart.value)
    }
  } catch (e) {
    console.error('Error loading cart:', e)
  }
})

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Filter by price range
  if (priceRange.value) {
    filtered = filtered.filter(product => {
      if (priceRange.value === '0-1000') return product.price <= 1000
      if (priceRange.value === '1000-5000') return product.price > 1000 && product.price <= 5000
      if (priceRange.value === '5000+') return product.price > 5000
      return true
    })
  }

  // Sort products
  filtered.sort((a, b) => {
    if (sortBy.value === 'name') return a.name.localeCompare(b.name)
    if (sortBy.value === 'price-low') return a.price - b.price
    if (sortBy.value === 'price-high') return b.price - a.price
    if (sortBy.value === 'rating') return b.rating - a.rating
    return 0
  })

  return filtered
})

const viewProductDetails = (product) => {
  console.log('Viewing details:', product)
  router.push(`/products/${product.id}`)
}

const toggleFavorite = (product) => {
  console.log('Toggling favorite:', product)
  showNotification(`${product.name} added to favorites!`)
}

const contactSeller = (product) => {
  console.log('Contacting seller:', product)
  router.push(`/contact?seller=${product.farmer}&product=${product.id}`)
}

// Format price helper
const formatPrice = (price) => {
  return price.toLocaleString()
}

// Load cart from localStorage on mount
onMounted(() => {
  console.log('ProductListView mounted')
  
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    try {
      cart.value = JSON.parse(savedCart)
      console.log('Loaded cart from storage:', cart.value)
    } catch (e) {
      console.error('Error loading cart:', e)
    }
  }
})
</script>

<style scoped>
/* Responsive Design - Simplified */
@media (max-width: 640px) {
  .cart-sidebar-mobile {
    width: 100vw !important;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .cart-sidebar-mobile {
    width: 20rem !important;
  }
}

/* Slide from right transition */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
}

/* Fade transition for toast */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Ensure proper z-index stacking */
.fixed {
  z-index: 40;
}

/* Custom scrollbar for cart items */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
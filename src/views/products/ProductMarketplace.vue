<template>
  <div class="min-h-screen bg-earth-50">
    <!-- Page Header -->
    <div class="page-header px-6 py-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold">Product Marketplace</h1>
        <p class="text-primary-100 mt-2">Browse and purchase quality agricultural products</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Filters Section -->
      <div class="card p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Filter Products</h2>
          <button
            @click="clearFilters"
            class="text-sm text-primary-600 hover:text-primary-800"
          >
            Clear Filters
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select v-model="filters.category" class="input-field">
              <option value="">All Categories</option>
              <option v-for="category in productsStore.productCategories" :key="category.id" :value="category.id">
                {{ category.icon }} {{ category.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quality</label>
            <select v-model="filters.quality" class="input-field">
              <option value="">All Qualities</option>
              <option value="A">Grade A - Premium</option>
              <option value="B">Grade B - Standard</option>
              <option value="C">Grade C - Basic</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Max Price (TZS)</label>
            <input
              v-model="maxPrice"
              type="number"
              placeholder="Max price"
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              v-model="filters.location"
              type="text"
              placeholder="Search location"
              class="input-field"
            />
          </div>
        </div>

        <div class="mt-4 flex items-center space-x-4">
          <label class="flex items-center">
            <input
              v-model="filters.available"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-700">Available only</span>
          </label>
          <label class="flex items-center">
            <input
              v-model="filters.certified"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-700">Certified products</span>
          </label>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="flex justify-between items-center mb-6">
        <p class="text-gray-600">
          Showing <span class="font-medium">{{ filteredProducts.length }}</span> products
        </p>
        <div class="flex items-center space-x-4">
          <label class="text-sm text-gray-700">Sort by:</label>
          <select v-model="sortBy" class="input-field text-sm">
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in sortedProducts"
          :key="product.id"
          class="card overflow-hidden hover:shadow-lg transition-shadow group"
        >
          <!-- Product Image -->
          <div class="aspect-w-16 aspect-h-9 bg-gray-200 relative">
            <img
              :src="`https://picsum.photos/seed/${product.id}/400/300.jpg`"
              :alt="product.name"
              class="w-full h-48 object-cover"
            />
            <div class="absolute top-2 right-2">
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ product.available ? 'Available' : 'Sold Out' }}
              </span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-gray-900 group-hover:text-primary-600">
                {{ product.name }}
              </h3>
              <div class="flex items-center">
                <Star class="w-4 h-4 text-yellow-400 fill-current" />
                <span class="text-sm text-gray-600 ml-1">{{ product.rating }}</span>
              </div>
            </div>

            <p class="text-sm text-gray-600 mb-2">{{ product.description }}</p>

            <div class="flex items-center text-sm text-gray-500 mb-2">
              <MapPin class="w-4 h-4 mr-1" />
              {{ product.location }}
            </div>

            <div class="flex items-center text-sm text-gray-500 mb-3">
              <User class="w-4 h-4 mr-1" />
              {{ product.farmerName }}
            </div>

            <!-- Certifications -->
            <div v-if="product.certifications.length > 0" class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="cert in product.certifications"
                :key="cert"
                class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
              >
                {{ getCertificationName(cert) }}
              </span>
            </div>

            <!-- Price and Quantity -->
            <div class="flex justify-between items-center mb-3">
              <div>
                <p class="text-lg font-bold text-gray-900">
                  TZS {{ product.price.toLocaleString() }}
                </p>
                <p class="text-xs text-gray-500">per {{ product.unit }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-600">{{ product.quantity }} {{ product.unit }}</p>
                <p class="text-xs text-gray-500">available</p>
              </div>
            </div>

            <!-- Quality Badge -->
            <div class="mb-3">
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="getQualityColor(product.quality)"
              >
                {{ getQualityGrade(product.quality) }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-2">
              <button
                @click="viewProduct(product)"
                class="w-full btn-primary text-sm py-2"
                :disabled="!product.available"
              >
                {{ product.available ? 'View Details' : 'Out of Stock' }}
              </button>
              <button
                v-if="authStore.isBuyer && product.available"
                @click="addToCart(product)"
                class="w-full btn-secondary text-sm py-2"
              >
                <ShoppingCart class="w-4 h-4 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-600">Try adjusting your filters or search terms</p>
      </div>
    </div>

    <!-- Product Details Modal -->
    <div
      v-if="showProductModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-10 mx-auto p-5 border max-w-4xl shadow-lg rounded-lg bg-white">
        <div v-if="selectedProduct" class="mt-3">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-gray-900">{{ selectedProduct.name }}</h3>
            <button
              @click="showProductModal = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <X class="w-6 h-6" />
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Product Image -->
            <div>
              <img
                :src="`https://picsum.photos/seed/${selectedProduct.id}/600/400.jpg`"
                :alt="selectedProduct.name"
                class="w-full rounded-lg"
              />
            </div>

            <!-- Product Details -->
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Description</h4>
                <p class="text-gray-600">{{ selectedProduct.description }}</p>
              </div>

              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Product Information</h4>
                <dl class="space-y-2">
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-600">Category:</dt>
                    <dd class="text-sm font-medium">{{ getCategoryName(selectedProduct.category) }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-600">Quality Grade:</dt>
                    <dd class="text-sm font-medium">{{ getQualityGrade(selectedProduct.quality) }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-600">Available Quantity:</dt>
                    <dd class="text-sm font-medium">{{ selectedProduct.quantity }} {{ selectedProduct.unit }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-600">Harvest Date:</dt>
                    <dd class="text-sm font-medium">{{ formatDate(selectedProduct.harvestDate) }}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Farmer Information</h4>
                <div class="bg-gray-50 p-3 rounded-lg">
                  <p class="font-medium">{{ selectedProduct.farmerName }}</p>
                  <p class="text-sm text-gray-600">{{ selectedProduct.location }}</p>
                  <div class="flex items-center mt-1">
                    <Star class="w-4 h-4 text-yellow-400 fill-current" />
                    <span class="text-sm text-gray-600 ml-1">{{ selectedProduct.rating }} ({{ selectedProduct.reviews }} reviews)</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-gray-900 mb-2">Certifications</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="cert in selectedProduct.certifications"
                    :key="cert"
                    class="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full"
                  >
                    🌱 {{ getCertificationName(cert) }}
                  </span>
                </div>
              </div>

              <div class="border-t pt-4">
                <div class="flex justify-between items-center mb-4">
                  <div>
                    <p class="text-2xl font-bold text-gray-900">
                      TZS {{ selectedProduct.price.toLocaleString() }}
                    </p>
                    <p class="text-sm text-gray-500">per {{ selectedProduct.unit }}</p>
                  </div>
                </div>

                <div class="flex space-x-3">
                  <button
                    v-if="authStore.isBuyer && selectedProduct.available"
                    @click="addToCart(selectedProduct)"
                    class="flex-1 btn-primary"
                  >
                    <ShoppingCart class="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    @click="contactFarmer(selectedProduct)"
                    class="flex-1 btn-secondary"
                  >
                    <Mail class="w-4 h-4 mr-2" />
                    Contact Farmer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProductsStore } from '@/stores/products'
import {
  Search,
  Star,
  MapPin,
  User,
  ShoppingCart,
  X,
  Mail
} from 'lucide-vue-next'

const authStore = useAuthStore()
const productsStore = useProductsStore()

const searchQuery = ref('')
const maxPrice = ref('')
const sortBy = ref('name')
const showProductModal = ref(false)
const selectedProduct = ref(null)

const filters = ref({
  category: '',
  quality: '',
  location: '',
  available: true,
  certified: false
})

const filteredProducts = computed(() => {
  let products = productsStore.getFilteredProducts()

  // Apply search query
  if (searchQuery.value) {
    products = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Apply max price
  if (maxPrice.value) {
    products = products.filter(product => product.price <= parseInt(maxPrice.value))
  }

  // Apply certified filter
  if (filters.value.certified) {
    products = products.filter(product => product.certifications.length > 0)
  }

  return products
})

const sortedProducts = computed(() => {
  const products = [...filteredProducts.value]
  
  switch (sortBy.value) {
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name))
    case 'price-low':
      return products.sort((a, b) => a.price - b.price)
    case 'price-high':
      return products.sort((a, b) => b.price - a.price)
    case 'rating':
      return products.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return products.sort((a, b) => new Date(b.harvestDate) - new Date(a.harvestDate))
    default:
      return products
  }
})

// Watch for filter changes
watch(filters, () => {
  productsStore.setFilters(filters.value)
}, { deep: true })

const getCategoryName = (categoryId) => {
  const category = productsStore.productCategories.find(cat => cat.id === categoryId)
  return category ? category.name : categoryId
}

const getQualityGrade = (quality) => {
  const grade = productsStore.qualityGrades.find(g => g.quality === quality)
  return grade ? grade.grade : quality
}

const getQualityColor = (quality) => {
  switch (quality) {
    case 'A': return 'bg-green-100 text-green-800'
    case 'B': return 'bg-blue-100 text-blue-800'
    case 'C': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getCertificationName = (certId) => {
  const cert = productsStore.certifications.find(c => c.id === certId)
  return cert ? cert.name : certId
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const clearFilters = () => {
  searchQuery.value = ''
  maxPrice.value = ''
  filters.value = {
    category: '',
    quality: '',
    location: '',
    available: true,
    certified: false
  }
  productsStore.clearFilters()
}

const viewProduct = (product) => {
  selectedProduct.value = product
  showProductModal.value = true
}

const addToCart = (product) => {
  // Implementation for adding to cart
  window.addNotification({
    type: 'success',
    title: 'Added to Cart',
    message: `${product.name} has been added to your cart.`
  })
  showProductModal.value = false
}

const contactFarmer = (product) => {
  // Implementation for contacting farmer
  window.addNotification({
    type: 'info',
    title: 'Contact Farmer',
    message: `Message sent to ${product.farmerName}.`
  })
}
</script>

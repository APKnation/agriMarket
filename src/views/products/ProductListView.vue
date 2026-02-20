<template>
  <div class="min-h-screen bg-earth-50">
    <!-- Page Header -->
    <div class="page-header px-6 py-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold">Products Marketplace</h1>
        <p class="text-primary-100 mt-2">Browse quality agricultural products from Tanzanian farmers</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Filters Section -->
      <div class="card p-6 mb-8">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Category:</label>
            <select v-model="selectedCategory" class="input-field">
              <option value="">All Categories</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="legumes">Legumes</option>
            </select>
          </div>
          
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Sort by:</label>
            <select v-model="sortBy" class="input-field">
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Price Range:</label>
            <select v-model="priceRange" class="input-field">
              <option value="">All Prices</option>
              <option value="0-1000">TZS 0 - 1,000</option>
              <option value="1000-5000">TZS 1,000 - 5,000</option>
              <option value="5000+">TZS 5,000+</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <div class="card p-8 max-w-md mx-auto">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package class="w-12 h-12 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
          <p class="text-gray-600 mb-4">Try adjusting your filters or check back later.</p>
          <button class="btn-primary">Clear Filters</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '@/components/common/ProductCard.vue'

// Sample product data
const sampleProducts = ref([
  {
    id: 1,
    name: 'Fresh Maize Kernels',
    description: 'High quality maize kernels harvested from the fertile highlands of Arusha region. Perfect for making ugali and traditional dishes.',
    price: 2500,
    category: 'grains',
    status: 'available',
    rating: 4.5,
    location: 'Arusha, Tanzania',
    quantity: '500 kg available',
    unit: 'kg',
    image: '/images/products/maize.jpg'
  },
  {
    id: 2,
    name: 'Organic Tomatoes',
    description: 'Fresh organic tomatoes grown without pesticides. Rich in vitamins and perfect for salads and cooking.',
    price: 1800,
    category: 'vegetables',
    status: 'available',
    rating: 4.8,
    location: 'Morogoro, Tanzania',
    quantity: '200 kg available',
    unit: 'kg',
    image: '/images/products/tomatoes.jpg'
  },
  {
    id: 3,
    name: 'Premium Rice',
    description: 'Premium quality rice from the Kilimanjaro region. Long grain and excellent cooking quality.',
    price: 3200,
    category: 'grains',
    status: 'sold',
    rating: 4.2,
    location: 'Kilimanjaro, Tanzania',
    quantity: 'Sold out',
    unit: 'kg',
    image: '/images/products/rice.jpg'
  },
  {
    id: 4,
    name: 'Fresh Beans',
    description: 'Locally grown beans rich in protein and essential nutrients. Perfect for traditional Tanzanian cuisine.',
    price: 1500,
    category: 'legumes',
    status: 'available',
    rating: 4.6,
    location: 'Dodoma, Tanzania',
    quantity: '300 kg available',
    unit: 'kg',
    image: '/images/products/beans.jpg'
  },
  {
    id: 5,
    name: 'Sweet Potatoes',
    description: 'Fresh sweet potatoes from the southern highlands. High in vitamin A and dietary fiber.',
    price: 800,
    category: 'vegetables',
    status: 'pending',
    rating: 4.4,
    location: 'Mbeya, Tanzania',
    quantity: 'Pre-order',
    unit: 'kg',
    image: '/images/products/sweet-potatoes.jpg'
  }
])

const selectedCategory = ref('')
const sortBy = ref('name')
const priceRange = ref('')

const filteredProducts = computed(() => {
  let filtered = sampleProducts.value

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
  console.log('Viewing product details:', product)
}

const addToCart = (product) => {
  console.log('Adding to cart:', product)
}

const toggleFavorite = (product) => {
  console.log('Toggling favorite:', product)
}

const contactSeller = (product) => {
  console.log('Contacting seller:', product)
}

onMounted(() => {
  console.log('Products page loaded')
})
</script>

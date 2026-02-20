<template>
  <div class="min-h-screen bg-earth-50">
    <!-- Page Header -->
    <div class="page-header px-6 py-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold">List New Product</h1>
        <p class="text-primary-100 mt-2">Add your harvested products to the marketplace</p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-6 py-8">
      <div class="card">
        <form @submit.prevent="createProduct" class="p-6 space-y-6">
          <!-- Basic Information -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  v-model="productForm.name"
                  type="text"
                  required
                  class="input-field"
                  placeholder="e.g., Fresh Maize Kernels"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select v-model="productForm.category" required class="input-field">
                  <option value="">Select category</option>
                  <option v-for="category in productsStore.productCategories" :key="category.id" :value="category.id">
                    {{ category.icon }} {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                v-model="productForm.description"
                rows="3"
                required
                class="input-field"
                placeholder="Describe your product, quality, and any special characteristics..."
              ></textarea>
            </div>
          </div>

          <!-- Quantity and Pricing -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Quantity & Pricing</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Available Quantity *</label>
                <input
                  v-model="productForm.quantity"
                  type="number"
                  min="1"
                  required
                  class="input-field"
                  placeholder="Amount available"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                <select v-model="productForm.unit" required class="input-field">
                  <option value="">Select unit</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="tons">Tons</option>
                  <option value="bags">Bags</option>
                  <option value="crates">Crates</option>
                  <option value="bunches">Bunches</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Price per Unit (TZS) *</label>
                <input
                  v-model="productForm.price"
                  type="number"
                  min="0"
                  step="100"
                  required
                  class="input-field"
                  placeholder="Price in TZS"
                />
              </div>
            </div>

            <!-- Suggested Price -->
            <div class="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start">
                <Info class="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div class="text-sm text-blue-800">
                  <p class="font-medium mb-1">Market Price Reference</p>
                  <p>Current market price for similar products: TZS {{ suggestedPrice.toLocaleString() }} per {{ productForm.unit || 'kg' }}</p>
                  <p class="text-xs mt-1">This is just a reference. You can set your own competitive price.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quality and Grading -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Quality & Grading</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Quality Grade *</label>
                <select v-model="productForm.quality" required class="input-field">
                  <option value="">Select quality grade</option>
                  <option v-for="grade in productsStore.qualityGrades" :key="grade.quality" :value="grade.quality">
                    {{ grade.grade }} - {{ grade.description }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Harvest Date *</label>
                <input
                  v-model="productForm.harvestDate"
                  type="date"
                  required
                  class="input-field"
                />
              </div>
            </div>

            <!-- Quality Checklist -->
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Quality Characteristics</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label
                  v-for="characteristic in qualityCharacteristics"
                  :key="characteristic"
                  class="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    v-model="productForm.characteristics"
                    :value="characteristic"
                    type="checkbox"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span class="text-sm">{{ characteristic }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Location and Availability -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Location & Availability</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Pickup Location *</label>
                <input
                  v-model="productForm.location"
                  type="text"
                  required
                  class="input-field"
                  placeholder="e.g., Arusha, Tanzania"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Available Until</label>
                <input
                  v-model="productForm.availableUntil"
                  type="date"
                  class="input-field"
                />
                <p class="text-xs text-gray-500 mt-1">Leave empty if available until sold out</p>
              </div>
            </div>

            <div class="mt-4">
              <label class="flex items-center">
                <input
                  v-model="productForm.deliveryAvailable"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span class="ml-2 text-sm text-gray-700">Delivery available within region</span>
              </label>
            </div>
          </div>

          <!-- Certifications -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
            <p class="text-sm text-gray-600 mb-3">Select any certifications your product has:</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label
                v-for="cert in productsStore.certifications"
                :key="cert.id"
                class="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50"
                :class="productForm.certifications.includes(cert.id) ? 'border-primary-500 bg-primary-50' : 'border-gray-300'"
              >
                <input
                  v-model="productForm.certifications"
                  :value="cert.id"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span class="text-sm">{{ cert.icon }} {{ cert.name }}</span>
              </label>
            </div>
          </div>

          <!-- Product Images -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p class="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
              <input
                type="file"
                multiple
                accept="image/*"
                class="hidden"
                @change="handleImageUpload"
              />
              <button
                type="button"
                @click="$event.target.previousElementSibling.click()"
                class="mt-4 btn-secondary"
              >
                Select Images
              </button>
            </div>

            <!-- Image Preview -->
            <div v-if="imagePreviews.length > 0" class="mt-4 grid grid-cols-4 gap-4">
              <div
                v-for="(image, index) in imagePreviews"
                :key="index"
                class="relative group"
              >
                <img :src="image" class="w-full h-24 object-cover rounded-lg" />
                <button
                  type="button"
                  @click="removeImage(index)"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              @click="$router.go(-1)"
              class="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Listing Product...
              </span>
              <span v-else>List Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProductsStore } from '@/stores/products'
import { Info, Upload, X } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const productsStore = useProductsStore()

const isSubmitting = ref(false)
const imagePreviews = ref([])

const productForm = ref({
  name: '',
  category: '',
  description: '',
  quantity: '',
  unit: '',
  price: '',
  quality: '',
  harvestDate: '',
  location: authStore.user?.location || '',
  availableUntil: '',
  deliveryAvailable: false,
  certifications: [],
  characteristics: []
})

const qualityCharacteristics = [
  'Fresh', 'Ripe', 'Clean', 'Uniform Size', 'No Defects', 'Organic',
  'Premium Quality', 'Farm Fresh', 'Naturally Grown', 'Hand Picked'
]

const suggestedPrice = computed(() => {
  // Mock calculation based on category and quality
  const basePrices = {
    grains: 1500,
    vegetables: 2500,
    fruits: 3500,
    legumes: 3000,
    processed: 5000,
    spices: 8000
  }
  
  const qualityMultipliers = {
    A: 1.5,
    B: 1.0,
    C: 0.7
  }
  
  const basePrice = basePrices[productForm.value.category] || 2000
  const multiplier = qualityMultipliers[productForm.value.quality] || 1.0
  
  return Math.round(basePrice * multiplier)
})

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  
  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  })
}

const removeImage = (index) => {
  imagePreviews.value.splice(index, 1)
}

const createProduct = async () => {
  isSubmitting.value = true
  
  try {
    const productData = {
      ...productForm.value,
      farmerId: authStore.user.id,
      farmerName: authStore.user.name,
      images: imagePreviews.value,
      rating: 0,
      reviews: 0,
      available: true
    }
    
    const newProduct = productsStore.addProduct(productData)
    
    window.addNotification({
      type: 'success',
      title: 'Product Listed',
      message: `${productForm.value.name} has been successfully listed on the marketplace.`
    })
    
    router.push('/products')
  } catch (error) {
    window.addNotification({
      type: 'error',
      title: 'Listing Failed',
      message: 'Failed to list product. Please try again.'
    })
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // Set default harvest date to today
  productForm.value.harvestDate = new Date().toISOString().split('T')[0]
})
</script>

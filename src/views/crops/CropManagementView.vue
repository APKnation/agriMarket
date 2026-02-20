<template>
  <div class="min-h-screen bg-earth-50">
    <!-- Page Header -->
    <div class="page-header px-6 py-8">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Crop Management</h1>
          <p class="text-primary-100 mt-2">Track and manage your crop production</p>
        </div>
        <button
          @click="showAddModal = true"
          class="btn-primary"
        >
          <Plus class="w-4 h-4 mr-2" />
          Add Crop
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Climate Smart Recommendations -->
      <div class="card p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">🌍 Climate-Smart Recommendations</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="recommendation in cropsStore.climateSmartRecommendations"
            :key="recommendation.crop"
            class="border rounded-lg p-4"
          >
            <h3 class="font-medium text-gray-900">{{ recommendation.crop }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ recommendation.reason }}</p>
            <p class="text-xs text-primary-600 mt-2">Best for: {{ recommendation.regions.join(', ') }}</p>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="card p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search crops..."
                class="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select v-model="categoryFilter" class="input-field">
              <option value="">All Categories</option>
              <option v-for="category in cropsStore.cropCategories" :key="category.id" :value="category.id">
                {{ category.icon }} {{ category.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="statusFilter" class="input-field">
              <option value="">All Status</option>
              <option value="planted">Planted</option>
              <option value="growing">Growing</option>
              <option value="harvested">Harvested</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Health</label>
            <select v-model="healthFilter" class="input-field">
              <option value="">All Health</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Crops Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="crop in filteredCrops"
          :key="crop.id"
          class="card overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ crop.name }}</h3>
                <span class="text-sm text-gray-500">{{ getCategoryName(crop.category) }}</span>
              </div>
              <div class="flex space-x-1">
                <button
                  @click="editCrop(crop)"
                  class="p-1 text-accent-600 hover:text-accent-800"
                >
                  <Edit class="w-4 h-4" />
                </button>
                <button
                  @click="deleteCrop(crop.id)"
                  class="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Planted:</span>
                <span class="font-medium">{{ formatDate(crop.plantingDate) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Expected Harvest:</span>
                <span class="font-medium">{{ formatDate(crop.expectedHarvest) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Expected Yield:</span>
                <span class="font-medium">{{ crop.expectedYield }} kg</span>
              </div>
              <div v-if="crop.actualYield" class="flex justify-between text-sm">
                <span class="text-gray-600">Actual Yield:</span>
                <span class="font-medium text-green-600">{{ crop.actualYield }} kg</span>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="getStatusColor(crop.status)"
              >
                {{ crop.status }}
              </span>
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="getHealthColor(crop.health)"
              >
                {{ crop.health }}
              </span>
            </div>

            <div v-if="crop.climateSmart" class="mt-3 flex items-center text-green-600 text-sm">
              <Leaf class="w-4 h-4 mr-1" />
              Climate Smart
            </div>

            <div class="mt-4 space-y-2">
              <button
                v-if="crop.status === 'growing'"
                @click="openHealthModal(crop)"
                class="w-full btn-secondary text-sm py-2"
              >
                Update Health
              </button>
              <button
                v-if="crop.status === 'growing'"
                @click="openHarvestModal(crop)"
                class="w-full btn-primary text-sm py-2"
              >
                Record Harvest
              </button>
              <button
                @click="viewCropDetails(crop)"
                class="w-full text-sm text-primary-600 hover:text-primary-800 py-2"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Crop Modal -->
      <div
        v-if="showAddModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ editingCrop ? 'Edit Crop' : 'Add New Crop' }}
            </h3>
            <form @submit.prevent="saveCrop" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                <input
                  v-model="cropForm.name"
                  type="text"
                  required
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select v-model="cropForm.category" required class="input-field">
                  <option value="">Select category</option>
                  <option v-for="category in cropsStore.cropCategories" :key="category.id" :value="category.id">
                    {{ category.icon }} {{ category.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                <input
                  v-model="cropForm.plantingDate"
                  type="date"
                  required
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Expected Harvest Date</label>
                <input
                  v-model="cropForm.expectedHarvest"
                  type="date"
                  required
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Expected Yield (kg)</label>
                <input
                  v-model="cropForm.expectedYield"
                  type="number"
                  required
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  v-model="cropForm.location"
                  type="text"
                  required
                  class="input-field"
                />
              </div>
              <div class="flex items-center">
                <input
                  v-model="cropForm.climateSmart"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-700">
                  Climate Smart Crop
                </label>
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="closeCropModal"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn-primary"
                >
                  {{ editingCrop ? 'Update' : 'Add' }} Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Health Update Modal -->
      <div
        v-if="showHealthModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Update Crop Health</h3>
            <form @submit.prevent="updateCropHealth" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                <select v-model="healthForm.health" required class="input-field">
                  <option value="">Select health status</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  v-model="healthForm.notes"
                  rows="3"
                  class="input-field"
                  placeholder="Add any observations or notes..."
                ></textarea>
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showHealthModal = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button type="submit" class="btn-primary">Update Health</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Harvest Modal -->
      <div
        v-if="showHarvestModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Record Harvest</h3>
            <form @submit.prevent="recordHarvest" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Actual Yield (kg)</label>
                <input
                  v-model="harvestForm.actualYield"
                  type="number"
                  required
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Harvest Date</label>
                <input
                  v-model="harvestForm.harvestDate"
                  type="date"
                  required
                  class="input-field"
                />
              </div>
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="showHarvestModal = false"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button type="submit" class="btn-primary">Record Harvest</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCropsStore } from '@/stores/crops'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Leaf
} from 'lucide-vue-next'

const authStore = useAuthStore()
const cropsStore = useCropsStore()

const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')
const healthFilter = ref('')

const showAddModal = ref(false)
const showHealthModal = ref(false)
const showHarvestModal = ref(false)

const editingCrop = ref(null)
const currentCrop = ref(null)

const cropForm = ref({
  name: '',
  category: '',
  plantingDate: '',
  expectedHarvest: '',
  expectedYield: '',
  location: '',
  climateSmart: false
})

const healthForm = ref({
  health: '',
  notes: ''
})

const harvestForm = ref({
  actualYield: '',
  harvestDate: ''
})

const filteredCrops = computed(() => {
  let crops = cropsStore.getCrops()

  // Filter by farmer if not admin/cooperative
  if (authStore.isFarmer) {
    crops = crops.filter(crop => crop.farmerId === authStore.user.id)
  }

  // Search filter
  if (searchQuery.value) {
    crops = crops.filter(crop =>
      crop.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Category filter
  if (categoryFilter.value) {
    crops = crops.filter(crop => crop.category === categoryFilter.value)
  }

  // Status filter
  if (statusFilter.value) {
    crops = crops.filter(crop => crop.status === statusFilter.value)
  }

  // Health filter
  if (healthFilter.value) {
    crops = crops.filter(crop => crop.health === healthFilter.value)
  }

  return crops
})

const getCategoryName = (categoryId) => {
  const category = cropsStore.cropCategories.find(cat => cat.id === categoryId)
  return category ? category.name : categoryId
}

const getStatusColor = (status) => {
  switch (status) {
    case 'planted': return 'bg-yellow-100 text-yellow-800'
    case 'growing': return 'bg-green-100 text-green-800'
    case 'harvested': return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getHealthColor = (health) => {
  switch (health) {
    case 'excellent': return 'bg-green-100 text-green-800'
    case 'good': return 'bg-blue-100 text-blue-800'
    case 'fair': return 'bg-yellow-100 text-yellow-800'
    case 'poor': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const editCrop = (crop) => {
  editingCrop.value = crop
  cropForm.value = { ...crop }
  showAddModal.value = true
}

const saveCrop = () => {
  console.log('saveCrop called', cropForm.value)
  console.log('cropsStore:', cropsStore)
  console.log('authStore.user:', authStore.user)
  
  const cropData = {
    ...cropForm.value,
    farmerId: authStore.user.id
  }

  if (editingCrop.value) {
    console.log('Updating crop')
    cropsStore.updateCrop(editingCrop.value.id, cropData)
  } else {
    console.log('Adding new crop')
    cropsStore.addCrop(cropData)
  }
  
  closeCropModal()
  
  // Show success notification
  window.addNotification({
    type: 'success',
    title: 'Crop Saved',
    message: `Crop has been successfully ${editingCrop.value ? 'updated' : 'added'}.`
  })
}

const deleteCrop = (id) => {
  if (confirm('Are you sure you want to delete this crop?')) {
    // Implementation would go here
    window.addNotification({
      type: 'success',
      title: 'Crop Deleted',
      message: 'Crop has been removed from the system.'
    })
  }
}

const openHealthModal = (crop) => {
  currentCrop.value = crop
  healthForm.value = {
    health: crop.health,
    notes: crop.notes || ''
  }
  showHealthModal.value = true
}

const updateCropHealth = () => {
  cropsStore.updateCropHealth(currentCrop.value.id, healthForm.value.health, healthForm.value.notes)
  showHealthModal.value = false
  window.addNotification({
    type: 'success',
    title: 'Health Updated',
    message: 'Crop health status has been updated.'
  })
}

const openHarvestModal = (crop) => {
  currentCrop.value = crop
  harvestForm.value = {
    actualYield: '',
    harvestDate: new Date().toISOString().split('T')[0]
  }
  showHarvestModal.value = true
}

const recordHarvest = () => {
  cropsStore.harvestCrop(currentCrop.value.id, harvestForm.value.actualYield, harvestForm.value.harvestDate)
  showHarvestModal.value = false
  window.addNotification({
    type: 'success',
    title: 'Harvest Recorded',
    message: 'Harvest has been recorded successfully.'
  })
}

const viewCropDetails = (crop) => {
  // Implementation for detailed view
  console.log('View crop details:', crop)
}

const closeCropModal = () => {
  showAddModal.value = false
  editingCrop.value = null
  cropForm.value = {
    name: '',
    category: '',
    plantingDate: '',
    expectedHarvest: '',
    expectedYield: '',
    location: '',
    climateSmart: false
  }
}

onMounted(() => {
  // Initialize crops data
})
</script>

<template>
  <div class="min-h-screen bg-earth-50">
    <div v-if="farmer" class="max-w-7xl mx-auto px-6 py-8">
      <!-- Back Button -->
      <button @click="$router.go(-1)" class="flex items-center text-primary-600 hover:text-primary-800 mb-6">
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back to Farmers
      </button>

      <!-- Farmer Header -->
      <div class="card p-6 mb-6">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-xl">{{ getInitials(farmer.name) }}</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ farmer.name }}</h1>
              <p class="text-gray-600">Farmer ID: #{{ farmer.id }}</p>
              <div class="flex items-center space-x-4 mt-2">
                <span class="text-sm text-gray-500">{{ farmer.location }}</span>
                <span class="text-sm text-gray-500">{{ farmer.phone }}</span>
                <span
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  :class="farmer.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                >
                  {{ farmer.verified ? 'Verified' : 'Pending Verification' }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex space-x-2 mt-4 md:mt-0">
            <button @click="editMode = !editMode" class="btn-secondary">
              <Edit class="w-4 h-4 mr-2" />
              {{ editMode ? 'Cancel' : 'Edit' }}
            </button>
            <button
              v-if="!farmer.verified"
              @click="verifyFarmer"
              class="btn-primary"
            >
              <CheckCircle class="w-4 h-4 mr-2" />
              Verify Farmer
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div class="card p-6 text-center">
          <p class="text-sm font-medium text-gray-600">Farm Size</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ farmer.farmSize }} ha</p>
        </div>
        <div class="card p-6 text-center">
          <p class="text-sm font-medium text-gray-600">Total Yield</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ farmer.totalYield }} kg</p>
        </div>
        <div class="card p-6 text-center">
          <p class="text-sm font-medium text-gray-600">Rating</p>
          <div class="flex items-center justify-center mt-1">
            <Star class="w-5 h-5 text-yellow-400 fill-current" />
            <span class="text-2xl font-bold text-gray-900 ml-1">{{ farmer.rating }}</span>
          </div>
        </div>
        <div class="card p-6 text-center">
          <p class="text-sm font-medium text-gray-600">Member Since</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatDate(farmer.registrationDate) }}</p>
        </div>
      </div>

      <!-- Edit Form -->
      <div v-if="editMode" class="card p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Edit Farmer Information</h2>
        <form @submit.prevent="updateFarmer" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input v-model="editForm.name" type="text" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="editForm.email" type="email" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input v-model="editForm.phone" type="tel" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input v-model="editForm.location" type="text" class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Farm Size (ha)</label>
            <input v-model="editForm.farmSize" type="number" step="0.1" class="input-field" />
          </div>
          <div class="flex items-end">
            <button type="submit" class="btn-primary w-full">Save Changes</button>
          </div>
        </form>
      </div>

      <!-- Crops and Products Tabs -->
      <div class="card">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-6">
            <button
              @click="activeTab = 'crops'"
              class="py-4 px-1 border-b-2 font-medium text-sm"
              :class="activeTab === 'crops' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
            >
              Crops ({{ farmerCrops.length }})
            </button>
            <button
              @click="activeTab = 'products'"
              class="py-4 px-1 border-b-2 font-medium text-sm"
              :class="activeTab === 'products' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
            >
              Products ({{ farmerProducts.length }})
            </button>
          </nav>
        </div>

        <div class="p-6">
          <div v-if="activeTab === 'crops'">
            <div class="space-y-4">
              <div v-for="crop in farmerCrops" :key="crop.id" class="border rounded-lg p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium text-gray-900">{{ crop.name }}</h3>
                    <p class="text-sm text-gray-600">Planted: {{ formatDate(crop.plantingDate) }}</p>
                    <p class="text-sm text-gray-600">Expected: {{ formatDate(crop.expectedHarvest) }}</p>
                    <p class="text-sm text-gray-600">Status: {{ crop.status }}</p>
                  </div>
                  <span
                    class="px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusColor(crop.status)"
                  >
                    {{ crop.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'products'">
            <div class="space-y-4">
              <div v-for="product in farmerProducts" :key="product.id" class="border rounded-lg p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
                    <p class="text-sm text-gray-600">{{ product.quantity }} {{ product.unit }} @ TZS {{ product.price }}</p>
                    <p class="text-sm text-gray-600">Quality: {{ product.quality }} Grade</p>
                  </div>
                  <span
                    class="px-2 py-1 text-xs font-semibold rounded-full"
                    :class="product.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ product.available ? 'Available' : 'Sold Out' }}
                  </span>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFarmersStore } from '@/stores/farmers'
import { useCropsStore } from '@/stores/crops'
import { useProductsStore } from '@/stores/products'
import { ArrowLeft, Edit, CheckCircle, Star } from 'lucide-vue-next'

const route = useRoute()
const farmersStore = useFarmersStore()
const cropsStore = useCropsStore()
const productsStore = useProductsStore()

const farmer = ref(null)
const editMode = ref(false)
const activeTab = ref('crops')

const editForm = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  farmSize: ''
})

const farmerCrops = computed(() => {
  if (!farmer.value) return []
  return cropsStore.getCropsByFarmer(farmer.value.id)
})

const farmerProducts = computed(() => {
  if (!farmer.value) return []
  return productsStore.getProductsByFarmer(farmer.value.id)
})

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const getStatusColor = (status) => {
  switch (status) {
    case 'growing': return 'bg-green-100 text-green-800'
    case 'harvested': return 'bg-blue-100 text-blue-800'
    case 'planted': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const verifyFarmer = () => {
  farmersStore.verifyFarmer(farmer.value.id)
  farmer.value.verified = true
  window.addNotification({
    type: 'success',
    title: 'Farmer Verified',
    message: `${farmer.value.name} has been verified.`
  })
}

const updateFarmer = () => {
  farmersStore.updateFarmer(farmer.value.id, editForm.value)
  farmer.value = { ...farmer.value, ...editForm.value }
  editMode.value = false
  window.addNotification({
    type: 'success',
    title: 'Farmer Updated',
    message: 'Farmer information has been updated.'
  })
}

onMounted(() => {
  const farmerId = route.params.id
  farmer.value = farmersStore.getFarmerById(farmerId)
  if (farmer.value) {
    editForm.value = { ...farmer.value }
  }
})
</script>

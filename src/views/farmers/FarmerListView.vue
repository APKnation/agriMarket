<template>
  <div class="min-h-screen bg-earth-50">
    <!-- Page Header -->
    <div class="page-header px-6 py-8">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Farmers</h1>
          <p class="text-primary-100 mt-2">Manage and monitor registered farmers</p>
        </div>
        <button
          @click="showAddModal = true"
          class="btn-primary"
        >
          <Plus class="w-4 h-4 mr-2" />
          Add Farmer
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
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
                placeholder="Search farmers..."
                class="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="statusFilter" class="input-field">
              <option value="">All Status</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select v-model="locationFilter" class="input-field">
              <option value="">All Locations</option>
              <option v-for="location in uniqueLocations" :key="location" :value="location">
                {{ location }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Farm Size</label>
            <select v-model="sizeFilter" class="input-field">
              <option value="">All Sizes</option>
              <option value="small">Small (1-3 ha)</option>
              <option value="medium">Medium (4-7 ha)</option>
              <option value="large">Large (8+ ha)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Farmers Table -->
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farmer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farm Size
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="farmer in filteredFarmers"
                :key="farmer.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                      <span class="text-white font-medium">{{ getInitials(farmer.name) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ farmer.name }}</div>
                      <div class="text-sm text-gray-500">ID: #{{ farmer.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ farmer.email }}</div>
                  <div class="text-sm text-gray-500">{{ farmer.phone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ farmer.location }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ farmer.farmSize }} ha
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="farmer.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                  >
                    {{ farmer.verified ? 'Verified' : 'Pending' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <Star class="w-4 h-4 text-yellow-400 fill-current" />
                    <span class="ml-1 text-sm text-gray-900">{{ farmer.rating }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <router-link
                      :to="`/farmers/${farmer.id}`"
                      class="text-primary-600 hover:text-primary-900"
                    >
                      <Eye class="w-4 h-4" />
                    </router-link>
                    <button
                      @click="editFarmer(farmer)"
                      class="text-accent-600 hover:text-accent-900"
                    >
                      <Edit class="w-4 h-4" />
                    </button>
                    <button
                      v-if="!farmer.verified"
                      @click="verifyFarmer(farmer.id)"
                      class="text-green-600 hover:text-green-900"
                    >
                      <CheckCircle class="w-4 h-4" />
                    </button>
                    <button
                      @click="deleteFarmer(farmer.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to <span class="font-medium">{{ filteredFarmers.length }}</span> of
            <span class="font-medium">{{ farmersStore.getFarmers().length }}</span> results
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Farmer Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingFarmer ? 'Edit Farmer' : 'Add New Farmer' }}
          </h3>
          <form @submit.prevent="saveFarmer" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                v-model="farmerForm.name"
                type="text"
                required
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="farmerForm.email"
                type="email"
                required
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                v-model="farmerForm.phone"
                type="tel"
                required
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                v-model="farmerForm.location"
                type="text"
                required
                class="input-field"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Farm Size (hectares)</label>
              <input
                v-model="farmerForm.farmSize"
                type="number"
                step="0.1"
                required
                class="input-field"
              />
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn-primary"
              >
                {{ editingFarmer ? 'Update' : 'Add' }} Farmer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFarmersStore } from '@/stores/farmers'
import {
  Plus,
  Search,
  Eye,
  Edit,
  CheckCircle,
  Trash2,
  Star
} from 'lucide-vue-next'

const farmersStore = useFarmersStore()

const searchQuery = ref('')
const statusFilter = ref('')
const locationFilter = ref('')
const sizeFilter = ref('')
const showAddModal = ref(false)
const editingFarmer = ref(null)

const farmerForm = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  farmSize: ''
})

const uniqueLocations = computed(() => {
  const locations = farmersStore.getFarmers().map(farmer => farmer.location)
  return [...new Set(locations)]
})

const filteredFarmers = computed(() => {
  let farmers = farmersStore.getFarmers()

  // Search filter
  if (searchQuery.value) {
    farmers = farmers.filter(farmer =>
      farmer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      farmer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Status filter
  if (statusFilter.value) {
    farmers = farmers.filter(farmer =>
      statusFilter.value === 'verified' ? farmer.verified : !farmer.verified
    )
  }

  // Location filter
  if (locationFilter.value) {
    farmers = farmers.filter(farmer => farmer.location === locationFilter.value)
  }

  // Size filter
  if (sizeFilter.value) {
    farmers = farmers.filter(farmer => {
      if (sizeFilter.value === 'small') return farmer.farmSize <= 3
      if (sizeFilter.value === 'medium') return farmer.farmSize >= 4 && farmer.farmSize <= 7
      if (sizeFilter.value === 'large') return farmer.farmSize >= 8
      return true
    })
  }

  return farmers
})

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const editFarmer = (farmer) => {
  editingFarmer.value = farmer
  farmerForm.value = { ...farmer }
  showAddModal.value = true
}

const saveFarmer = () => {
  if (editingFarmer.value) {
    farmersStore.updateFarmer(editingFarmer.value.id, farmerForm.value)
  } else {
    farmersStore.addFarmer(farmerForm.value)
  }
  closeModal()
}

const verifyFarmer = (id) => {
  farmersStore.verifyFarmer(id)
  window.addNotification({
    type: 'success',
    title: 'Farmer Verified',
    message: 'Farmer has been successfully verified.'
  })
}

const deleteFarmer = (id) => {
  if (confirm('Are you sure you want to delete this farmer?')) {
    farmersStore.deleteFarmer(id)
    window.addNotification({
      type: 'success',
      title: 'Farmer Deleted',
      message: 'Farmer has been removed from the system.'
    })
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingFarmer.value = null
  farmerForm.value = {
    name: '',
    email: '',
    phone: '',
    location: '',
    farmSize: ''
  }
}

onMounted(() => {
  // Initialize farmers data
})
</script>

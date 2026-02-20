import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCropsStore = defineStore('crops', () => {
  const crops = ref([
    {
      id: 1,
      name: 'Maize',
      category: 'grains',
      farmerId: 1,
      plantingDate: '2024-01-15',
      expectedHarvest: '2024-05-15',
      actualHarvest: null,
      expectedYield: 1500,
      actualYield: null,
      status: 'growing',
      health: 'good',
      climateSmart: true,
      notes: 'Planted during rainy season',
      location: 'Arusha, Tanzania'
    },
    {
      id: 2,
      name: 'Beans',
      category: 'legumes',
      farmerId: 1,
      plantingDate: '2024-02-01',
      expectedHarvest: '2024-04-30',
      actualHarvest: '2024-04-28',
      expectedYield: 800,
      actualYield: 750,
      status: 'harvested',
      health: 'excellent',
      climateSmart: true,
      notes: 'Good yield this season',
      location: 'Arusha, Tanzania'
    },
    {
      id: 3,
      name: 'Rice',
      category: 'grains',
      farmerId: 2,
      plantingDate: '2024-01-20',
      expectedHarvest: '2024-06-20',
      actualHarvest: null,
      expectedYield: 2000,
      actualYield: null,
      status: 'growing',
      health: 'good',
      climateSmart: false,
      notes: 'Traditional variety',
      location: 'Morogoro, Tanzania'
    }
  ])

  const cropCategories = ref([
    { id: 'grains', name: 'Grains', icon: '🌾' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'legumes', name: 'Legumes', icon: '🫘' },
    { id: 'tubers', name: 'Tubers', icon: '🥔' },
    { id: 'spices', name: 'Spices', icon: '🌶️' }
  ])

  const climateSmartRecommendations = ref([
    {
      crop: 'Drought-resistant Maize',
      reason: 'Suitable for areas with limited rainfall',
      regions: ['Arusha', 'Dodoma', 'Manyara']
    },
    {
      crop: 'Sorghum',
      reason: 'Thrives in dry conditions',
      regions: ['Dodoma', 'Singida', 'Shinyanga']
    },
    {
      crop: 'Cassava',
      reason: 'Drought tolerant and high yield',
      regions: ['Mwanza', 'Mara', 'Kagera']
    }
  ])

  const isLoading = ref(false)

  const getCrops = () => {
    return crops.value
  }

  const getCropsByFarmer = (farmerId) => {
    return crops.value.filter(crop => crop.farmerId === parseInt(farmerId))
  }

  const getCropById = (id) => {
    return crops.value.find(crop => crop.id === parseInt(id))
  }

  const addCrop = (cropData) => {
    const newCrop = {
      id: Date.now(),
      ...cropData,
      actualHarvest: null,
      actualYield: null,
      status: 'planted',
      health: 'good'
    }
    crops.value.push(newCrop)
    return newCrop
  }

  const updateCrop = (id, updates) => {
    const index = crops.value.findIndex(crop => crop.id === parseInt(id))
    if (index !== -1) {
      crops.value[index] = { ...crops.value[index], ...updates }
      return crops.value[index]
    }
    return null
  }

  const harvestCrop = (id, actualYield, harvestDate) => {
    const crop = getCropById(id)
    if (crop) {
      crop.actualHarvest = harvestDate || new Date().toISOString().split('T')[0]
      crop.actualYield = actualYield
      crop.status = 'harvested'
      return crop
    }
    return null
  }

  const updateCropHealth = (id, health, notes) => {
    const crop = getCropById(id)
    if (crop) {
      crop.health = health
      if (notes) crop.notes = notes
      return crop
    }
    return null
  }

  return {
    crops,
    cropCategories,
    climateSmartRecommendations,
    isLoading,
    getCrops,
    getCropsByFarmer,
    getCropById,
    addCrop,
    updateCrop,
    harvestCrop,
    updateCropHealth
  }
})

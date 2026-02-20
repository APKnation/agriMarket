import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFarmersStore = defineStore('farmers', () => {
  const farmers = ref([
    {
      id: 1,
      name: 'John Mwangi',
      email: 'john@sfmp.com',
      phone: '+255 712 345 678',
      location: 'Arusha, Tanzania',
      farmSize: 5,
      verified: true,
      registrationDate: '2024-01-15',
      crops: ['Maize', 'Beans', 'Tomatoes'],
      totalYield: 2500,
      rating: 4.5
    },
    {
      id: 2,
      name: 'Mary Joseph',
      email: 'mary@sfmp.com',
      phone: '+255 713 456 789',
      location: 'Morogoro, Tanzania',
      farmSize: 8,
      verified: true,
      registrationDate: '2024-02-20',
      crops: ['Rice', 'Vegetables'],
      totalYield: 3200,
      rating: 4.8
    },
    {
      id: 3,
      name: 'David Kimaro',
      email: 'david@sfmp.com',
      phone: '+255 714 567 890',
      location: 'Dodoma, Tanzania',
      farmSize: 3,
      verified: false,
      registrationDate: '2024-03-10',
      crops: ['Sorghum', 'Millet'],
      totalYield: 1200,
      rating: 4.2
    }
  ])

  const currentFarmer = ref(null)
  const isLoading = ref(false)

  const getFarmers = () => {
    return farmers.value
  }

  const getFarmerById = (id) => {
    return farmers.value.find(farmer => farmer.id === parseInt(id))
  }

  const addFarmer = (farmerData) => {
    const newFarmer = {
      id: Date.now(),
      ...farmerData,
      verified: false,
      registrationDate: new Date().toISOString().split('T')[0],
      crops: [],
      totalYield: 0,
      rating: 0
    }
    farmers.value.push(newFarmer)
    return newFarmer
  }

  const updateFarmer = (id, updates) => {
    const index = farmers.value.findIndex(farmer => farmer.id === parseInt(id))
    if (index !== -1) {
      farmers.value[index] = { ...farmers.value[index], ...updates }
      return farmers.value[index]
    }
    return null
  }

  const verifyFarmer = (id) => {
    const farmer = getFarmerById(id)
    if (farmer) {
      farmer.verified = true
      return farmer
    }
    return null
  }

  const deleteFarmer = (id) => {
    const index = farmers.value.findIndex(farmer => farmer.id === parseInt(id))
    if (index !== -1) {
      farmers.value.splice(index, 1)
      return true
    }
    return false
  }

  return {
    farmers,
    currentFarmer,
    isLoading,
    getFarmers,
    getFarmerById,
    addFarmer,
    updateFarmer,
    verifyFarmer,
    deleteFarmer
  }
})

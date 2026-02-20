import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([
    {
      id: 1,
      name: 'Fresh Maize Kernels',
      category: 'grains',
      farmerId: 1,
      farmerName: 'John Mwangi',
      quantity: 500,
      unit: 'kg',
      price: 1500,
      currency: 'TZS',
      quality: 'A',
      grade: 'Premium',
      available: true,
      harvestDate: '2024-04-28',
      location: 'Arusha, Tanzania',
      description: 'High quality maize kernels, freshly harvested',
      images: ['maize1.jpg', 'maize2.jpg'],
      certifications: ['organic', 'climate-smart'],
      rating: 4.5,
      reviews: 12
    },
    {
      id: 2,
      name: 'Organic Beans',
      category: 'legumes',
      farmerId: 1,
      farmerName: 'John Mwangi',
      quantity: 300,
      unit: 'kg',
      price: 3500,
      currency: 'TZS',
      quality: 'A',
      grade: 'Premium',
      available: true,
      harvestDate: '2024-04-28',
      location: 'Arusha, Tanzania',
      description: 'Certified organic beans, perfect for cooking',
      images: ['beans1.jpg'],
      certifications: ['organic'],
      rating: 4.8,
      reviews: 8
    },
    {
      id: 3,
      name: 'Fresh Tomatoes',
      category: 'vegetables',
      farmerId: 2,
      farmerName: 'Mary Joseph',
      quantity: 200,
      unit: 'kg',
      price: 2500,
      currency: 'TZS',
      quality: 'B',
      grade: 'Standard',
      available: true,
      harvestDate: '2024-05-01',
      location: 'Morogoro, Tanzania',
      description: 'Fresh, ripe tomatoes from local farm',
      images: ['tomatoes1.jpg'],
      certifications: [],
      rating: 4.2,
      reviews: 5
    }
  ])

  const productCategories = ref([
    { id: 'grains', name: 'Grains', icon: '🌾' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'legumes', name: 'Legumes', icon: '🫘' },
    { id: 'processed', name: 'Processed', icon: '🥫' },
    { id: 'spices', name: 'Spices', icon: '🌶️' }
  ])

  const qualityGrades = ref([
    { grade: 'Premium', quality: 'A', description: 'Highest quality, no defects' },
    { grade: 'Standard', quality: 'B', description: 'Good quality, minor defects' },
    { grade: 'Basic', quality: 'C', description: 'Acceptable quality, some defects' }
  ])

  const certifications = ref([
    { id: 'organic', name: 'Organic Certified', icon: '🌱' },
    { id: 'climate-smart', name: 'Climate Smart', icon: '🌍' },
    { id: 'fair-trade', name: 'Fair Trade', icon: '🤝' },
    { id: 'local', name: 'Local Produce', icon: '🏡' }
  ])

  const isLoading = ref(false)
  const filters = ref({
    category: '',
    priceRange: [0, 10000],
    quality: '',
    location: '',
    available: true
  })

  const getProducts = () => {
    return products.value
  }

  const getProductsByFarmer = (farmerId) => {
    return products.value.filter(product => product.farmerId === parseInt(farmerId))
  }

  const getProductById = (id) => {
    return products.value.find(product => product.id === parseInt(id))
  }

  const getFilteredProducts = () => {
    return products.value.filter(product => {
      if (filters.value.category && product.category !== filters.value.category) return false
      if (filters.value.quality && product.quality !== filters.value.quality) return false
      if (filters.value.location && !product.location.toLowerCase().includes(filters.value.location.toLowerCase())) return false
      if (filters.value.available && !product.available) return false
      if (product.price < filters.value.priceRange[0] || product.price > filters.value.priceRange[1]) return false
      return true
    })
  }

  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      available: true,
      rating: 0,
      reviews: 0
    }
    products.value.push(newProduct)
    return newProduct
  }

  const updateProduct = (id, updates) => {
    const index = products.value.findIndex(product => product.id === parseInt(id))
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updates }
      return products.value[index]
    }
    return null
  }

  const updateProductQuantity = (id, quantity) => {
    const product = getProductById(id)
    if (product) {
      product.quantity = quantity
      if (quantity === 0) {
        product.available = false
      }
      return product
    }
    return null
  }

  const deleteProduct = (id) => {
    const index = products.value.findIndex(product => product.id === parseInt(id))
    if (index !== -1) {
      products.value.splice(index, 1)
      return true
    }
    return false
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {
      category: '',
      priceRange: [0, 10000],
      quality: '',
      location: '',
      available: true
    }
  }

  return {
    products,
    productCategories,
    qualityGrades,
    certifications,
    filters,
    isLoading,
    getProducts,
    getProductsByFarmer,
    getProductById,
    getFilteredProducts,
    addProduct,
    updateProduct,
    updateProductQuantity,
    deleteProduct,
    setFilters,
    clearFilters
  }
})

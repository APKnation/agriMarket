import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role)
  const isFarmer = computed(() => userRole.value === 'farmer')
  const isBuyer = computed(() => userRole.value === 'buyer')
  const isCooperative = computed(() => userRole.value === 'cooperative')
  const isAdmin = computed(() => userRole.value === 'admin')

  const login = async (credentials) => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data based on email
      const mockUsers = {
        'farmer@sfmp.com': { id: 1, name: 'John Mwangi', email: 'farmer@sfmp.com', role: 'farmer', phone: '+255 712 345 678', location: 'Arusha, Tanzania' },
        'buyer@sfmp.com': { id: 2, name: 'Sarah Market', email: 'buyer@sfmp.com', role: 'buyer', phone: '+255 713 456 789', location: 'Dar es Salaam, Tanzania' },
        'cooperative@sfmp.com': { id: 3, name: 'Cooperative Manager', email: 'cooperative@sfmp.com', role: 'cooperative', phone: '+255 714 567 890', location: 'Morogoro, Tanzania' },
        'admin@sfmp.com': { id: 4, name: 'System Admin', email: 'admin@sfmp.com', role: 'admin', phone: '+255 715 678 901', location: 'Dodoma, Tanzania' }
      }
      
      const userData = mockUsers[credentials.email]
      if (userData && credentials.password === 'password') {
        user.value = userData
        token.value = 'mock-jwt-token'
        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(userData))
        return { success: true }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser = {
        id: Date.now(),
        ...userData,
        role: userData.role || 'farmer',
        verified: false
      }
      
      user.value = newUser
      token.value = 'mock-jwt-token'
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(newUser))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser && token.value) {
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    userRole,
    isFarmer,
    isBuyer,
    isCooperative,
    isAdmin,
    login,
    register,
    logout,
    initializeAuth
  }
})

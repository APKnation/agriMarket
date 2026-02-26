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
      
      // Debug logging
      console.log('Login attempt:', credentials.phone, credentials.password)
      
      // Mock user data based on phone number
      const mockUsers = {
        '+255712345678': { id: 1, name: 'John Mwangi', phone: '+255712345678', role: 'farmer', location: 'Arusha, Tanzania' },
        '+255713456789': { id: 2, name: 'Sarah Market', phone: '+255713456789', role: 'buyer', location: 'Dar es Salaam, Tanzania' },
        '+255714567890': { id: 3, name: 'Cooperative Manager', phone: '+255714567890', role: 'cooperative', location: 'Morogoro, Tanzania' },
        'admin': { id: 4, name: 'System Admin', phone: 'admin', role: 'admin', location: 'Dodoma, Tanzania' },
        '+255715678901': { id: 4, name: 'System Admin', phone: '+255715678901', role: 'admin', location: 'Dodoma, Tanzania' },
        'admin@sfmp.temp': { id: 99, name: 'Development Admin', email: 'admin@sfmp.temp', phone: 'admin@sfmp.temp', role: 'admin', location: 'Dar es Salaam, Tanzania' },
        'admin@sfmp.com': { id: 100, name: 'SFMP Admin', email: 'admin@sfmp.com', phone: 'admin@sfmp.com', role: 'admin', location: 'Dar es Salaam, Tanzania' }
      }
      
      console.log('Available users:', Object.keys(mockUsers))
      console.log('Looking for user:', credentials.phone)
      
      const userData = mockUsers[credentials.phone]
      console.log('Found user:', userData)
      
      // Handle temporary admin login with specific password
      const isAdminLogin = (
        (credentials.phone === 'admin@sfmp.temp' && credentials.password === 'admin123') ||
        (credentials.phone === 'admin@sfmp.com' && credentials.password === 'password123') ||
        (credentials.phone === 'admin' && credentials.password === 'admin123')
      )
      
      if ((userData && credentials.password === 'password') || isAdminLogin) {
        // Use the correct admin user based on credentials
        let adminUser = userData
        if (isAdminLogin) {
          if (credentials.phone === 'admin@sfmp.com') {
            adminUser = mockUsers['admin@sfmp.com']
          } else if (credentials.phone === 'admin@sfmp.temp') {
            adminUser = mockUsers['admin@sfmp.temp']
          } else if (credentials.phone === 'admin') {
            adminUser = mockUsers['admin']
          }
        }
        
        user.value = adminUser
        token.value = 'mock-jwt-token'
        localStorage.setItem('token', token.value)
        localStorage.setItem('user', JSON.stringify(adminUser))
        
        // Return success with role-specific redirect path
        const redirectPath = getRoleBasedRedirect(adminUser?.role || 'admin')
        console.log('Login successful, redirecting to:', redirectPath)
        return { success: true, redirectPath }
      } else {
        console.log('Login failed - invalid credentials')
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      console.log('Login error:', error.message)
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const getRoleBasedRedirect = (role) => {
    switch (role) {
      case 'farmer':
        return '/dashboard'
      case 'buyer':
        return '/products'
      case 'cooperative':
        return '/farmers'
      case 'admin':
        return '/analytics'
      default:
        return '/dashboard'
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
      
      // Return success with role-specific redirect path
      const redirectPath = getRoleBasedRedirect(newUser.role)
      return { success: true, redirectPath }
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
    initializeAuth,
    getRoleBasedRedirect
  }
})

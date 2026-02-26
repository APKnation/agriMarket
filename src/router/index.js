import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/farmers',
      name: 'farmers',
      component: () => import('@/views/farmers/FarmerListView.vue'),
      meta: { requiresAuth: true, roles: ['admin', 'cooperative', 'farmer'] }
    },
    {
      path: '/farmers/:id',
      name: 'farmer-detail',
      component: () => import('@/views/farmers/FarmerDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/crops',
      name: 'crops',
      component: () => import('@/views/crops/CropManagementView.vue'),
      meta: { requiresAuth: true, roles: ['farmer', 'admin', 'cooperative'] }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/products/ProductListView.vue'),
      meta: { requiresAuth: true, roles: ['farmer', 'buyer', 'admin', 'cooperative'] }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/products/new',
      name: 'product-create',
      component: () => import('@/views/products/ProductCreateView.vue'),
      meta: { requiresAuth: true, roles: ['farmer', 'cooperative'] }
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/orders/OrderManagementView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('@/views/analytics/AnalyticsView.vue'),
      meta: { requiresAuth: true } // Temporarily removed role restriction for testing
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/settings/SettingsView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
    // Allow access to orders page for all authenticated users
    if (to.path === '/orders' && authStore.isAuthenticated) {
      next()
      return
    }
    
    // Redirect based on user role instead of always to dashboard
    const userRole = authStore.user?.role
    if (userRole === 'admin') {
      next('/analytics')  // Admins go to analytics
    } else if (userRole === 'farmer') {
      next('/dashboard')  // Farmers go to dashboard
    } else if (userRole === 'buyer') {
      next('/products')   // Buyers go to products
    } else if (userRole === 'cooperative') {
      next('/farmers')   // Cooperatives go to farmers
    } else {
      next('/dashboard')  // Default fallback
    }
  } else {
    next()
  }
})

export default router

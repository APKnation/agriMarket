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
      meta: { requiresAuth: true, roles: ['admin', 'cooperative'] }
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
      meta: { requiresAuth: true, roles: ['admin', 'cooperative'] }
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
    next('/dashboard')
  } else {
    next()
  }
})

export default router

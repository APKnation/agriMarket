<template>
  <div id="app" class="min-h-screen bg-earth-50">
    <AppHeader v-if="showNavigation" />
    <main :class="{ 'pt-16': showNavigation }">
      <router-view />
    </main>
    <AppFooter v-if="showFooter" />
    <Notifications />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import Notifications from '@/components/common/Notifications.vue'

const route = useRoute()
const authStore = useAuthStore()

const showNavigation = computed(() => {
  const publicRoutes = ['login', 'register']
  return !publicRoutes.includes(route.name)
})

const showFooter = computed(() => {
  const noFooterRoutes = ['login', 'register']
  return !noFooterRoutes.includes(route.name)
})
</script>

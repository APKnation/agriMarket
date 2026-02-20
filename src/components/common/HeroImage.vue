<template>
  <div class="relative h-96 bg-cover bg-center" :style="`background-image: url('${imageUrl}')`">
    <!-- Overlay for text readability -->
    <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="text-center text-white px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ title }}</h1>
        <p class="text-lg md:text-xl mb-8">{{ subtitle }}</p>
        <button 
          v-if="ctaText"
          @click="$emit('cta-click')"
          class="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          {{ ctaText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  ctaText: {
    type: String,
    default: ''
  }
})

defineEmits(['cta-click'])
</script>

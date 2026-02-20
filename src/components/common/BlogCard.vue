<template>
  <div class="bg-white block max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <!-- Image -->
    <a :href="imageLink" class="block mb-6">
      <img 
        :src="imageSrc" 
        :alt="imageAlt"
        class="w-full h-48 object-cover rounded-lg"
      />
    </a>
    
    <!-- Content -->
    <div>
      <!-- Title -->
      <a :href="titleLink" class="block">
        <h5 class="mt-6 mb-2 text-2xl font-semibold tracking-tight text-gray-900 hover:text-primary-600 transition-colors">
          {{ title }}
        </h5>
      </a>
      
      <!-- Description -->
      <p class="mb-6 text-gray-600 leading-relaxed">
        {{ description }}
      </p>
      
      <!-- Read More Button -->
      <a 
        :href="readMoreLink"
        class="inline-flex items-center text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:text-gray-900 focus:ring-4 focus:ring-gray-300 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-all"
      >
        {{ readMoreText }}
        <svg 
          class="w-4 h-4 ml-1.5 rtl:rotate-180 -mr-0.5 transition-transform" 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke="currentColor" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M19 12H5m14 0-4 4m4-4-4-4"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: 'Card image'
  },
  imageLink: {
    type: String,
    default: '#'
  },
  title: {
    type: String,
    required: true
  },
  titleLink: {
    type: String,
    default: '#'
  },
  description: {
    type: String,
    required: true
  },
  readMoreLink: {
    type: String,
    default: '#'
  },
  readMoreText: {
    type: String,
    default: 'Read more'
  }
})
</script>

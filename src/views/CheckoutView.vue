<template>
  <div class="min-h-screen bg-earth-50">
    <!-- Page Header -->
    <div class="page-header px-4 py-6 md:px-6 md:py-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl md:text-3xl font-bold">Checkout</h1>
        <p class="text-primary-100 mt-2 text-sm md:text-base">Complete your order details</p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <!-- Order Summary -->
        <div class="lg:col-span-2">
          <div class="card p-4 md:p-6 mb-4 md:mb-6">
            <h2 class="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Order Summary</h2>
            <div class="space-y-3 md:space-y-4">
              <div v-for="(item, index) in cart" :key="item.id" class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                <img :src="item.image" :alt="item.name" class="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg mb-3 sm:mb-0" />
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-gray-900 text-sm md:text-base truncate">{{ item.name }}</h3>
                  <p class="text-xs sm:text-sm text-gray-600">{{ item.farmer }}</p>
                  <p class="text-xs sm:text-sm text-gray-600">{{ item.quantity }} {{ item.unit }} × TZS {{ item.price.toLocaleString() }}</p>
                </div>
                <div class="text-right mt-2 sm:mt-0">
                  <p class="font-semibold text-gray-900 text-sm md:text-base">TZS {{ (item.price * item.quantity).toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Delivery Information -->
          <div class="card p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Delivery Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input 
                  v-model="deliveryInfo.name" 
                  type="text" 
                  class="input-field" 
                  placeholder="Enter your full name"
                  :class="{ 'border-red-500': errors.name }"
                  @blur="validateField('name')"
                />
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input 
                  v-model="deliveryInfo.email" 
                  type="email" 
                  class="input-field" 
                  placeholder="your.email@example.com"
                  :class="{ 'border-red-500': errors.email }"
                  @blur="validateField('email')"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input 
                  v-model="deliveryInfo.phone" 
                  type="tel" 
                  class="input-field" 
                  placeholder="+255 XXX XXX XXX"
                  :class="{ 'border-red-500': errors.phone }"
                  @blur="validateField('phone')"
                />
                <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Region *</label>
                <select 
                  v-model="deliveryInfo.region" 
                  class="input-field"
                  :class="{ 'border-red-500': errors.region }"
                  @change="validateField('region')"
                >
                  <option value="">Select Region</option>
                  <option value="arusha">Arusha</option>
                  <option value="dar-es-salaam">Dar es Salaam</option>
                  <option value="dodoma">Dodoma</option>
                  <option value="geita">Geita</option>
                  <option value="iringa">Iringa</option>
                  <option value="kagera">Kagera</option>
                  <option value="katavi">Katavi</option>
                  <option value="kilimanjaro">Kilimanjaro</option>
                  <option value="kigoma">Kigoma</option>
                  <option value="kilosa">Kilosa</option>
                  <option value="kinondoni">Kinondoni</option>
                  <option value="kiteto">Kiteto</option>
                  <option value="kondoa">Kondoa</option>
                  <option value="lindi">Lindi</option>
                  <option value="manyara">Manyara</option>
                  <option value="mara">Mara</option>
                  <option value="mbeya">Mbeya</option>
                  <option value="meatu">Meatu</option>
                  <option value="morogoro">Morogoro</option>
                  <option value="mwanga">Mwanga</option>
                  <option value="mwanza">Mwanza</option>
                  <option value="nachingwea">Nachingwea</option>
                  <option value="njombe">Njombe</option>
                  <option value="norte">Norte</option>
                  <option value="pemba">Pemba</option>
                  <option value="pwani">Pwani</option>
                  <option value="rukwa">Rukwa</option>
                  <option value="ruvuma">Ruvuma</option>
                  <option value="shinyanga">Shinyanga</option>
                  <option value="simiyu">Simiyu</option>
                  <option value="singida">Singida</option>
                  <option value="tabora">Tabora</option>
                  <option value="tanga">Tanga</option>
                  <option value="ukerewe">Ukerewe</option>
                  <option value="unguja">Unguja (Zanzibar)</option>
                </select>
                <p v-if="errors.region" class="text-red-500 text-xs mt-1">{{ errors.region }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">City/District *</label>
                <input 
                  v-model="deliveryInfo.city" 
                  type="text" 
                  class="input-field" 
                  placeholder="Enter city or district name"
                  :class="{ 'border-red-500': errors.city }"
                  @blur="validateField('city')"
                />
                <p v-if="errors.city" class="text-red-500 text-xs mt-1">{{ errors.city }}</p>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label>
                <textarea 
                  v-model="deliveryInfo.address" 
                  class="input-field" 
                  rows="3" 
                  placeholder="Enter your complete delivery address (street, building, landmarks)"
                  :class="{ 'border-red-500': errors.address }"
                  @blur="validateField('address')"
                ></textarea>
                <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="card p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
            <div class="space-y-3">
              <label class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input v-model="paymentMethod" type="radio" value="mobile-money" class="text-primary-600" />
                <div class="flex-1">
                  <p class="font-medium text-gray-900">Mobile Money</p>
                  <p class="text-sm text-gray-600">Tigo Pesa, Airtel Money, Halopesa</p>
                </div>
              </label>
              <label class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input v-model="paymentMethod" type="radio" value="cash-on-delivery" class="text-primary-600" />
                <div class="flex-1">
                  <p class="font-medium text-gray-900">Cash on Delivery</p>
                  <p class="text-sm text-gray-600">Pay when you receive your order</p>
                </div>
              </label>
              <label class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input v-model="paymentMethod" type="radio" value="bank-transfer" class="text-primary-600" />
                <div class="flex-1">
                  <p class="font-medium text-gray-900">Bank Transfer</p>
                  <p class="text-sm text-gray-600">Direct bank transfer</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="card p-6 sticky top-4">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Order Total</h2>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">TZS {{ cartTotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Delivery Fee</span>
                <span class="font-medium">TZS {{ deliveryFee.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Service Fee</span>
                <span class="font-medium">TZS {{ serviceFee.toLocaleString() }}</span>
              </div>
              <div class="border-t pt-3">
                <div class="flex justify-between">
                  <span class="text-lg font-semibold text-gray-900">Total</span>
                  <span class="text-xl font-bold text-green-600">TZS {{ finalTotal.toLocaleString() }}</span>
                </div>
              </div>
            </div>
            <button @click="placeOrder" class="w-full btn-primary mt-6" :disabled="!isFormValid">
              Place Order
            </button>
            <button @click="goBack" class="w-full btn-secondary mt-3">
              Back to Shopping
            </button>
            
            <!-- Debug Test Button -->
            <div class="mt-4 p-3 bg-yellow-100 rounded">
              <p class="text-sm text-gray-700 mb-2">Debug Test:</p>
              <button @click="testNavigation" class="px-4 py-2 bg-yellow-500 text-white rounded text-sm">
                Test Navigation to Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrdersStore } from '@/stores/orders'
import Swal from 'sweetalert2'

const router = useRouter()
const ordersStore = useOrdersStore()

// Get cart from localStorage or use empty array
const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

// Form data
const deliveryInfo = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  region: ''
})

// Form validation errors
const errors = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  region: ''
})

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Phone validation regex (Tanzania format)
const phoneRegex = /^\+255\d{9}$|^0\d{9}$/

// Validate individual field
const validateField = (field) => {
  errors.value[field] = ''
  
  switch (field) {
    case 'name':
      if (!deliveryInfo.value.name.trim()) {
        errors.value.name = 'Full name is required'
      } else if (deliveryInfo.value.name.trim().length < 3) {
        errors.value.name = 'Name must be at least 3 characters'
      }
      break
      
    case 'email':
      if (!deliveryInfo.value.email.trim()) {
        errors.value.email = 'Email address is required'
      } else if (!emailRegex.test(deliveryInfo.value.email)) {
        errors.value.email = 'Please enter a valid email address'
      }
      break
      
    case 'phone':
      if (!deliveryInfo.value.phone.trim()) {
        errors.value.phone = 'Phone number is required'
      } else if (!phoneRegex.test(deliveryInfo.value.phone.replace(/\s/g, ''))) {
        errors.value.phone = 'Please enter a valid Tanzanian phone number (+255 XXX XXX XXX)'
      }
      break
      
    case 'address':
      if (!deliveryInfo.value.address.trim()) {
        errors.value.address = 'Delivery address is required'
      } else if (deliveryInfo.value.address.trim().length < 10) {
        errors.value.address = 'Please enter a complete delivery address'
      }
      break
      
    case 'city':
      if (!deliveryInfo.value.city.trim()) {
        errors.value.city = 'City/District is required'
      }
      break
      
    case 'region':
      if (!deliveryInfo.value.region) {
        errors.value.region = 'Please select a region'
      }
      break
  }
}

// Validate entire form
const validateForm = () => {
  let isValid = true
  
  // Validate all required fields
  Object.keys(deliveryInfo.value).forEach(field => {
    validateField(field)
    if (errors.value[field]) {
      isValid = false
    }
  })
  
  return isValid
}

const paymentMethod = ref('mobile-money')

// Calculate totals
const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

const deliveryFee = computed(() => {
  return cartTotal.value > 10000 ? 0 : 2000 // Free delivery for orders over 10,000 TZS
})

const serviceFee = computed(() => {
  return Math.round(cartTotal.value * 0.02) // 2% service fee
})

const finalTotal = computed(() => {
  return cartTotal.value + deliveryFee.value + serviceFee.value
})

// Form validation
const isFormValid = computed(() => {
  return deliveryInfo.value.name && 
         deliveryInfo.value.email &&
         deliveryInfo.value.phone && 
         deliveryInfo.value.address && 
         deliveryInfo.value.city && 
         deliveryInfo.value.region &&
         paymentMethod.value &&
         Object.values(errors.value).every(error => !error)
})

// Place order function
const placeOrder = () => {
  // Validate entire form first
  if (!validateForm()) {
    // Scroll to first error field
    const firstErrorField = Object.keys(errors.value).find(field => errors.value[field])
    if (firstErrorField) {
      const element = document.querySelector(`[placeholder*="${firstErrorField}"], [value="${deliveryInfo.value[firstErrorField]}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.focus()
      }
    }
    return
  }
  
  const orderData = {
    items: cart.value,
    delivery: deliveryInfo.value,
    payment: paymentMethod.value,
    totals: {
      subtotal: cartTotal.value,
      delivery: deliveryFee.value,
      service: serviceFee.value,
      total: finalTotal.value
    },
    type: 'Purchase Order',
    statusHistory: [
      {
        status: 'pending',
        timestamp: new Date().toISOString(),
        notes: 'Order placed successfully'
      }
    ]
  }
  
  // Use orders store to create order
  const newOrder = ordersStore.createOrder(orderData)
  
  // Clear cart
  localStorage.removeItem('cart')
  cart.value = []
  
  // Show SweetAlert2 success alert
  Swal.fire({
    title: "Order Placed Successfully! 🎉",
    text: `Order #${newOrder.id} has been placed and will be delivered to ${deliveryInfo.value.city}, ${deliveryInfo.value.region}`,
    icon: "success",
    draggable: true,
    showConfirmButton: true,
    confirmButtonText: "View My Orders",
    confirmButtonColor: "#10b981",
    showCancelButton: true,
    cancelButtonText: "Continue Shopping",
    cancelButtonColor: "#6b7280",
    backdrop: `rgba(0,0,123,0.4)`,
    allowOutsideClick: false,
    allowEscapeKey: false
  }).then((result) => {
    console.log('SweetAlert result:', result);
    console.log('result.isConfirmed:', result.isConfirmed);
    console.log('result.isDismissed:', result.isDismissed);
    
    if (result.isConfirmed) {
      // Navigate to orders page
      console.log('Navigating to orders page...');
      router.push('/orders');
    } else if (result.isDismissed) {
      // Navigate back to products
      console.log('Navigating to products page...');
      router.push('/products');
    } else {
      // Fallback - if result is undefined, go to orders
      console.log('Result undefined, going to orders as fallback');
      router.push('/orders');
    }
  }).catch((error) => {
    console.error('SweetAlert error:', error);
    // Fallback navigation
    router.push('/orders');
  });
}

// Go back function
const goBack = () => {
  router.push('/products')
}

// Test navigation function
const testNavigation = () => {
  console.log('Test navigation clicked');
  console.log('Router available:', !!router);
  console.log('Current route:', router.currentRoute?.value?.path);
  
  try {
    console.log('Attempting to navigate to /orders...');
    router.push('/orders');
  } catch (error) {
    console.error('Router navigation error:', error);
    alert('Navigation error: ' + error.message);
  }
}

onMounted(() => {
  console.log('Checkout page loaded')
})
</script>

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  // State
  const orders = ref([])
  const loading = ref(false)
  const error = ref(null)
  const filters = ref({
    status: '',
    dateRange: '',
    type: '',
    searchQuery: ''
  })

  // Getters
  const orderStats = computed(() => {
    return {
      pending: orders.value.filter(o => o.status === 'pending').length,
      confirmed: orders.value.filter(o => o.status === 'confirmed').length,
      processing: orders.value.filter(o => o.status === 'processing').length,
      shipped: orders.value.filter(o => o.status === 'shipped').length,
      delivered: orders.value.filter(o => o.status === 'delivered').length,
      cancelled: orders.value.filter(o => o.status === 'cancelled').length,
      total: orders.value.length,
      totalRevenue: orders.value
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + (o.totals?.total || o.total || 0), 0),
      todayRevenue: orders.value
        .filter(o => o.status === 'delivered' && isToday(o.date))
        .reduce((sum, o) => sum + (o.totals?.total || o.total || 0), 0)
    }
  })

  const filteredOrders = computed(() => {
    let filtered = [...orders.value]

    // Search filter
    if (filters.value.searchQuery) {
      const query = filters.value.searchQuery.toLowerCase()
      filtered = filtered.filter(order => 
        String(order.id).toLowerCase().includes(query) ||
        order.customer?.name?.toLowerCase().includes(query) ||
        order.customer?.email?.toLowerCase().includes(query)
      )
    }

    // Status filter
    if (filters.value.status) {
      filtered = filtered.filter(order => order.status === filters.value.status)
    }

    // Type filter
    if (filters.value.type) {
      filtered = filtered.filter(order => 
        (order.type || '').toLowerCase().includes(filters.value.type.toLowerCase())
      )
    }

    // Date range filter
    if (filters.value.dateRange) {
      filtered = filtered.filter(order => 
        isDateInRange(order.date, filters.value.dateRange)
      )
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  const ordersByStatus = computed(() => {
    const grouped = {}
    orders.value.forEach(order => {
      if (!grouped[order.status]) {
        grouped[order.status] = []
      }
      grouped[order.status].push(order)
    })
    return grouped
  })

  const recentOrders = computed(() => {
    return orders.value
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10)
  })

  // Actions
  const loadOrders = () => {
    try {
      loading.value = true
      error.value = null

      const saved = localStorage.getItem('orders')
      if (!saved) {
        orders.value = []
        createSampleOrders()
        return
      }

      const parsed = JSON.parse(saved)
      orders.value = parsed.map(order => ({
        ...order,
        customer: {
          name: order.delivery?.name || order.customer?.name || "Guest User",
          email: order.delivery?.email || order.customer?.email || "guest@example.com",
          phone: order.delivery?.phone || order.customer?.phone || "+255 XXX XXX XXX",
          location: order.delivery?.address || order.customer?.location || "N/A",
        },
      }))
    } catch (err) {
      console.error("Error loading orders:", err)
      error.value = "Failed to load orders"
      orders.value = []
      createSampleOrders()
    } finally {
      loading.value = false
    }
  }

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: 'pending',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    orders.value.unshift(newOrder)
    saveOrders()
    return newOrder
  }

  const updateOrder = (orderId, updates) => {
    console.log('updateOrder called with:', orderId, updates);
    const index = orders.value.findIndex(order => order.id === orderId)
    console.log('order index found:', index);
    if (index !== -1) {
      orders.value[index] = {
        ...orders.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      console.log('order updated to:', orders.value[index]);
      saveOrders()
      console.log('orders saved to localStorage');
      return orders.value[index]
    }
    console.log('order not found');
    return null
  }

  const updateOrderStatus = (orderId, newStatus, notes = '') => {
    const order = updateOrder(orderId, { 
      status: newStatus,
      statusNotes: notes,
      statusUpdatedAt: new Date().toISOString()
    })

    if (order) {
      // Add status history
      if (!order.statusHistory) {
        order.statusHistory = []
      }
      order.statusHistory.push({
        status: newStatus,
        notes,
        timestamp: new Date().toISOString(),
        updatedBy: 'system' // In real app, this would be the user ID
      })
      saveOrders()
    }

    return order
  }

  const deleteOrder = (orderId) => {
    console.log('store deleteOrder called with:', orderId);
    const index = orders.value.findIndex(order => order.id === orderId)
    console.log('order index for deletion:', index);
    if (index !== -1) {
      const deletedOrder = orders.value[index]
      console.log('order to delete:', deletedOrder);
      orders.value.splice(index, 1)
      console.log('orders after deletion:', orders.value.length);
      saveOrders()
      console.log('orders saved to localStorage');
      return deletedOrder
    }
    console.log('order not found for deletion');
    return null
  }

  const bulkUpdateStatus = (orderIds, newStatus, notes = '') => {
    const updatedOrders = []
    orderIds.forEach(orderId => {
      const order = updateOrderStatus(orderId, newStatus, notes)
      if (order) {
        updatedOrders.push(order)
      }
    })
    return updatedOrders
  }

  const bulkDelete = (orderIds) => {
    const deletedOrders = []
    orderIds.forEach(orderId => {
      const order = deleteOrder(orderId)
      if (order) {
        deletedOrders.push(order)
      }
    })
    return deletedOrders
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {
      status: '',
      dateRange: '',
      type: '',
      searchQuery: ''
    }
  }

  const getOrderById = (orderId) => {
    return orders.value.find(order => order.id === orderId)
  }

  const getOrdersByCustomer = (customerEmail) => {
    return orders.value.filter(order => 
      order.customer?.email === customerEmail
    )
  }

  const exportOrders = (format = 'json') => {
    const data = filteredOrders.value
    
    if (format === 'csv') {
      return convertToCSV(data)
    } else if (format === 'excel') {
      return convertToExcel(data)
    }
    
    return data
  }

  // Helper functions
  const saveOrders = () => {
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }

  const createSampleOrders = () => {
    const sampleOrders = [
      {
        id: 12345,
        items: [
          { productId: 1, name: "Fresh Tomatoes", price: 5000, quantity: 5 },
          { productId: 2, name: "Fresh Maize", price: 3000, quantity: 3 }
        ],
        delivery: {
          name: "John Mwangi",
          email: "john@example.com",
          phone: "+255712345678",
          address: "123 Main St, Dar es Salaam",
          city: "Dar es Salaam",
          region: "Dar es Salaam"
        },
        payment: "cash_on_delivery",
        totals: {
          subtotal: 34000,
          delivery: 2000,
          service: 680,
          total: 36680
        },
        status: "pending",
        date: new Date().toISOString(),
        type: "Purchase Order",
        statusHistory: [
          { status: 'pending', timestamp: new Date().toISOString(), notes: 'Order placed' }
        ]
      },
      {
        id: 12346,
        items: [
          { productId: 3, name: "Fresh Potatoes", price: 4000, quantity: 10 }
        ],
        delivery: {
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+255723456789",
          address: "456 Oak Ave, Arusha",
          city: "Arusha",
          region: "Arusha"
        },
        payment: "mobile_money",
        totals: {
          subtotal: 40000,
          delivery: 2000,
          service: 800,
          total: 42800
        },
        status: "confirmed",
        date: new Date(Date.now() - 86400000).toISOString(),
        type: "Purchase Order",
        statusHistory: [
          { status: 'pending', timestamp: new Date(Date.now() - 86400000).toISOString(), notes: 'Order placed' },
          { status: 'confirmed', timestamp: new Date(Date.now() - 43200000).toISOString(), notes: 'Payment confirmed' }
        ]
      },
      {
        id: 12347,
        items: [
          { productId: 4, name: "Fresh Carrots", price: 2000, quantity: 8 },
          { productId: 5, name: "Fresh Onions", price: 1500, quantity: 6 }
        ],
        delivery: {
          name: "Bob Johnson",
          email: "bob@example.com",
          phone: "+255734567890",
          address: "789 Pine Rd, Mwanza",
          city: "Mwanza",
          region: "Mwanza"
        },
        payment: "bank_transfer",
        totals: {
          subtotal: 25000,
          delivery: 2000,
          service: 500,
          total: 27500
        },
        status: "delivered",
        date: new Date(Date.now() - 172800000).toISOString(),
        type: "Purchase Order",
        statusHistory: [
          { status: 'pending', timestamp: new Date(Date.now() - 172800000).toISOString(), notes: 'Order placed' },
          { status: 'confirmed', timestamp: new Date(Date.now() - 129600000).toISOString(), notes: 'Payment confirmed' },
          { status: 'shipped', timestamp: new Date(Date.now() - 86400000).toISOString(), notes: 'Order shipped' },
          { status: 'delivered', timestamp: new Date(Date.now() - 43200000).toISOString(), notes: 'Order delivered successfully' }
        ]
      }
    ]
    
    orders.value = sampleOrders
    saveOrders()
  }

  const isToday = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isDateInRange = (dateString, range) => {
    const date = new Date(dateString)
    const today = new Date()
    
    switch (range) {
      case 'today':
        return isToday(dateString)
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        return date >= weekAgo
      case 'month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
        return date >= monthAgo
      case 'quarter':
        const quarterAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
        return date >= quarterAgo
      default:
        return true
    }
  }

  const convertToCSV = (data) => {
    if (!data.length) return ''

    const headers = ['Order ID', 'Customer', 'Email', 'Phone', 'Status', 'Total', 'Date']
    const csvContent = [
      headers.join(','),
      ...data.map(order => [
        order.id,
        `"${order.customer?.name || ''}"`,
        `"${order.customer?.email || ''}"`,
        `"${order.customer?.phone || ''}"`,
        order.status,
        order.totals?.total || order.total || 0,
        new Date(order.date).toLocaleDateString()
      ].join(','))
    ].join('\n')

    return csvContent
  }

  const convertToExcel = (data) => {
    // This would require a library like xlsx in a real implementation
    // For now, return CSV format
    return convertToCSV(data)
  }

  return {
    // State
    orders,
    loading,
    error,
    filters,

    // Getters
    orderStats,
    filteredOrders,
    ordersByStatus,
    recentOrders,

    // Actions
    loadOrders,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    bulkUpdateStatus,
    bulkDelete,
    setFilters,
    clearFilters,
    getOrderById,
    getOrdersByCustomer,
    exportOrders
  }
})

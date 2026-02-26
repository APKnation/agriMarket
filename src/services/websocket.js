import { ref, reactive } from 'vue';
import { useToast } from 'vue-toastification';

// Initialize toast
const toast = useToast();

// WebSocket connection state
const ws = ref(null);
const isConnected = ref(false);
const connectionStatus = ref('disconnected'); // 'connecting', 'connected', 'disconnected', 'error'
const reconnectAttempts = ref(0);
const maxReconnectAttempts = 5;
const reconnectDelay = 3000; // 3 seconds

// Real-time data
const realTimeOrders = ref([]);
const liveRevenue = ref(0);
const liveMetrics = reactive({
  totalOrders: 0,
  pendingOrders: 0,
  confirmedOrders: 0,
  deliveredOrders: 0,
  todayRevenue: 0
});

// WebSocket URL - adjust based on your backend
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/orders';

// WebSocket service
export const useWebSocket = () => {
  
  // Connect to WebSocket
  const connect = () => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      return;
    }

    connectionStatus.value = 'connecting';
    console.log('Connecting to WebSocket...', WS_URL);

    try {
      ws.value = new WebSocket(WS_URL);

      ws.value.onopen = () => {
        console.log('WebSocket connected');
        isConnected.value = true;
        connectionStatus.value = 'connected';
        reconnectAttempts.value = 0;
        
        toast.success('Real-time updates enabled', {
          timeout: 3000
        });

        // Request initial data
        send('get_initial_data');
      };

      ws.value.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.value.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        isConnected.value = false;
        connectionStatus.value = 'disconnected';

        // Attempt to reconnect
        if (reconnectAttempts.value < maxReconnectAttempts) {
          reconnectAttempts.value++;
          console.log(`Attempting to reconnect (${reconnectAttempts.value}/${maxReconnectAttempts})...`);
          
          setTimeout(() => {
            connect();
          }, reconnectDelay);
        } else {
          connectionStatus.value = 'error';
          toast.error('Real-time updates unavailable', {
            timeout: 5000
          });
        }
      };

      ws.value.onerror = (error) => {
        console.error('WebSocket error:', error);
        connectionStatus.value = 'error';
        toast.error('Connection error', {
          timeout: 3000
        });
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      connectionStatus.value = 'error';
    }
  };

  // Disconnect WebSocket
  const disconnect = () => {
    if (ws.value) {
      ws.value.close();
      ws.value = null;
    }
    isConnected.value = false;
    connectionStatus.value = 'disconnected';
  };

  // Send message to WebSocket
  const send = (message) => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      const data = typeof message === 'string' ? message : JSON.stringify(message);
      ws.value.send(data);
    } else {
      console.warn('WebSocket not connected, cannot send message:', message);
    }
  };

  // Handle incoming messages
  const handleMessage = (data) => {
    console.log('WebSocket message received:', data);

    switch (data.type) {
      case 'initial_data':
        handleInitialData(data.payload);
        break;
        
      case 'new_order':
        handleNewOrder(data.payload);
        break;
        
      case 'order_update':
        handleOrderUpdate(data.payload);
        break;
        
      case 'revenue_update':
        handleRevenueUpdate(data.payload);
        break;
        
      case 'metrics_update':
        handleMetricsUpdate(data.payload);
        break;
        
      default:
        console.log('Unknown message type:', data.type);
    }
  };

  // Handle initial data
  const handleInitialData = (payload) => {
    console.log('Received initial data:', payload);
    
    if (payload.orders) {
      realTimeOrders.value = payload.orders;
    }
    
    if (payload.revenue) {
      liveRevenue.value = payload.revenue;
    }
    
    if (payload.metrics) {
      Object.assign(liveMetrics, payload.metrics);
    }
  };

  // Handle new order
  const handleNewOrder = (order) => {
    console.log('New order received:', order);
    
    // Add to real-time orders
    realTimeOrders.value.unshift(order);
    
    // Update revenue
    const orderTotal = order.totals?.total || order.total || 0;
    liveRevenue.value += orderTotal;
    
    // Update metrics
    liveMetrics.totalOrders++;
    liveMetrics.pendingOrders++;
    
    // Update today's revenue if order is from today
    const today = new Date().toDateString();
    const orderDate = new Date(order.date).toDateString();
    if (today === orderDate) {
      liveMetrics.todayRevenue += orderTotal;
    }
    
    // Show notification
    toast.success(`New Order #${order.id} received!`, {
      timeout: 5000,
      closeButton: true
    });
    
    // Play notification sound (optional)
    playNotificationSound();
  };

  // Handle order update
  const handleOrderUpdate = (updatedOrder) => {
    console.log('Order updated:', updatedOrder);
    
    // Find and update order in real-time orders
    const index = realTimeOrders.value.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
      const oldStatus = realTimeOrders.value[index].status;
      realTimeOrders.value[index] = updatedOrder;
      
      // Update metrics based on status change
      if (oldStatus !== updatedOrder.status) {
        updateMetricsByStatus(oldStatus, updatedOrder.status);
      }
      
      // Show notification for important status changes
      if (updatedOrder.status === 'delivered') {
        toast.success(`Order #${updatedOrder.id} delivered!`, {
          timeout: 4000
        });
      } else if (updatedOrder.status === 'confirmed') {
        toast.info(`Order #${updatedOrder.id} confirmed`, {
          timeout: 3000
        });
      }
    }
  };

  // Handle revenue update
  const handleRevenueUpdate = (revenueData) => {
    console.log('Revenue updated:', revenueData);
    
    if (revenueData.total !== undefined) {
      liveRevenue.value = revenueData.total;
    }
    
    if (revenueData.today !== undefined) {
      liveMetrics.todayRevenue = revenueData.today;
    }
  };

  // Handle metrics update
  const handleMetricsUpdate = (metrics) => {
    console.log('Metrics updated:', metrics);
    Object.assign(liveMetrics, metrics);
  };

  // Update metrics by status change
  const updateMetricsByStatus = (oldStatus, newStatus) => {
    // Decrease old status count
    if (oldStatus === 'pending') liveMetrics.pendingOrders--;
    else if (oldStatus === 'confirmed') liveMetrics.confirmedOrders--;
    else if (oldStatus === 'delivered') liveMetrics.deliveredOrders--;
    
    // Increase new status count
    if (newStatus === 'pending') liveMetrics.pendingOrders++;
    else if (newStatus === 'confirmed') liveMetrics.confirmedOrders++;
    else if (newStatus === 'delivered') liveMetrics.deliveredOrders++;
  };

  // Play notification sound
  const playNotificationSound = () => {
    try {
      const audio = new Audio('/notification-sound.mp3');
      audio.volume = 0.3;
      audio.play().catch(error => {
        console.log('Could not play notification sound:', error);
      });
    } catch (error) {
      console.log('Notification sound not available:', error);
    }
  };

  // Get connection status color
  const getConnectionColor = () => {
    switch (connectionStatus.value) {
      case 'connected': return 'text-green-500';
      case 'connecting': return 'text-yellow-500';
      case 'disconnected': return 'text-gray-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Get connection status text
  const getConnectionText = () => {
    switch (connectionStatus.value) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'disconnected': return 'Disconnected';
      case 'error': return 'Connection Error';
      default: return 'Unknown';
    }
  };

  return {
    // Connection
    ws,
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    send,
    
    // Data
    realTimeOrders,
    liveRevenue,
    liveMetrics,
    
    // Helpers
    getConnectionColor,
    getConnectionText
  };
};

// Mock WebSocket Server for Testing
// This simulates a real WebSocket server for development purposes

class MockWebSocketServer {
  constructor() {
    this.clients = new Set();
    this.orders = [];
    this.metrics = {
      totalOrders: 0,
      pendingOrders: 0,
      confirmedOrders: 0,
      deliveredOrders: 0,
      todayRevenue: 0
    };
    this.revenue = 0;
    
    // Initialize with some sample data
    this.initializeSampleData();
    
    // Start sending periodic updates
    this.startPeriodicUpdates();
  }

  initializeSampleData() {
    // Load existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    this.orders = existingOrders;
    
    // Calculate initial metrics
    this.calculateMetrics();
  }

  calculateMetrics() {
    this.metrics.totalOrders = this.orders.length;
    this.metrics.pendingOrders = this.orders.filter(o => o.status === 'pending').length;
    this.metrics.confirmedOrders = this.orders.filter(o => o.status === 'confirmed').length;
    this.metrics.deliveredOrders = this.orders.filter(o => o.status === 'delivered').length;
    
    // Calculate today's revenue
    const today = new Date().toDateString();
    this.metrics.todayRevenue = this.orders
      .filter(o => o.status === 'delivered' && new Date(o.date).toDateString() === today)
      .reduce((sum, order) => sum + (order.totals?.total || order.total || 0), 0);
    
    // Calculate total revenue
    this.revenue = this.orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + (order.totals?.total || order.total || 0), 0);
  }

  startPeriodicUpdates() {
    // Send metrics updates every 5 seconds
    setInterval(() => {
      this.broadcast({
        type: 'metrics_update',
        payload: this.metrics
      });
    }, 5000);

    // Send revenue updates every 10 seconds
    setInterval(() => {
      this.broadcast({
        type: 'revenue_update',
        payload: {
          total: this.revenue,
          today: this.metrics.todayRevenue
        }
      });
    }, 10000);

    // Simulate new orders every 30 seconds (for testing)
    setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance
        this.simulateNewOrder();
      }
    }, 30000);
  }

  simulateNewOrder() {
    const newOrder = {
      id: Date.now(),
      customer: {
        name: `Customer ${Math.floor(Math.random() * 1000)}`,
        email: `customer${Math.floor(Math.random() * 1000)}@example.com`,
        phone: `+255${Math.floor(Math.random() * 900000000) + 100000000}`
      },
      items: [
        {
          productId: Math.floor(Math.random() * 10) + 1,
          name: `Product ${Math.floor(Math.random() * 10) + 1}`,
          quantity: Math.floor(Math.random() * 5) + 1,
          price: Math.floor(Math.random() * 50000) + 1000
        }
      ],
      totals: {
        subtotal: Math.floor(Math.random() * 50000) + 1000,
        delivery: 2000,
        service: Math.floor(Math.random() * 1000) + 100,
        total: Math.floor(Math.random() * 55000) + 3000
      },
      status: 'pending',
      date: new Date().toISOString(),
      type: 'Purchase Order'
    };

    this.orders.unshift(newOrder);
    this.calculateMetrics();

    // Broadcast new order
    this.broadcast({
      type: 'new_order',
      payload: newOrder
    });

    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  broadcast(message) {
    const data = JSON.stringify(message);
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  addClient(client) {
    this.clients.add(client);
    
    // Send initial data when client connects
    client.send(JSON.stringify({
      type: 'initial_data',
      payload: {
        orders: this.orders.slice(0, 10), // Send last 10 orders
        revenue: this.revenue,
        metrics: this.metrics
      }
    }));
  }

  removeClient(client) {
    this.clients.delete(client);
  }
}

// Mock WebSocket class for browser environment
class MockWebSocket extends EventTarget {
  constructor(url) {
    super();
    this.url = url;
    this.readyState = WebSocket.CONNECTING;
    
    // Simulate connection delay
    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      this.onopen && this.onopen();
      this.dispatchEvent(new Event('open'));
      
      // Register with mock server
      if (!window.mockWebSocketServer) {
        window.mockWebSocketServer = new MockWebSocketServer();
      }
      window.mockWebSocketServer.addClient(this);
    }, 100);
  }

  send(data) {
    // Handle outgoing messages if needed
    console.log('WebSocket send:', data);
  }

  close() {
    this.readyState = WebSocket.CLOSED;
    this.onclose && this.onclose();
    this.dispatchEvent(new Event('close'));
    
    // Remove from mock server
    if (window.mockWebSocketServer) {
      window.mockWebSocketServer.removeClient(this);
    }
  }

  // Simulate receiving messages
  simulateMessage(message) {
    this.onmessage && this.onmessage({ data: JSON.stringify(message) });
    this.dispatchEvent(new MessageEvent('message', { data: JSON.stringify(message) }));
  }
}

// Replace the global WebSocket with our mock
if (typeof window !== 'undefined') {
  window.WebSocket = MockWebSocket;
  console.log('Mock WebSocket server initialized for testing');
}

// Export for manual testing
export { MockWebSocketServer, MockWebSocket };

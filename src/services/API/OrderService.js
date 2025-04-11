import axiosInstance from '../../lib/axios';

/**
 * Service for handling order-related API calls
 */
export const OrderService = {
  /**
   * Get all orders for the current user
   * @returns {Promise} - The response from the API
   */
  getOrders: async () => {
    try {
      const response = await axiosInstance.get('/order');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  /**
   * Get a specific order by ID
   * @param {String} orderId - The ID of the order to fetch
   * @returns {Promise} - The response from the API
   */
  getOrderById: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/order/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new order
   * @param {Object} orderData - The order data
   * @returns {Promise} - The response from the API
   */
  createOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post('/order', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  /**
   * Update an existing order
   * @param {String} orderId - The ID of the order to update
   * @param {Object} updates - The updates to apply to the order
   * @returns {Promise} - The response from the API
   */
  updateOrder: async (orderId, updates) => {
    try {
      const response = await axiosInstance.patch(`/order/${orderId}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      throw error;
    }
  },

  /**
   * Cancel an order
   * @param {String} orderId - The ID of the order to cancel
   * @returns {Promise} - The response from the API
   */
  cancelOrder: async (orderId) => {
    try {
      const response = await axiosInstance.post(`/order/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Error canceling order ${orderId}:`, error);
      throw error;
    }
  }
};

export default OrderService;
import axiosInstance from '../../lib/axios';

/**
 * Service for handling cart-related API calls
 */
export const CartService = {
  /**
   * Get the current user's cart
   * @returns {Promise} - The response from the API
   */
  getCart: async () => {
    try {
      const response = await axiosInstance.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  /**
   * Add an item to the cart
   * @param {Object} item - The item to add to the cart
   * @returns {Promise} - The response from the API
   */
  addToCart: async (item) => {
    try {
      const response = await axiosInstance.post('/cart', item);
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  /**
   * Update an item in the cart
   * @param {String} itemId - The ID of the item to update
   * @param {Object} updates - The updates to apply to the item
   * @returns {Promise} - The response from the API
   */
  updateCartItem: async (itemId, updates) => {
    try {
      const response = await axiosInstance.patch(`/cart/${itemId}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error updating cart item ${itemId}:`, error);
      throw error;
    }
  },

  /**
   * Remove an item from the cart
   * @param {String} itemId - The ID of the item to remove
   * @returns {Promise} - The response from the API
   */
  removeFromCart: async (itemId) => {
    try {
      const response = await axiosInstance.delete(`/cart/${itemId}`);
      return response.data;
    } catch (error) {
      console.error(`Error removing item ${itemId} from cart:`, error);
      throw error;
    }
  },

  /**
   * Clear the entire cart
   * @returns {Promise} - The response from the API
   */
  clearCart: async () => {
    try {
      const response = await axiosInstance.delete('/cart');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

export default CartService;
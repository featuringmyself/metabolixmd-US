import axiosInstance from '../../lib/axios';

/**
 * Service for handling product-related API calls
 */
export const ProductService = {
  /**
   * Get all products
   * @param {Object} params - Query parameters for filtering products
   * @returns {Promise} - The response from the API
   */
  getAllProducts: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/product', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Get a single product by ID
   * @param {String} productId - The ID of the product to fetch
   * @returns {Promise} - The response from the API
   */
  getProductById: async (productId) => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      throw error;
    }
  },

  /**
   * Get products by category
   * @param {String} category - The category to filter by
   * @returns {Promise} - The response from the API
   */
  getProductsByCategory: async (category) => {
    try {
      const response = await axiosInstance.get('/product', { 
        params: { category } 
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      throw error;
    }
  },

  /**
   * Search products by query
   * @param {String} query - The search query
   * @returns {Promise} - The response from the API
   */
  searchProducts: async (query) => {
    try {
      const response = await axiosInstance.get('/product/search', { 
        params: { query } 
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
};

export default ProductService;
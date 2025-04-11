import axiosInstance from '../../lib/axios';

/**
 * Service for handling authentication with the backend
 */
export const AuthService = {
  /**
   * Login user with credentials
   * @param {Object} credentials - User credentials (email, password)
   * @returns {Promise} - The response from the API
   */
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - The response from the API
   */
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Logout the current user
   */
  logout: () => {
    localStorage.removeItem('token');
  },

  /**
   * Check if user is authenticated
   * @returns {Boolean} - True if user has a token
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get the current user's profile
   * @returns {Promise} - The response from the API
   */
  getUserProfile: async () => {
    try {
      const response = await axiosInstance.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
};

export default AuthService;
import { postMethod, patchMethod, patchWithFileMethod } from './ApiMethod';

/**
 * Service for handling form submissions and syncing with the backend
 */
export const FormService = {
  /**
   * Submit form data to the backend
   * @param {Object} formData - The collected form data
   * @returns {Promise} - The response from the API
   */
  submitFormData: async (formData) => {
    try {
      // Use the existing updateDetails endpoint to save form data
      const payload = {
        detail: formData
      };
      
      const response = await patchMethod("/users/updateDetails", payload);
      return response;
    } catch (error) {
      console.error("Error submitting form data:", error);
      throw error;
    }
  },

  /**
   * Upload profile picture
   * @param {File} imageFile - The profile image file
   * @returns {Promise} - The response from the API
   */
  uploadProfilePicture: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("profilePic", imageFile);
      
      const response = await patchWithFileMethod("/users/updateDetails", formData);
      return response;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      throw error;
    }
  },

  /**
   * Submit both form data and profile picture in one call
   * @param {Object} formData - The collected form data
   * @param {File} imageFile - The profile image file
   * @returns {Promise} - Object containing both responses
   */
  submitFormWithProfile: async (formData, imageFile) => {
    try {
      const dataResponse = await FormService.submitFormData(formData);
      
      let imageResponse = null;
      if (imageFile) {
        imageResponse = await FormService.uploadProfilePicture(imageFile);
      }
      
      return {
        dataResponse,
        imageResponse
      };
    } catch (error) {
      console.error("Error in combined submission:", error);
      throw error;
    }
  }
};

export default FormService;
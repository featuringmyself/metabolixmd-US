import { toast } from 'react-toastify';

// Custom toast styles
const toastStyles = {
  success: {
    background: 'linear-gradient(to right, #4CAF50, #45a049)',
    color: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '16px 24px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
  },
  error: {
    background: 'linear-gradient(to right, #ff4b4b, #ff6b6b)',
    color: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '16px 24px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
  },
  warning: {
    background: 'linear-gradient(to right, #ff9800, #ffa726)',
    color: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '16px 24px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
  },
  info: {
    background: 'linear-gradient(to right, #2196F3, #42A5F5)',
    color: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '16px 24px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
  },
};

// Custom toast configuration
export const toastConfig = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  style: toastStyles.success,
};

// Custom toast functions
export const showSuccessToast = (message) => {
  toast.success(message, {
    ...toastConfig,
    style: toastStyles.success,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    ...toastConfig,
    style: toastStyles.error,
  });
};

export const showWarningToast = (message) => {
  toast.warning(message, {
    ...toastConfig,
    style: toastStyles.warning,
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    ...toastConfig,
    style: toastStyles.info,
  });
}; 
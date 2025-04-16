import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LenisProvider from '@/components/LenisProvider'
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthModalProvider } from '@/contexts/AuthModalContext';
import { useEffect } from 'react';
import { toastConfig } from '@/lib/toastConfig';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export default function App({ Component, pageProps, err }) {
  // Fix for hot module replacement error with __N_SSP
  useEffect(() => {
    // Patch for HMR issue with __N_SSP property
    window.addEventListener('error', (event) => {
      if (event.error && event.error.message && event.error.message.includes('__N_SSP')) {
        event.preventDefault();
        console.warn('Suppressed __N_SSP error during hot module replacement');
        window.location.reload();
        return true;
      }
      return false;
    });

    // Apply Inter font to the HTML element
    document.documentElement.classList.add(inter.variable);
  }, []);

  return (
    <AuthProvider>
      <AuthModalProvider>
        <LenisProvider>
          <main className="font-sans">
            <ToastContainer
              position={toastConfig.position}
              autoClose={toastConfig.autoClose}
              hideProgressBar={toastConfig.hideProgressBar}
              newestOnTop={true}
              closeOnClick={toastConfig.closeOnClick}
              rtl={false}
              pauseOnFocusLoss
              draggable={toastConfig.draggable}
              pauseOnHover={toastConfig.pauseOnHover}
              theme={toastConfig.theme}
              style={{
                '--toastify-color-success': '#4CAF50',
                '--toastify-color-error': '#ff4b4b',
                '--toastify-color-warning': '#ff9800',
                '--toastify-color-info': '#2196F3',
                '--toastify-font-family': 'var(--font-inter)',
                '--toastify-toast-width': 'auto',
                '--toastify-toast-min-height': 'auto',
                '--toastify-toast-max-height': 'auto',
                '--toastify-z-index': '9999',
              }}
            />
            <Component {...pageProps} err={err} />
          </main>
        </LenisProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}

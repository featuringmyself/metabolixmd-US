import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LenisProvider from '@/components/LenisProvider'
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { useEffect } from 'react';

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
    <ClerkProvider {...pageProps}>
      <LenisProvider>
        <main className="font-sans">
          <ToastContainer />
          <Component {...pageProps} err={err} />
        </main>
      </LenisProvider>
    </ClerkProvider>
  );
}

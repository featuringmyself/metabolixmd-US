import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LenisProvider from '@/components/LenisProvider'
import { Montserrat, Poppins, Kanit } from 'next/font/google';
import { useEffect } from 'react';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const kanit = Kanit({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-kanit',
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
  }, []);

  return (
    <LenisProvider>
      <main className={`${montserrat.variable} ${poppins.variable} ${kanit.variable}`}>
        <ToastContainer />
        <Component {...pageProps} err={err} />
      </main>
    </LenisProvider>
  );
}

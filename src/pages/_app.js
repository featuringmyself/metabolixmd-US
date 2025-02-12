import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LenisProvider from '@/components/LenisProvider'
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function App({ Component, pageProps }) {
  return (
    <LenisProvider>
      <main className={`${montserrat.variable} ${poppins.variable}`}>
        <ToastContainer />
        <Component {...pageProps} />
      </main>
    </LenisProvider>
  )
}

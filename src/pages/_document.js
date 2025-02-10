import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Use the next/script component to load the Google Maps API */}
        {/* <title>MetabolixMD</title> */}
        <Script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_APIKEY}&libraries=places`}
          strategy="beforeInteractive" // Load before the page becomes interactive, but still asynchronously
          onError={(e) => {
            console.error("Failed to load the Google Maps API", e);
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

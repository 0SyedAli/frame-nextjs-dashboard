"use client";
import { Open_Sans, Inter, Epilogue, Montserrat, Lato, Roboto, Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import BootstrapClients from "../components/BootstrapClients";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import ToastProvider from "../components/ToastProvider";
import { GoogleOAuthProvider } from '@react-oauth/google';
const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});
const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});

const CLIENT_ID = "797389704553-dflobc44jfaqjp2d2038nhiksg031t5v.apps.googleusercontent.com"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} ${epilogue.variable} ${roboto.variable} ${lato.variable} ${montserrat.variable} ${interFont.variable} ${openSans.variable}`}>
        <ToastProvider /> {/* Global toast notifications */}
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <Provider store={store}>{children}</Provider>
        </GoogleOAuthProvider>
        <BootstrapClients />
      </body>
    </html>
  );
}


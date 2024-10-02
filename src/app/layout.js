"use client"

import localFont from "next/font/local";
import {Inter} from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider, useDispatch } from "react-redux";
import store from "@/redux/store";

import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import Navbar from "@/components/pagesComponents/Navbar";


// Load Inter from Google Fonts
const inter = Inter({
  subsets: ['latin'],
});





export default function RootLayout({ children }) {

  const pathname = usePathname();

  const showNavbar = pathname !== '/' && pathname !== '/login';

 



  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
         <Provider store={store}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {showNavbar && <Navbar/>}
            {children}
            <Toaster/>
          </ThemeProvider>

          </Provider>
      </body>
    </html>
  );
}

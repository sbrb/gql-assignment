import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from '@/redux/provider';
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Home page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <ToastContainer position="top-left" />
        </Providers>
      </body>
    </html>
  );
}

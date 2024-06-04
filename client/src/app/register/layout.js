import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Register",
  description: "Register page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

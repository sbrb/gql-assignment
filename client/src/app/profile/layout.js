import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Profile",
  description: "Profile page.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

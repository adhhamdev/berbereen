import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import BottomBar from "@/components/bottom-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Berbereen (Beruwala)",
  description: "The platform of Berbereenians",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="px-4 py-2">{children}</main>
        <BottomBar />
      </body>
    </html>
  );
}

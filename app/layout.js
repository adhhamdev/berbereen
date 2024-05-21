import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata = {
  title: "Berbereen (Beruwala)",
  description: "The platform of Berbereenians",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} scroll-smooth bg-slate-50`}>{children}</body>
    </html>
  );
}

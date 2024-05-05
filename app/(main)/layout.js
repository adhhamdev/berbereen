import Header from "@/components/header";
import BottomBar from "@/components/bottom-bar";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <BottomBar />
    </>
  );
}

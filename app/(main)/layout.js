import BottomBar from "@/components/bottom-bar";
import Header from "@/components/header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <BottomBar />
    </>
  );
}

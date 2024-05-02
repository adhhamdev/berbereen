import Transition from "@/components/transition";

export default function Home() {
  return (
    <main>
      <Transition layoutId="heading">
        <h1>Home</h1>
      </Transition>
    </main>
  );
}

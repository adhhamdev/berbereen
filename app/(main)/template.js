import Transition from "@/components/transition";

export default function Template({ children}) {
  return (
    <Transition
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      {children}
    </Transition>
  );
}

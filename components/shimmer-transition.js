import Transition from "./transition";

export default function ShimmerTransition({ ...props }) {
  return (
    <Transition
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, repeatDelay: 0.5 }}
      {...props}
    ></Transition>
  );
}

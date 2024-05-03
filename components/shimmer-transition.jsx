import Transition from "./transition";

export default function ShimmerTransition({...props}) {
  return <Transition animate={{opacity: [.5, 1, .5]}} transition={{repeat: Infinity, repeatDelay: .5}} {...props}></Transition>;
}

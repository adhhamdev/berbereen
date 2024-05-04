import Image from "next/image";
import Transition from "../../../components/transition";

export default function ImageView({ params }) {
  const imageUrl = `/profile.jpg`;
  return (
    <div>
      <Transition layoutId={params.id}>
        <Image src={imageUrl} width={500} height={500} alt="" />
      </Transition>
    </div>
  );
}

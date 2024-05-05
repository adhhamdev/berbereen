import Image from "next/image";

export default function ImageView({ params }) {
  const imageUrl = `/profile.jpg`;
  return (
    <div>
        <Image src={imageUrl} width={500} height={500} alt="" />
    </div>
  );
}

import ImageOptions from "@/components/image-options";
import BackBtn from "@/components/skeletons/back-btn";
import { getImage } from "@/lib/server/actions";
import Image from "next/image";

export default async function Page({ params }) {
  const imageUrl = await getImage(params.id);
  return (
    <div className="h-screen w-screen flex items-center">
      <div className="fixed top-0 left-0 p-3">
        <BackBtn />
      </div>
      <Image
        className="w-full h-auto max-w-full max-h-screen object-contain"
        src={imageUrl}
        width={500}
        height={500}
        alt=""
      />
      <ImageOptions imageId={params.id} />
    </div>
  );
}

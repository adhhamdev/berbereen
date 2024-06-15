import BackNavBtn from "@/components/back-nav-btn";
import ImageOptions from "@/components/image-options";
import { getImage } from "@/lib/server/actions";
import Image from "next/image";

export const metadata = {
  title: "Image",
  description: "A Post image",
};

export default async function Page({ params }) {
  const imageUrl = await getImage(params.id);
  return (
    <div className="flex items-center w-screen h-screen">
      <div className="fixed top-0 left-0 p-3">
        <BackNavBtn text="Image" />
      </div>
      <Image
        className="object-contain w-full h-auto max-w-full max-h-screen"
        src={imageUrl}
        width={500}
        height={500}
        alt=""
      />
      <ImageOptions imageId={params.id} />
    </div>
  );
}

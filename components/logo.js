import { righteous } from "@/lib/fonts";
import Image from "next/image";
import logoIcon from "/public/icon-192.png";

const LogoIcon = () => {
  return (
    <div className="flex items-center mb-20">
      <Image
        className="w-20 mx-auto rounded-full md:mx-0"
        src={logoIcon}
        alt="Berbereen Logo"
        priority
      />
      <span
        className={`${righteous.className} ml-4 text-4xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 md:hidden`}
        translate="no"
      >
        Berbereen.
      </span>
    </div>
  );
};

export default LogoIcon;

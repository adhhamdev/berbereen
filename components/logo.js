import Image from "next/image";
import { righteous } from "@/lib/fonts";
import logoIcon from "/public/icon-192.png";

const LogoIcon = () => {
  return (
    <div className="flex items-center mb-20">
      <Image
        className="mx-auto md:mx-0 w-20 rounded-full"
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

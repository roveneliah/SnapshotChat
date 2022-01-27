import kh_holo from "../../public/kh_holo.png";
import Image from "next/image";

export const HeaderLogo = () => (
  <div className="flex space-x-2">
    <Image
      src={kh_holo}
      className="flex"
      width={40}
      height={40}
      alt="KH_LOGO"
    />
    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
      The Krause House
    </span>
  </div>
);

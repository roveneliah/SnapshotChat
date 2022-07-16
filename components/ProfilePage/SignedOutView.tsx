import Image from "next/image";
import { Heading } from "../Generics/Headings/Heading";

export default function SignedOutView() {
  return (
    <div className="flex flex-row justify-center space-x-3">
      <div className="flex w-2/3 flex-col space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-800">
        <Heading title="Connect your wallet to view your profile." size="xl" />
        <Image
          src="/morris.webp"
          alt="DO IT"
          height={500}
          width={500} // wtf
          quality={100}
        />
      </div>
    </div>
  );
}

import Image from "next/image";
import { Heading } from "../Generics/Headings/Heading";

export default function SignedOutView() {
  return (
    <div className="flex flex-row justify-center space-x-3">
      <div className="flex flex-col w-2/3 space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <Heading title="Connect your wallet to view your profile." size="xl" />
        <Image
          src="https://i.giphy.com/media/1AjFHLpytkqt0qYDcW/giphy.webp"
          alt="DO IT"
          height={800}
          width={-1} // wtf
        />
      </div>
    </div>
  );
}

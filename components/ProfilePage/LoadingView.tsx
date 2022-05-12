import Image from "next/image";
import { Heading } from "../Generics/Headings/Heading";

export const LoadingView = () => (
  <div className="flex flex-row justify-center space-x-3 rounded-lg overflow-hidden">
    {/* <div className="flex flex-col w-2/3 space-y-4 bg-cards rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700"> */}
    <Heading title="Loading..." size="xl" />
    <Image
      src="/russell_waiting.gif"
      alt="DO IT"
      height={500}
      width={800} // wtf
      quality={100}
    />
    {/* </div> */}
  </div>
);

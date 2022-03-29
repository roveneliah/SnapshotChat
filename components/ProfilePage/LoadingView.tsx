import Image from "next/image";
export const LoadingView = () => (
  <div className="flex flex-row justify-center space-x-3">
    <div className="flex flex-col w-2/3 space-y-4 p-6 bg-white rounded-lg border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700">
      {/* <Heading title="Connect your wallet to view your profile." size="xl" /> */}
      <Image
        src="/russell_waiting.gif"
        alt="DO IT"
        height={500}
        width={500} // wtf
        quality={100}
      />
    </div>
  </div>
);

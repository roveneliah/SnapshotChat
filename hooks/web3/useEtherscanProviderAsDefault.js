import { useState, useEffect } from "react";
import { AlchemyProvider, EtherscanProvider } from "@ethersproject/providers";

// export const useEtherscanProviderAsDefault = () => {
//   const [provider, setProvider] = useState();
//   useEffect(() => {
//     console.log("SETTING PROVIDER TO ETHERSCAN");
//     const newProvider = new EtherscanProvider();
//     isMainnet(newProvider).then(setProvider);
//   }, []);
//   return [provider, setProvider];
// };

export const useAlchemyProvider = () => {
  const [provider, setProvider] = useState();

  useEffect(() => {
    console.log("SETTING PROVIDER TO ALCHEMY");
    const newProvider = new AlchemyProvider(
      null,
      process.env.NEXT_PUBLIC_ALCHEMY
    );
    setProvider(newProvider);
  }, []);

  return [provider, setProvider];
};

import { useState, useEffect } from "react";
import { AlchemyProvider, EtherscanProvider } from "@ethersproject/providers";

export const useEtherscanProviderAsDefault = () => {
  const [provider, setProvider] = useState();
  useEffect(() => {
    console.log("SETTING PROVIDER TO ETHERSCAN");
    const provider = new EtherscanProvider();
    setProvider(provider);
  }, []);
  return [provider, setProvider];
};

export const useAlchemyProvider = () => {
  const [provider, setProvider] = useState();
  useEffect(() => {
    console.log("SETTING PROVIDER TO ALCHEMY");
    const provider = new AlchemyProvider(null, process.env.NEXT_PUBLIC_ALCHEMY);
    setProvider(provider);
  }, []);
  return [provider, setProvider];
};

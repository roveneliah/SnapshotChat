import { useState, useEffect } from "react";
import { EtherscanProvider } from "@ethersproject/providers";

export const useEtherscanProviderAsDefault = () => {
  const [provider, setProvider] = useState();
  useEffect(() => {
    console.log("SETTING PROVIDER TO ETHERSCAN");
    setProvider(new EtherscanProvider());
  }, []);
  return [provider, setProvider];
};

import { useEffect, useState } from "react";
import { isMainnet } from "../../utils/web3/isMainnet";

export const useIsWrongNetwork = (provider: any): boolean => {
  const [wrongNetwork, setWrongNetwork] = useState<boolean>(false);
  useEffect(() => {
    isMainnet(provider).then(setWrongNetwork);
  }, [provider]);
  return wrongNetwork;
};

import { useState, useEffect } from "react";
import { prop } from "ramda";

export const useListenSigner = (provider) => {
  const [signer, setSigner] = useState();

  useEffect(() => {
    console.log("UPDATING SIGNER");
    try {
      if (provider?.getSigner) setSigner(provider.getSigner());
    } catch {
      setSigner(null);
    }
  }, [provider]);

  return [signer, setSigner];
};

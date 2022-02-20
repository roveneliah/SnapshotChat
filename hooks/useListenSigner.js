import { useState, useEffect } from "react";
import { head, prop } from "ramda";

export const useListenSigner = (provider) => {
  const [signer, setSigner] = useState();

  useEffect(async () => {
    try {
      if (provider?.getSigner) {
        console.log("SETTING SIGNER FROM PROVIDER");
        setSigner(provider.getSigner());
      } else {
        console.log("SETTING SIGNER TO NULL");
        setSigner(null);
      }
    } catch (e) {
      console.log("SETTING SIGNER TO NULL");
      setSigner(null);
    }
  }, [provider]);

  return [signer, setSigner];
};

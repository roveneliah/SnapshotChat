import { useState, useEffect } from "react";
import { head, prop } from "ramda";

export const useListenSigner = (provider) => {
  const [signer, setSigner] = useState();

  useEffect(() => {
    try {
      setSigner(provider.getSigner());
      // if (provider?.getSigner) {
      //   console.log("SETTING SIGNER FROM PROVIDER");

      //   // setSigner(provider.getSigner());

      //   // handle error from this
      //   console.log("done");
      // } else {
      //   console.log("SETTING SIGNER TO NULL");
      //   setSigner(null);
      // }
    } catch (e) {
      console.log("SETTING SIGNER TO NULL");
      setSigner(null);
    }
  }, [provider]);

  return [signer, setSigner];
};

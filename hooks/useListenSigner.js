import { useState, useEffect } from "react";

export const useListenSigner = (provider) => {
  const [signer, setSigner] = useState();

  console.log(provider);
  useEffect(() => {
    console.log("UPDATING SIGNER");
    if (provider?.getSigner) setSigner(provider.getSigner());
    else setSigner(null);
  }, [provider]);

  return [signer, setSigner];
};

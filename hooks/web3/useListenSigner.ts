import { useState, useEffect } from "react";
import { head, prop } from "ramda";

const updateSignerIfExists = async (provider: any, setSigner: Function) => {
  try {
    const signer = provider.getSigner();
    signer.address = await signer.getAddress();
    console.log("UPDATING SIGNER", signer);
    setSigner(signer);
  } catch (e) {
    console.log("SETTING SIGNER TO NULL");
    setSigner(null);
  }
};

export const useListenSigner = (provider: any) => {
  const [signer, setSigner] = useState<any>();

  useEffect(() => {
    updateSignerIfExists(provider, setSigner);
  }, [provider]);

  return [signer, setSigner];
};

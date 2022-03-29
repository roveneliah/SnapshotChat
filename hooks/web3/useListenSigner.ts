import { useState, useEffect } from "react";

const updateSignerIfExists = async (provider: any, setSigner: Function) => {
  try {
    const signer = provider.getSigner();
    signer.address = await signer.getAddress();
    setSigner(signer);
  } catch (e) {
    setSigner(null);
  }
};

/**
 * Update signer on any updates to provider.
 */
export const useListenSigner = (provider: any) => {
  const [signer, setSigner] = useState<any>();

  useEffect(() => {
    updateSignerIfExists(provider, setSigner);
  }, [provider]);

  return [signer, setSigner];
};

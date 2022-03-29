import { ethers } from "ethers";

export const updateProvider = (setProvider) => async (accounts) => {
  if (accounts.length > 0) {
    const newProvider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    );

    setProvider(newProvider);
    return;
  }
  setProvider(null);
};

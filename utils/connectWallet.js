import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID, // required
    },
  },
};
const web3Modal = () =>
  new Web3Modal({
    providerOptions,
    // theme: "dark",
    theme: {
      background: "black",
      main: "white",
      secondary: "gray",
      border: "rgba(195, 195, 195, 0.14)",
      hover: "purple",
    },
    cacheProvider: true,
  });

export const connectWallet = (setProvider) => async () => {
  try {
    const web3modal = web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    setProvider(provider);
  } catch (e) {
    console.log(e);
    setProvider(null); // TODO: is this right?
  }
};

export const disconnectWallet = (provider, setProvider) => async () => {
  const web3modal = web3Modal();
  web3modal.clearCachedProvider();
  setProvider(null);
};

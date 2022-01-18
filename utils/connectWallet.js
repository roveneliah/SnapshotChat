import Web3Modal from 'web3modal'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

export const connectWallet = ({setSigner, setProvider, setConnected}) => async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID // required
        }
      }
    }
    const web3Modal = new Web3Modal({ providerOptions, theme: "dark" });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    setProvider(provider);
    setSigner(provider.getSigner())
    setConnected(true);
}
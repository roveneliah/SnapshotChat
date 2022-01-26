import { head as headOf, composeP, printPass } from "./functional";

const connectedWallets = async () =>
  await window.ethereum?.request({ method: "eth_accounts" });
export const mainConnectedWallet = composeP([
  headOf,
  printPass,
  connectedWallets,
]);

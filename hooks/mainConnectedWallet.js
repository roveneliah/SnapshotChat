
import { head as headOf, composeP, printPass } from "../utils/functional"

const connectedWallets = async () => await window.ethereum?.request({ method: 'eth_accounts' });
export const mainConnectedWallet =
    composeP([
        headOf,
        printPass,
        connectedWallets
    ]);
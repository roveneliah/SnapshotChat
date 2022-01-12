import { useState, useEffect } from "react";
import { fetchWalletBalance } from "../utils/fetchWallet";

export const Wallet = ({provider, signer}) => {

    const [wallet, setWallet] = useState({});

    useEffect(() => {
        fetchWalletBalance(provider, signer).then(setWallet)
    }, [])

    return (
        <h1>{wallet.$KRAUSE} $KRAUSE, {wallet.TICKETS} Tickets</h1>
    )
}

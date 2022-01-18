
import { ConnectButton } from "./ConnectButton"
import { Wallet } from "./Wallet"

export default function HeaderWallet({ connected, wallet, connect, setSigner }) {

    return (
        <div className="flex md:order-2">
            {!connected
                ? <ConnectButton 
                    connect={connect} 
                    setSigner={setSigner}/>
                : <Wallet wallet={wallet}/>}
        </div>
    )
}
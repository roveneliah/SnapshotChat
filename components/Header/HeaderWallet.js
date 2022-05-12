import { Wallet } from "./Wallet";
import { Button } from "../Buttons/Button";

export default function HeaderWallet({
  wallet,
  connect,
  disconnect,
  wrongNetwork,
}) {
  return (
    <div className="flex md:order-2">
      {!wallet.loaded ? (
        <Button
          title="Connect"
          onClick={connect}
          color="hollow"
          className="bg-cards bg-opacity-75"
        />
      ) : (
        wallet && (
          <Wallet
            wallet={wallet}
            disconnect={disconnect}
            wrongNetwork={wrongNetwork}
          />
        )
      )}
    </div>
  );
}

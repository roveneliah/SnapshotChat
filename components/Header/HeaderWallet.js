import { Wallet } from "./Wallet";
import { Button } from "../Buttons/Button";

export default function HeaderWallet({
  wallet,
  connect,
  disconnect,
  wrongNetwork,
}) {
  return (
    <div className="flex flex-row space-x-2 md:order-2">
      {!wallet.loaded ? (
        <Button
          title="Connect"
          onClick={connect}
          color="hollow"
          className="bg-cards/75"
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
      <Button
        title="Forum"
        onClick={() => {}}
        color="hollowFull"
        className=" bg-cards/75 "
      />
    </div>
  );
}

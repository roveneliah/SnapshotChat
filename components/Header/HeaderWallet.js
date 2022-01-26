import { Wallet } from "./Wallet";
import { Button } from "../Buttons/Button";

export default function HeaderWallet({ wallet, connect }) {
  return (
    <div className="flex md:order-2">
      {!wallet ? (
        <Button title="Connect" onClick={connect} color="hollow" />
      ) : (
        wallet && <Wallet wallet={wallet} />
      )}
    </div>
  );
}

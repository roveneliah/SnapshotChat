import { balanceOf } from "./balanceOf";
import { address } from "../../types/Address";
import { $KRAUSE } from "../../config";

export const getKrauseBalances = async (
  provider: any,
  addresses: address[]
) => {
  const balances = await Promise.all(
    addresses.map((addr) => balanceOf(provider, $KRAUSE)(addr))
  );
  return balances;
};

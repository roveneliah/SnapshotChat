import { balanceOf } from "../balanceOf";
import { $KRAUSE, CROWDFUND } from "../../config";
export const fetchWalletBalance = async (provider, signer) => {
  if (signer) {
    const address = await signer.getAddress();
    return {
      $KRAUSE: (await balanceOf(provider, $KRAUSE)(address)) / 1e18,
      TICKETS: await balanceOf(provider, CROWDFUND)(address),
    };
  }
};

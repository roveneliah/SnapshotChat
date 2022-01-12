import { balanceOf } from "./balanceOf";
import { $KRAUSE, CROWDFUND } from "../config";
// fetch krause balance if not fetched yet
export const fetchWalletBalance = async (provider, signer) => {
    if (signer) {
      const address = await signer.getAddress();
      return {
          $KRAUSE: await balanceOf(provider, $KRAUSE)(address)/(1e18),
          TICKETS: await balanceOf(provider, CROWDFUND)(address)
      }
    }
}
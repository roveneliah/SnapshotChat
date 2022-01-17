
import { $KRAUSE, CROWDFUND } from "../config";
import { balanceOf } from "./balanceOf";

export const getKHWallet = (provider) => async (address) => {
    const getKrauseBalance = balanceOf(provider, $KRAUSE);
    const getTicketBalance = balanceOf(provider, CROWDFUND);
  
    return ({
      $KRAUSE: await getKrauseBalance(address) / 1e18,
      TICKETS: await getTicketBalance(address)
    })
}
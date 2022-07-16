import { isMainnet } from "../../components/Web3Container";
import {
  $KRAUSE,
  V2_TICKETS,
  club_tokenIds,
  courtside_tokenIds,
  CROWDFUND,
  tokenOfOwnerByIndex,
  upper_tokenIds,
} from "../../config";
import { balanceOf } from "./balanceOf";
import { ownerOf } from "./ownerOf";

export const getKHWallet = (provider) => async (address) => {
  const getKrauseBalance = balanceOf(provider, $KRAUSE);
  const getTicketBalance = balanceOf(provider, V2_TICKETS);
  const getOldTicketBalance = balanceOf(provider, CROWDFUND);

  const krauseBalance = (await getKrauseBalance(address)) / 1e18;
  const ticketBalance = Number(await getTicketBalance(address));
  const oldTicketBalance = Number(await getOldTicketBalance(address));
  const hodler = krauseBalance || ticketBalance || oldTicketBalance;
  return {
    address,
    $KRAUSE: krauseBalance,
    TICKETS: ticketBalance,
    TICKETS_OLD: oldTicketBalance,
    hodler, // TODO: generalize into a more abstracted token gating mechanism
    loaded: true,
  };
};

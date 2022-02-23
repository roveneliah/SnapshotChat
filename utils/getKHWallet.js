import {
  $KRAUSE,
  club_tokenIds,
  courtside_tokenIds,
  CROWDFUND,
  tokenOfOwnerByIndex,
  upper_tokenIds,
} from "../config";
import { balanceOf } from "./balanceOf";
import { ownerOf } from "./ownerOf";

export const getKHWallet = (provider) => async (address) => {
  const getKrauseBalance = balanceOf(provider, $KRAUSE);
  const getTicketBalance = balanceOf(provider, CROWDFUND);
  // const getClubBalance = async (address) =>
  //   await club_tokenIds.reduce(async (nTickets, tokenId) => {
  //     const owner = await ownerOf(provider, CROWDFUND)(tokenId);
  //     return Promise.resolve(owner === address ? nTickets + 1 : nTickets);
  //   }, Promise.resolve(0));

  const krauseBalance = (await getKrauseBalance(address)) / 1e18;
  const ticketBalance = Number(await getTicketBalance(address));
  return {
    address,
    $KRAUSE: krauseBalance,
    TICKETS: ticketBalance,
    hodler: krauseBalance || ticketBalance,
    // CLUB: await getClubBalance(address),
    // UPPER: await getUpperBalance(address),
  };
};

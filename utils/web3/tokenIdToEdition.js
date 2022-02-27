import { ethers } from "ethers";
import {
  balanceOfAbi,
  crowdfundAbi,
  tokenOfOwnerByIndex,
  tokenToEditionAbi,
} from "../../config";

export const tokenToEdition =
  (provider, contractAddress) => async (tokenId) => {
    const contract = new ethers.Contract(
      contractAddress,
      crowdfundAbi,
      provider
    );

    return await contract.tokenToEdition(tokenId).then((x) => x.toNumber());
    // .tokenOfOwnerByIndex(address, 0)
    // .then((x) => console.log(x));
    // .then.then((x) => console.log(x));
    // .then((x) => console.log(x.toString()));
    // return await contract.tokenToEdition(address).then((x) => x.toString());
  };

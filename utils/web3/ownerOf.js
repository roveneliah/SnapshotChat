import { ethers } from "ethers";
import { crowdfundAbi } from "../../config";

export const ownerOf = (provider, contractAddress) => async (address) => {
  const contract = new ethers.Contract(contractAddress, crowdfundAbi, provider);
  return await contract.ownerOf(address).then((x) => x.toString());
};

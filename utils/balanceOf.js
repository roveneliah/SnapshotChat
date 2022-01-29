import { ethers } from "ethers";
import { balanceOfAbi } from "../config";

export const balanceOf = (provider, contractAddress) => async (address) => {
  const contract = new ethers.Contract(contractAddress, balanceOfAbi, provider);
  return await contract.balanceOf(address).then((x) => x.toString());
};

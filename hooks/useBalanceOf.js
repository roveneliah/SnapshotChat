import { useEffect, useState } from "react";
import { balanceOf } from "../utils/web3/balanceOf";

export const useBalanceOf = (provider, tokenAddress, userAddress) => {
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    balanceOf(provider, tokenAddress)(userAddress).then(setBalance);
  }, []);
  return balance;
};

import { useEffect, useState } from "react";

export const isMainnet = async (provider: any) =>
  provider
    ?.getNetwork()
    .then(({ chainId }: { chainId: number }): boolean => chainId !== 1);

export const useIsWrongNetwork = (provider: any): boolean => {
  const [wrongNetwork, setWrongNetwork] = useState<boolean>(false);
  useEffect(() => {
    isMainnet(provider).then(setWrongNetwork);
  }, [provider]);
  return wrongNetwork;
};

// export const isMainnet = async (provider) =>
//   provider?.getNetwork().then(({ chainId }) => chainId !== 1);

// export const useIsWrongNetwork = (provider) => {
//   const [wrongNetwork, setWrongNetwork] = useState(false);
//   useEffect(async () => {
//     isMainnet(provider).then(setWrongNetwork);
//   }, [provider]);
//   return wrongNetwork;
// };

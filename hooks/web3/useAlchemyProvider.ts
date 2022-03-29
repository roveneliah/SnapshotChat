import { useState, useEffect } from "react";
import { AlchemyProvider } from "@ethersproject/providers";

export const useAlchemyProvider = () => {
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    const alchemy = new AlchemyProvider(
      undefined,
      process.env.NEXT_PUBLIC_ALCHEMY
    );
    setProvider(alchemy);
  }, []);

  return [provider, setProvider];
};

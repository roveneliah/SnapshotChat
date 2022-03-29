export const isMainnet = async (provider: any): Promise<boolean> =>
  provider
    ?.getNetwork()
    .then(({ chainId }: { chainId: number }): boolean => chainId !== 1);

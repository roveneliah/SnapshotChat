import { address } from "./Address";

export interface Strategy {
  name: string;
  params: {
    address?: address;
    symbol?: string;
    decimals?: number;
  };
}

import { address } from "./Address";

export interface Wallet {
  address?: address;
  $KRAUSE?: number;
  TICKETS?: number;
  hodler?: boolean;
  loaded: boolean;
}

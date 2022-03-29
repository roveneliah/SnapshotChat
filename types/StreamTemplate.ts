import { address } from "./Address";

export interface StreamTemplate {
  author: address;
  recipient: string;
  request: {
    usdc: string;
    krause: string;
  };
  description: string;
  signers: any;
  signature: string;
  markdown?: string;
  title?: string;
  id: string;
  state: string;
}

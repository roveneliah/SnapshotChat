import { address } from "./Address";
export interface SnapshotVote {
  voter: address;
  id: string;
  created: number;
  vp: number; // voting power
  choice: number;
  space: {
    id: string;
  };
  metadata: {
    message: string;
  };
}

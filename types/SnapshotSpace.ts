import { Strategy } from "./Strategy";

export interface SnapshotSpace {
  name: string;
  strategies: Strategy[];
  network: string;
}

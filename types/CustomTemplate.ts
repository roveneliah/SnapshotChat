import { address } from "./Address";

export interface CustomTemplate {
  title: string;
  author: address;
  choices: string[];
  url: string;
  state: string;
  id: string;
  signature: string;
}

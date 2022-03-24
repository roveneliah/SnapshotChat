import { compose, map, pipe } from "ramda";
import { useEffect, useState } from "react";
import { getDrafts } from "../../utils/firestore";
import { address } from "../web3/useGetWeb3";

export interface CustomTemplate {
  title: string;
  author: address;
  choices: string[];
  url: string;
  state: string;
  id: string;
  signature: string;
}

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

export const useGetDrafts = () => {
  const [drafts, setDrafts] = useState<any>([]);
  useEffect(() => {
    getDrafts(pipe(addMarkdown, setDrafts));
  }, []);
  return drafts;
};

const addMarkdown = (drafts: any): StreamTemplate[] =>
  drafts
    ?.filter((draft: any) => draft.type === "Do-ocracy Stream Request")
    .map((draft: StreamTemplate) => ({
      ...draft,
      markdown: toTemplate(draft),
    }));

export function toTemplate(stream: StreamTemplate) {
  return `${stream.title}

---
### Requesting up to..
${stream.request.usdc} $USDC / month
${stream.request.krause} $KRAUSE / month
Paid bimonthly for 2 months. Stewardship team may cancel this agreement at any point. Community may submit a proposal to cancel this agreement at any point.
---
### Scope of Work
A stream request is designed to give contributors freedom and encouragement to work across multiple domains across the DAO; however, here are the current main focuses / intentions:
${stream.description}
---
### Specification
This contributor may submit a request for up to the specified amount based on self-assessment of their work.
### Intention
This is intended to encourage contributors to take immediate action on a wide range of problems/opportunities, as opposed to proceeding through the slower process of submitting a proposal for a narrow scope of work.
We prefer to invest in and groom talent, giving them the freedom and capital they need to be entrepreneurs within our community. We value self-starters who are able to take action and deliver quality work.
### bUt SomEb0dY m1gHt t@kE t0o mUçh
Both the community and the Stewardship team has the power to cancel this stream if it is being abused. In addition, if a contributor abuses this trust, they are effectively burning their social credibility and ability to successfully submit proposals in the future. We expect some lossiness; however, we believe the benefits of getting good work off the ground is worth this small cost.`;
}

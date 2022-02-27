import snapshot from "@snapshot-labs/snapshot.js";
import { either, equals } from "ramda";

export const vote =
  (provider) =>
  async ({ proposalId, voteType, choice, space, message, mirror }) => {
    if (!either(equals("basic"), equals("single-choice"))(voteType)) {
      console.log(`${voteType} not yet supported.`);
      return;
    }

    const hub = "https://hub.snapshot.org"; // or https://testnet.snapshot.org for testnet
    const client = new snapshot.Client712(hub);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    console.log("CASTING VOTE");
    console.log(space.id, choice);
    const receipt = await client.vote(provider, address, {
      space,
      proposal: proposalId,
      type: voteType,
      choice,
      metadata: JSON.stringify({
        message,
        mirror,
      }),
    });
    console.log("RECEIPT");
    console.log(receipt);
  };

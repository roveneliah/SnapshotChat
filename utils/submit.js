import { addPost } from "./firestore";
import { balanceOf } from "./balanceOf";
import { CROWDFUND } from "../config";

export const signMessage = (signer) => async (message) => {
  console.log(1);
  const signature = await signer.signMessage(JSON.stringify(message));
  console.log(2);
  return { ...message, signature };
};
export const submit = (signer) => async (msg) => await signer.signMessage(msg);

export const submitPost = (provider) => async (proposalId, post, outcome) => {
  console.log("GETTING TICKET BALANCE");
  if (!provider) return;
  const signer = await provider.getSigner();
  const tickets = await balanceOf(
    provider,
    CROWDFUND
  )(await signer.getAddress());
  console.log(tickets);
  const ticketHolder = provider && tickets > 0;
  console.log("TICKETHOLDER");
  console.log(ticketHolder);

  // can only vote if ticketholder
  // if (!ticketHolder) return;

  const signature = await signer.signMessage(
    JSON.stringify({
      author: await signer.getAddress(),
      post,
      outcome,
    })
  );

  await addPost(provider)(proposalId, {
    author: await signer.getAddress(),
    post,
    outcome,
    signature,
  });
};

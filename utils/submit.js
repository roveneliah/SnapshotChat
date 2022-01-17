
import { addPost } from "./firestore";
import { balanceOf } from "./balanceOf";
import { CROWDFUND } from "../config"; 

export const submit = (signer) => async (msg) => {
    // check if this person has a token balance
    const signature = await signer.signMessage(msg);
    console.log(signature);
    console.log(ethers.utils.verifyMessage(msg, signature));
}

export const submitPost = (provider) => async (proposalId, post, outcome) => {
    console.log("GETTING TICKET BALANCE")
    const signer = await provider.getSigner()
    const tickets = await balanceOf(provider, CROWDFUND)(await signer.getAddress())
    console.log(tickets);
    const ticketHolder = provider && tickets > 0;
    console.log("TICKETHOLDER")
    console.log(ticketHolder)

    if (!ticketHolder) return;

    const signature = await signer.signMessage(JSON.stringify({
      author: await signer.getAddress(),
      post,
      outcome,
    }));

    await addPost(provider)(proposalId, {
      author: await signer.getAddress(),
      post,
      outcome,
      signature
    })
}
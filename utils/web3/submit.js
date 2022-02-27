import { addPost } from "../firestore";
import { balanceOf } from "./balanceOf";
import { CROWDFUND } from "../../config";

export const signMessage = (signer) => async (message) => {
  const signature = await signer.signMessage(JSON.stringify(message));
  return { ...message, signature };
};

export const submit = (signer) => async (msg) => {
  return await signer.signMessage(msg);
};

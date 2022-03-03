import { useEffect, useState } from "react";
import { Button } from "../../../Buttons/Button";
import Selector from "./Selector";
import { HeadingFaint } from "../../../Generics/Headings/HeadingFaint";
import { useForm } from "../../../../hooks/useForm";
import { signMessage } from "../../../../utils/web3/submit";
import { addPost } from "../../../../utils/firestore";

export default function CommentBox({ proposal, connection }) {
  const { provider, signer, wallet, snapshotVote } = connection;
  const [postText, updatePostText, setFormText] = useForm("");
  const [selectedChoice, setSelectedChoice] = useState();

  const postComment = async () => {
    if (!signer) return;

    const post = await signMessage(signer)({
      proposalId: proposal.id,
      author: await signer.getAddress(),
      post: postText,
      outcome: proposal.choices[selectedChoice],
    });

    setFormText("");
    await addPost(provider)(proposal.id, post);
  };

  const submitToSnapshot = () =>
    snapshotVote({
      choice: selectedChoice + 1,
      proposalId: proposal.id,
      voteType: proposal.type,
      space: proposal.space.id,
      message: postText,
    });

  return wallet?.hodler ? (
    <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <HeadingFaint title="Post your thoughts." />
      <Selector
        proposal={proposal}
        selectedChoice={selectedChoice}
        setSelectedChoice={setSelectedChoice}
      />
      <textarea
        id="message"
        rows="5"
        className="block p-2 w-full caret-purple-400 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
        value={postText}
        onChange={updatePostText}
      />
      <div className="flex flex-row space-x-3">
        <Button title="Post" color="purple" icon={true} onClick={postComment} />
        <Button
          title="Vote"
          color="purple"
          icon={true}
          onClick={submitToSnapshot}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}

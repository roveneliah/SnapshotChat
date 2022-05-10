import { useEffect, useState } from "react";
import { Button } from "../../../Buttons/Button";
import Selector from "./Selector";
import { HeadingFaint } from "../../../Generics/Headings/HeadingFaint";
import { useForm } from "../../../../hooks/useForm";
import { signMessage } from "../../../../utils/web3/submit";
import { addDraftPost, addPost } from "../../../../utils/firestore";

export default function CommentBox({ proposal, connection }) {
  const { provider, signer, wallet, snapshotVote } = connection;
  const [postText, updatePostText, setPostText] = useForm("");
  const [selectedChoice, setSelectedChoice] = useState();

  // TODO: Add "Retrospective" if vote status is closed
  const postComment = async () => {
    if (!signer) return;

    const post = await signMessage(signer)({
      proposalId: proposal.id,
      author: await signer.getAddress(),
      post: postText,
      outcome: proposal.choices[selectedChoice],
      retrospective: proposal.state === "closed",
    });

    setPostText("");
    proposal.state === "review"
      ? await addDraftPost(provider)(proposal.id, post)
      : await addPost(provider)(proposal.id, post);
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
      {proposal.state === "closed" ? (
        <>
          <div className="rounded-lg bg-orange-200 w-fit px-7 pt-2">
            <HeadingFaint title="Retrospective" size="2xl" />
          </div>
          <HeadingFaint
            title="This proposal is closed, but you can write a retrospective to document what went well or poorly."
            size="md"
          />
        </>
      ) : (
        <HeadingFaint title="What do you think?" size="xl" />
      )}
      <Selector
        proposal={proposal}
        selectedChoice={selectedChoice}
        setSelectedChoice={setSelectedChoice}
      />
      <textarea
        rows="5"
        className="block p-2 w-full caret-purple-400 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
        value={postText}
        // onChange={updatePostText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <div className="flex flex-row space-x-3">
        <Button
          title={`Post ${
            proposal.state === "closed" ? "Retrospective" : "Opinion"
          }`}
          color={proposal.state === "closed" ? "orangeFull" : "purple"}
          icon={true}
          onClick={postComment}
        />
        {proposal.state !== "closed" && (
          <Button
            title="Vote on Snapshot"
            color="purple"
            icon={true}
            onClick={submitToSnapshot}
          />
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

import ForumPosts from "./ForumPosts";
import CommentBox from "./CommentBox";
import ProposalCard from "./ProposalCard";

import { submit } from "../../utils/submit";
import { useGetProposalComments } from "../../hooks/useGetProposalComments";

export default function Forum({
  proposal,
  setSelectedProposal,
  signer,
  provider,
}) {
  console.log(provider);
  const posts = useGetProposalComments(provider, proposal);
  console.log(posts);

  return (
    <div className="flex flex-col space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <ProposalCard
        proposal={proposal}
        setSelectedProposal={setSelectedProposal}
      />
      <ForumPosts provider={provider} posts={posts} submit={submit(signer)} />
      <CommentBox proposal={proposal} provider={provider} />
    </div>
  );
}

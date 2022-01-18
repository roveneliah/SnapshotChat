import { useState, useEffect } from 'react';

import ForumPosts from './ForumPosts';
import CommentBox from './CommentBox';
import ProposalCard from './ProposalCard';

import { getPosts } from '../../utils/firestore';
import { printPass } from '../../utils/functional';
import { submit } from '../../utils/submit'

export default function Forum({ proposal, setSelectedProposal, connected, signer, provider, hodler}) {
  
  const [posts, setPosts] = useState();

  useEffect(() => {
    // set the post data, need to load the current token weight
    getPosts(provider)(proposal.id)
      .then(printPass)
      .then(setPosts)
  }, [])

  return (
    <div className="flex flex-col space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <ProposalCard proposal={proposal} setSelectedProposal={setSelectedProposal} />
      <ForumPosts posts={posts} submit={submit(signer)} connected={connected}/>
      <CommentBox proposal={proposal} provider={provider}/>
    </div>
  );
}
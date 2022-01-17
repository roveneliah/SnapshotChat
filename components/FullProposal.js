import { useState } from 'react';
import Markdown from 'markdown-to-jsx'
import Link from 'next/link';
import Image from 'next/image';
import { Posts } from './Posts';
import { submit, submitPost } from '../utils/submit'
import { useEffect } from 'react/cjs/react.development';
import { compose, prop, map } from 'ramda';
import { getPosts } from '../utils/firestore';
import { ChoiceList } from './ChoicesList';

import { toPercentStr } from '../utils/functional';

// dummy data
import { samplePostData } from '../dummyData/posts';
import { printPass } from '../utils/functional';

export const FullProposal = ({ proposal, setSelectedProposal, connected, signer, provider, hodler}) => {
  
  const [memberSupport, setMemberSupport] = useState(Math.random());
  const [tokenWeightedSupport, setTokenWeightedSupport] = useState(Math.random());
  const [posts, setPosts] = useState();
  const [postText, setPostText] = useState("");
  const [selectedChoice, setSelectedChoice] = useState();

  useEffect(() => {
    // set the post data, need to load the current token weight
    getPosts(provider)(proposal.id)
      .then(printPass)
      .then(setPosts)

  }, [])

  return (
    <div className="flex flex-col space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {proposal.title}
            </h3>
            <div className="flex flex-col space-y-5 w-full justify-evenly">
              {memberSupport && (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700 dark:text-white">Member Support</span>
                    <span className="text-sm font-medium text-blue-700 dark:text-white">{toPercentStr(memberSupport)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-purple-300 h-2.5 rounded-full" style={{width: toPercentStr(memberSupport)}}/>
                  </div>
                </div>
              )}
              {tokenWeightedSupport && (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-blue-700 dark:text-white">Token Weighted Support</span>
                    <span className="text-sm font-medium text-blue-700 dark:text-white">{toPercentStr(tokenWeightedSupport)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-purple-300 h-2.5 rounded-full" style={{width: toPercentStr(tokenWeightedSupport)}}/>
                  </div>
                </div>
              )}
            </div>
            <div className='flex flex-row space-x-2'>
              <a onClick={() => setSelectedProposal(null)} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-300 rounded-lg hover:bg-red-400 focus:ring-4 focus:ring-red-300 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-800">
                  Back
              </a>
              <a href={`https://snapshot.org/#/krausehouse.eth/proposal/${proposal.id}`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  View on Snapshot
                  <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
            </div>
        </div>
        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <Markdown>
            {proposal.body}
          </Markdown>
        </p> */}
        {/* <Markdown>{proposal.body}</Markdown> */}
        {posts && <Posts posts={posts} submit={submit(signer)} connected={connected}/>}
        {hodler ? (
          <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <label for="message" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-400">
              Post your thoughts.
            </label>
            <div class="inline-flex rounded-md shadow-sm">
              {proposal.choices.map((choice, i) => {
                // const roundedness = i === 0 ? 'rounded-l-lg' : (i === proposal.choices.length - 1) ? 'rounded-r-md' : '';
                // const selected = i === selectedChoice 
                //                           ? 'text-blue-700 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-purple-700 dark:bg-purple-300 dark:border-gray-600 dark:text-purple-900 dark:hover:text-purple-900 dark:hover:bg-purple-300 dark:focus:text-white'
                //                           : 'text-blue-700 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
                const selected = i === selectedChoice
                                          ? 'bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900'
                                          :'bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900'
                return (
                  <span onClick={() => setSelectedChoice(i)} className={selected}>
                    {choice}
                  </span>
                  // <a onClick={() => setSelectedChoice(i)} class={`${roundedness} ${selected} py-2 px-4 text-sm font-medium `}>
                  //   {choice}
                  // </a>
                )
              })}
            </div>
            <textarea id="message" rows="4" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={postText} onChange={compose(setPostText, prop("value"), prop("target"))}/>
            <a onClick={() => submitPost(provider)(proposal.id, postText, proposal.choices[selectedChoice])} className="inline-flex items-center max-w-min py-2 px-3 text-sm font-medium text-center text-purple-900 bg-purple-300 rounded-lg hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 dark:bg-purple-200 dark:hover:bg-purple-300 dark:focus:ring-purple-200">
                Submit
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
          </div>
        ) : (
          <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <label for="message" className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-400">
              Ticket Holders can post their opinions here.
            </label>
            <div class="p-4 mb-4 text-sm text-gray-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-gray-800" role="alert">
              If you're looking for one, you can hunt one down on an NFT marketplace.
            </div>
            <a href="https://rarible.com/collection/0xc4e0f3ec24972c75df7c716922096f4270b7bb4e/items" className="inline-flex items-center max-w-min py-2 px-3 text-sm font-medium text-center text-purple-900 bg-purple-300 rounded-lg hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 dark:bg-purple-200 dark:hover:bg-purple-300 dark:focus:ring-purple-200">
                Rarible
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
          </div>
        )}
    </div>
  );
}
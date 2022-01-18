import { useState } from "react";
import { compose, prop } from "ramda";
import { submitPost } from '../../../utils/submit'
import { Button } from "../../Buttons/Button";
import Selector from "./Selector";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";

export default function CommentBox({ proposal, provider }) {
    const [postText, setPostText] = useState("");
    const [selectedChoice, setSelectedChoice] = useState();

    const postComment = () => submitPost(provider)(proposal.id, postText, proposal.choices[selectedChoice])

    return (
        <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <HeadingFaint title="Post your thoughts." />
          <Selector proposal={proposal} selectedChoice={selectedChoice} setSelectedChoice={setSelectedChoice} />
          <textarea id="message" rows="4" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={postText} onChange={compose(setPostText, prop("value"), prop("target"))}/>
          <Button title="Submit" color="purple" icon={true} onClick={postComment} />
        </div>
    )

}
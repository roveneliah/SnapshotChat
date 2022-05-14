import { compose, prop } from "ramda";
import { useForm } from "../../../hooks/useForm";
import { createDraft } from "../../../utils/firestore";
import { signMessage } from "../../../utils/web3/submit";
import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";

export const CustomForm = ({
  signer,
  hodler,
  title,
  updateTitle,
  url,
  updateUrl,
}) => {
  const complete = title && url && hodler;
  const submitCustomProposal = async () => {
    if (!hodler || !complete) return;

    const proposal = await signMessage(signer)({
      title,
      url,
      type: "Custom Proposal",
      author: await signer.getAddress(),
      choices: ["Approve", "Conditional Approval", "Needs Edits"],
      state: "review",
    });

    createDraft(proposal);
  };
  return (
    <div className="flex h-min flex-col space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col space-y-1">
        <HeadingFaint title="Custom Proposal" size="xl" />
        <HeadingFaint title="Title" size="lg" />
        <HeadingFaint
          title="Clear + concise title, focus on actions/changes not outcomes/goals."
          size="sm"
        />
        <input
          value={title}
          onChange={updateTitle}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder=""
        />
      </div>
      <div className="flex flex-col space-y-1">
        <HeadingFaint title="Link to Markdown" size="lg" />
        <a href="https://hackmd.io/">
          <HeadingFaint
            title="Checkout hackmd.io to preview formatting."
            size="sm"
          />
        </a>
        <HeadingFaint
          title="Proposals should prioritize clarity about what changes they call for and how they should be executed."
          size="sm"
        />
        <input
          value={url}
          onChange={updateUrl}
          // rows="4"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder=""
        />
      </div>
      {complete && (
        <div>
          <Button
            title="Submit"
            color="purple"
            onClick={async () => {
              await submitCustomProposal();
              // window.open("/", "_self");
            }}
            icon={true}
          />
        </div>
      )}
    </div>
  );
};

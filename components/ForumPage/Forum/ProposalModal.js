import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import { VoteButtons } from "./ForumPosts/VoteButtons";
import { ChoiceFilters } from "./ProposalCard/ChoiceFilters";

const ProposalView = ({ proposal, scores }) => (
  <div className="flex flex-col h-[80vh] overflow-auto space-y-6 p-4 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <div className="pb-8 space-y-4 rounded-lg border border-gray-300 shadow-lg p-5">
      <Image src="/kh_logo.png" width={150} height={60} />
      <Heading title={proposal.title} size="2xl" />
      <Heading title={`Posted by ${proposal.author}`} size="xs" />
    </div>
    <div className="rounded-lg border border-gray-300 shadow-lg p-5">
      <Markdown
        options={{
          overrides: {
            h1: { component: MarkdownHeader, props: { size: "2xl" } },
            h2: { component: MarkdownHeader, props: { size: "xl" } },
            h3: { component: MarkdownHeader, props: { size: "lg" } },
            p: {
              component: MarkdownHeader,
              props: { size: "sm", className: "mb-8" },
            },
            li: {
              component: ({ children }) => <p className="mb-4">• {children}</p>,
            },
            hr: { component: () => <hr className="mb-8" /> },
          },
        }}
      >
        {proposal.body}
      </Markdown>
    </div>
    <div className="pb-8 space-y-4 rounded-lg border border-gray-300 shadow-md p-5">
      <Heading title="Options" size="2xl" />
      <ChoiceFilters proposal={proposal} scores={scores} />
    </div>
  </div>
);

function MarkdownHeader({ children, ...props }) {
  return (
    <Heading title={children} size={props.size} className={props.className} />
  );
}

export function ProposalModal({ proposal, scores }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button title="View Proposal" color="hollowFull" onClick={openModal} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center bg-black bg-opacity-80">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-[70vw] xl:w-[95vh] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-200  shadow-2xl rounded-lg">
                <ProposalView proposal={proposal} scores={scores} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

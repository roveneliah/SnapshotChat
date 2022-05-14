import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import { VoteButtons } from "./ForumPosts/VoteButtons";
import { ChoiceFilters } from "./ProposalCard/ChoiceFilters";

const testMd = `# Heading 1
### Heading 3
Body text...`;

const ProposalView = ({ proposal, scores }) => (
  <div className="flex h-[80vh] flex-col space-y-6 overflow-auto rounded-lg p-4">
    <div className="space-y-4 rounded-lg border border-gray-300 px-12 py-8 shadow-lg">
      <Image src="/kh_logo.png" width={150} height={60} />
      <Heading title={proposal.title} size="2xl" />
      <Heading title={`Posted by ${proposal.author}`} size="xs" />
    </div>
    <div className="rounded-lg border border-gray-300 px-12 py-4 shadow-lg">
      <Markdown
        options={{
          overrides: {
            // h1: { component: MarkdownHeader, props: { size: "2xl" } },
            h1: {
              component: ({ children }) => (
                <p className="mt-7 mb-2 text-2xl font-bold">{children}</p>
              ),
            },
            h2: {
              component: ({ children }) => (
                <p className="mt-7 mb-2 text-xl font-bold">{children}</p>
              ),
            },
            h3: {
              component: ({ children }) => (
                <p className="mt-7 mb-2 text-lg font-bold">{children}</p>
              ),
            },
            // h2: { component: MarkdownHeader, props: { size: "xl" } },
            // h3: { component: MarkdownHeader, props: { size: "lg" } },
            // p: {
            //   component: MarkdownHeader,
            //   props: {
            //     size: "sm",
            //     className: "font-normal",
            //   },
            // },
            p: {
              component: ({ children }) => <p className="mb-5">{children}</p>,
            },
            li: {
              component: ({ children }) => <p className="">• {children}</p>,
            },
            ul: {
              component: ({ children }) => <ul className="mb-5">{children}</ul>,
            },
            hr: {
              component: () => <div className="my-8 border border-black" />,
            },
            code: {
              component: ({ children }) => (
                <code className="text-gray-500">{children}</code>
              ),
            },
          },
        }}
      >
        {proposal.body}
      </Markdown>
    </div>
    <div className="space-y-4 rounded-lg border border-gray-300 p-5 pb-8 shadow-md">
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
          <div className="min-h-screen bg-black bg-opacity-80 px-4 text-center">
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
              <div className="my-8 inline-block w-[70vw] transform overflow-hidden rounded-lg bg-purple-100 p-6 text-left align-middle shadow-2xl  transition-all xl:w-[95vh]">
                <ProposalView proposal={proposal} scores={scores} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

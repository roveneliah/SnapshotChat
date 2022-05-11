import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import Markdown from "markdown-to-jsx";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";

const ProposalView = ({ proposal }) => (
  <div className="flex flex-col h-[80vh] overflow-auto space-y-6 p-12 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <Heading title={proposal.title} size="2xl" />
    <Markdown
      children={proposal.body}
      options={{
        overrides: {
          h1: { component: MarkdownHeader, props: { size: "2xl" } },
          h2: { component: MarkdownHeader, props: { size: "xl" } },
          h3: { component: MarkdownHeader, props: { size: "lg" } },
          p: { component: MarkdownHeader, props: { className: "mb-4" } },
          li: {
            component: ({ children }) => <p className="mb-4">• {children}</p>,
          },
          hr: { component: () => <hr className="mb-8" /> },
        },
      }}
    />
  </div>
);

function MarkdownHeader({ children, ...props }) {
  return (
    <Heading title={children} size={props.size} className={props.className} />
  );
}

export function ProposalModal({ proposal }) {
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
          <div className="min-h-screen px-4 text-center bg-black bg-opacity-70">
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
              <div className="inline-block w-[70vw] xl:w-[95vh] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-cards  shadow-2xl rounded-lg">
                <ProposalView proposal={proposal} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

import { useState } from "react";
import { shortenAddress } from "../../utils/web3/shortenAddress";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

export function ViewOnlyModal() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <span
        onClick={openModal}
        className="bg-orange-100 text-orange-800 hover:dark:bg-orange-300 mr-2 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900"
      >
        View Only Mode
      </span>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
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
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white  shadow-2xl rounded-2xl">
                <div>
                  <div className="flex flex-col space-y-4">
                    <Image
                      src="https://i.giphy.com/media/5xaOcLxIG8VahUOdOpO/giphy.webp"
                      width={400}
                      height={300}
                      className="rounded-lg mb-10"
                    />
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      View Only Mode
                    </Dialog.Title>
                    <p className="text-sm text-gray-500">
                      If you have $KRAUSE or a Ticket, please login with that
                      wallet.
                    </p>
                    <p className="text-sm text-gray-500">
                      Without $KRAUSE or a Ticket, you are in View Only Mode and
                      <p className="font-bold">
                        will not be able to post comments.
                      </p>
                    </p>
                    <p className="text-sm text-gray-500">
                      This is designed to prevent spam and give the community a
                      high-signal place to congregate and sensemake together.
                    </p>
                    <p className="text-sm text-gray-500">
                      You can pickup a Ticket on an NFT marketplace or{" "}
                      <p className="font-bold">
                        earn some $KRAUSE by helping out.
                      </p>
                    </p>
                  </div>

                  <div className="flex flex-row justify-between space-x-3 mt-12">
                    <div>
                      <a
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-100 border border-transparent rounded-md hover:bg-purple-200 focus:outline-none"
                        href="https://rarible.com/collection/0xc4e0f3ec24972c75df7c716922096f4270b7bb4e/items"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Snag a ticket.
                      </a>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export const Wallet = ({ wallet, disconnect, wrongNetwork }) => {
  return (
    <div>
      {wallet.hodler ? (
        <>
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
            {wallet?.$KRAUSE || 0} $KRAUSE
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
            {wallet?.TICKETS || 0} Genesis Tickets
          </span>
        </>
      ) : (
        <>
          {wrongNetwork && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
              Wrong Network
            </span>
          )}
          <ViewOnlyModal />
        </>
      )}
      {wallet.loaded && (
        <span
          onClick={() => disconnect()}
          className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900"
        >
          {shortenAddress(wallet.address)}
        </span>
      )}
    </div>
  );
};

import { useState } from "react";
import { shortenAddress } from "../../utils/web3/shortenAddress";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { Button } from "../Buttons/Button";

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
      <Button title="View Only Mode" color="orangeFull" onClick={openModal} />
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
              <div className="my-8 inline-block w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  shadow-2xl transition-all">
                <div>
                  <div className="flex flex-col space-y-4">
                    <Image
                      src="https://i.giphy.com/media/5xaOcLxIG8VahUOdOpO/giphy.webp"
                      alt=";("
                      width={400}
                      height={300}
                      className="mb-10 rounded-lg"
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

                  <div className="mt-12 flex flex-row justify-between space-x-3">
                    <div>
                      <a
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none"
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
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none"
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
    <div className="flex flex-row space-x-2">
      {wallet.hodler ? (
        <div className="invisible md:visible">
          <Button
            title={`${wallet?.$KRAUSE?.toFixed(0) || 0} $KRAUSE`}
            color="hollowFull"
            className="bg-cards/75"
          />
        </div>
      ) : (
        <>
          {wrongNetwork && <Button title="Wrong Network" color="yellowFull" />}
          <ViewOnlyModal />
        </>
      )}
      {wallet.loaded && (
        <>
          <div className="invisible sm:visible">
            <Button
              title={shortenAddress(wallet.address)}
              color="hollowFull"
              href="/profile"
              newTab={true}
              className="bg-cards/75"
            />
          </div>
          <div>
            <Button
              title="Disconnect"
              onClick={() => disconnect()}
              color="hollowFull"
              className="bg-cards/75"
            />
          </div>
        </>
      )}
    </div>
  );
};

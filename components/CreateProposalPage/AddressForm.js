import { compose, prop } from "ramda";
import { useState } from "react";

import { getAddress } from "ethers/lib/utils";
import { Button } from "../Buttons/Button";

const getIsValidAddress = (address) =>
  new Promise((resolve, reject) => {
    const addr = getAddress(address);
    console.log(addr ? true : false);
    resolve(true);
  });

export const AddressForm = ({ addSigner }) => {
  const [name, setName] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [isInvalidAddress, setIsInvalidAddress] = useState();

  const addIfValidSigner = () =>
    getIsValidAddress(addressInput)
      .then(() => {
        console.log("Valid Address: Can Add Signer");
        addSigner({ signer: name, address: addressInput });
      })
      .catch((e) => {
        console.log("Invalid Address: Cannot Add Signer");
        setIsInvalidAddress(true);
      });

  const invalidForm = {
    label: "block mb-2 text-sm font-medium text-red-700 dark:text-red-500",
    input:
      "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400",
  };
  const neutralForm = {
    label:
      "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500 placeholder:text-gray-400",
    input:
      "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400",
  };

  return (
    <div>
      <div className="flex flex-row space-x-3 justify-evenly">
        <div className="mb-6 w-1/2">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            Name
          </label>
          <input
            autoComplete="off"
            value={name}
            onChange={compose(setName, prop("value"), prop("target"))}
            type="text"
            id="username-success"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400"
            placeholder="Lebron"
          />
        </div>
        <div className="w-1/2">
          <div className="mb-6">
            <label
              className={
                isInvalidAddress ? invalidForm.label : neutralForm.label
              }
            >
              Ethereum Address
            </label>
            <input
              value={addressInput}
              onChange={(x) => {
                compose(setAddressInput, prop("value"), prop("target"))(x);
                if (isInvalidAddress) setIsInvalidAddress(false);
              }}
              type="text"
              id="username-success"
              className={
                isInvalidAddress ? invalidForm.input : neutralForm.input
              }
              placeholder="lebron.eth"
            />
          </div>
        </div>
      </div>
      <Button title="Add Signer" color="purple" onClick={addIfValidSigner} />
    </div>
  );
};

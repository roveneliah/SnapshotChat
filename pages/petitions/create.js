import { useEffect, useState } from "react";

import { getKHWallet } from "../../utils/getKHWallet";
import { AlchemyProvider, EtherscanProvider } from "@ethersproject/providers";
import Link from "next/link";
import { Heading } from "../../components/Generics/Headings/Heading";
import Layout from "../../components/Layout";
import Petition from "../../components/Petitions/Petition";
import { PetitionsListView } from "../../components/Petitions/PetitionsListView";
import { Button } from "../../components/Buttons/Button";
import { TeamSelector } from "../../components/CreatePetition/TeamSelector";
import { AddressForm } from "../../components/CreatePetition/AddressForm";

import { connectWallet } from "../../utils/connectWallet";
import { itemByProp, proposalById } from "../../utils/functional";
import { SignatureList } from "../../components/Petitions/SignatureList";
import { Header } from "../../components/Header";

import { getAddress } from "ethers/lib/utils";
import { any, compose, eqProps, map, prop, head } from "ramda";
import Petitions from ".";
import { createPetition } from "../../utils/firestore";

export default function CreatePetition() {
  // I feel like this could all be one object or type...
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState({});
  const [hodler, setHodler] = useState(false);

  // proposal form
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [signers, setSigners] = useState([]);

  // don't want to do repeat work after each rerender if we already have the data, right?
  // how to know when to call db or not? how do we know when it's wiped?
  const hasTicket = (wallet) => wallet?.TICKET > 0;
  useEffect(() => setProvider(new EtherscanProvider()), []);
  useEffect(() => {
    const walletStuff = async () => {
      const address = await signer?.getAddress();
      const wallet = address && (await getKHWallet(provider)(address));
      setWallet(wallet);
      setHodler(hasTicket(wallet));
    };
    walletStuff();
  }, [signer]);

  // need to make sure that it isn't already in there
  // update if it exists...
  const addSigner = (signer) => {
    if (!any(eqProps("address", signer))(signers)) {
      setSigners(
        signers.concat({
          ...signer,
          status: "Pending",
        })
      );
    }
  };

  const addSigners = (s) => {
    console.log(s);
    const x = s.reduce(
      (signers, signer) =>
        !any(eqProps("address", signer))(signers)
          ? signers.concat({
              ...signer,
              status: "Pending",
              requested: true,
            })
          : signers,
      signers
    );
    setSigners(x);
  };

  const submitPetition = () => {
    // map signers into object
    if (!hodler) return;

    const petition = {
      title: title || "",
      description: description || "",
      signers: signers.reduce(
        (acc, signer) => ({ ...acc, [signer.address]: signer }),
        {}
      ),
      id: `${Math.floor(Math.random() * 1000)}`, // TODO: what to set id as? count of proposals?fasdfasdfasdf
    };

    /// submit to database
    console.log(petition);
    createPetition(petition).then((res) => console.log(res));
  };

  return (
    <Layout
      connected={connected}
      connectWallet={connectWallet}
      setSigner={setSigner}
      setConnected={setConnected}
      setProvider={setProvider}
      wallet={wallet}
    >
      <div className="flex flex-row justify-center">
        <div className="flex flex-col w-2/3 space-y-4 p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col space-y-12 p-6 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <Heading title="Create a petition." size="2xl" />
              <Heading
                title="Petitions allow you to request signatures from specific people to demonstrate support for a sentiment, initiative, or specific request."
                size="lg"
              />
              <Heading title="Uses" size="lg" />
              <p className="leading-relaxed dark:text-gray-400">
                1. Use as legitimacy in more formal proposals.
              </p>
              <p className="leading-relaxed dark:text-gray-400">
                2. Demonstrate grassroots social support for removing an
                existing governance/power structure.
              </p>
              <p className="leading-relaxed dark:text-gray-400">
                3. Gather advice/feedback from curated parties.
              </p>
              <Heading title="Examples" size="lg" />
              <p className="leading-relaxed dark:text-gray-400">
                1. To demonstrate support for my budget proposal, I could get
                sign off from the dev team.
              </p>
              <p className="leading-relaxed dark:text-gray-400">
                2. As a newcomer looking for full-time work, I could get sign
                off from industry experts or coworkers.
              </p>
              <p className="leading-relaxed dark:text-gray-400">
                3. To advocate we rally around Australian teams, I might get
                sign off from NBL leaders or high school players considering
                going overseas.
              </p>
            </div>
            <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div>
                <Heading title="Petition" size="xl" />
                <input
                  value={title}
                  onChange={compose(setTitle, prop("value"), prop("target"))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Let's do something..."
                />
              </div>
              <div>
                <Heading title="Details" size="lg" />
                <textarea
                  value={description}
                  onChange={compose(
                    setDescription,
                    prop("value"),
                    prop("target")
                  )}
                  rows="4"
                  className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Because..."
                ></textarea>
              </div>
              {signers?.length > 0 && (
                <div>
                  <Heading title="Signers" size="xl" />
                  <SignatureList signers={signers} />
                </div>
              )}
              {hodler ? (
                <Link href="/petitions">
                  <Button
                    title="Submit"
                    icon={true}
                    color="purple"
                    onClick={submitPetition}
                  />
                </Link>
              ) : (
                // <Heading title="At the moment, only KRAUSE or Ticket holders can create a petition." size="md" />
                <div
                  className="p-4 mb-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300"
                  role="alert"
                >
                  <span className="font-medium">
                    At the moment, only KRAUSE or Ticket holders can create a
                    petition.
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div>
                <Heading title="Requested Signers" size="lg" />
                <p className="leading-relaxed dark:text-gray-400">
                  You can add individuals or curated teams of signers.
                </p>
              </div>
              <TeamSelector addSigners={addSigners} />
              <AddressForm addSigner={addSigner} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

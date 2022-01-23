import { useEffect, useState } from "react";

import Layout from "../../components/Layout"
import Petition from "../../components/Petitions/Petition";
import { PetitionsListView } from "../../components/Petitions/PetitionsListView";

import { connectWallet } from "../../utils/connectWallet";
import { createPetition, fetchPetitions } from "../../utils/firestore";
import { itemByProp, printPass, proposalById } from "../../utils/functional";


const petitionById = itemByProp("id");
const petitions = [{
    id: "1",
    title: "Vouch for chaiguy.",
    description: "Worked alongside chai, super talented guy.  He has N years of experience at A, and blah blah.",
    author: "flexchapman"
}, {
    id: "2",
    title: "Move funding proposals off Snapshot and into budgeting teams.",
    description: "Budgeting teams allow for more holistic budgeting and reduces delay in compensation due to less security measures.  This helps us make stronger promises to recruits, as we don't need Snapshot proposals to pass after spending time recruiting them.",
    author: "eli_"
  }, {
    id: "3",
    title: "Move Treasury to daoHaus",
    description: "RageQuit feature will be useful.",
    author: "commodore"
}]

export default function Petitions() {

    // I feel like this could all be one object or type...
    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState();
    const [connected, setConnected] = useState(false);
    const [wallet, setWallet] = useState({});
    const [hodler, setHodler] = useState(false);

    const [petitions, setPetitions] = useState([]);
    const [selectedPetition, setSelectedPetition] = useState();

    useEffect(() => {
      // petitions.map(createPetition);
      petitions.length === 0 && fetchPetitions()
        .then(x => x.docs.map(doc => doc.data()))
        .then(setPetitions)
    }, []);

    return (
        <Layout
            connected={connected}
            connectWallet={connectWallet}
            setSigner={setSigner}
            setConnected={setConnected}
            setProvider={setProvider}
            wallet={wallet}>

            {selectedPetition
                ? <Petition signer={signer} petition={petitionById(petitions, selectedPetition)} back={() => setSelectedPetition(null)}/>
                : <PetitionsListView petitions={petitions} setSelectedPetition={setSelectedPetition}/>}
            
        </Layout>
    )
}
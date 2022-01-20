import { useState } from "react";

import Layout from "../components/Layout"
import Petition from "../components/Petitions/Petition";
import { PetitionsListView } from "../components/Petitions/PetitionsListView";

import { connectWallet } from "../utils/connectWallet";
import { itemByProp, proposalById } from "../utils/functional";


export default function Petitions() {

    // I feel like this could all be one object or type...
    const [provider, setProvider] = useState();
    const [signer, setSigner] = useState();
    const [connected, setConnected] = useState(false);
    const [wallet, setWallet] = useState({});
    const [hodler, setHodler] = useState(false);

    const [selectedPetition, setSelectedPetition] = useState();

    const petitionById = itemByProp("id");
    const petitions = [{
        id: 1,
        title: "Let's buy the nuggets.",
        description: "YOLO?"
    }, {
        id: 2,
        title: "Let's buy the constitution again.",
        description: "Mhm."
    }, {
        id: 3,
        title: "Move Treasury to daoHaus",
        description: "RageQuit feature will be useful."
    }]

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
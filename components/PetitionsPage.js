import { useEffect, useState } from "react";

import Petition from "./Petitions/Petition";
import { PetitionsListView } from "./Petitions/PetitionsListView";
import { connectWallet } from "../utils/connectWallet";
import { createPetition, fetchPetitions } from "../utils/firestore";
import { itemByProp, printPass, proposalById } from "../utils/functional";

const petitionById = itemByProp("id");
export function PetitionsPage(props) {
  const [petitions, setPetitions] = useState([]);
  const [selectedPetition, setSelectedPetition] = useState();

  useEffect(() => {
    // petitions.map(createPetition);
    petitions.length === 0 &&
      fetchPetitions()
        .then((x) => x.docs.map((doc) => doc.data()))
        .then(setPetitions);
  }, []);

  return selectedPetition ? (
    <Petition
      signer={props.signer}
      petition={petitionById(petitions, selectedPetition)}
      back={() => setSelectedPetition(null)}
    />
  ) : (
    <PetitionsListView
      petitions={petitions}
      setSelectedPetition={setSelectedPetition}
    />
  );
}

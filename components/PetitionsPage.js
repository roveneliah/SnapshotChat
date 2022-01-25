import { useState } from "react";

import Petition from "./Petitions/Petition";
import { PetitionsListView } from "./Petitions/PetitionsListView";

import { itemByProp } from "../utils/functional";
import { useGetPetitions } from "../hooks/useGetPetitions";

export function PetitionsPage(props) {
  const [selectedPetition, setSelectedPetition] = useState(); // TODO: should add custom hook where I pass in petitions itself and get a selector from that
  const petitions = useGetPetitions();
  const petitionById = itemByProp("id");

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

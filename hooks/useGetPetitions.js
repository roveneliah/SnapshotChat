import { createPetition, fetchPetitions } from "../utils/firestore";
import { useEffect, useState } from "react";

export const useGetPetitions = () => {
  const [petitions, setPetitions] = useState([]);
  useEffect(() => {
    petitions.length === 0 &&
      fetchPetitions()
        .then((x) => x.docs.map((doc) => doc.data()))
        .then(setPetitions);
  }, []);
  return petitions;
};

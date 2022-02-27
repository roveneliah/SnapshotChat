import { listenForPetitions } from "../../utils/firestore";
import { useEffect, useState } from "react";

export const useGetPetitions = () => {
  const [petitions, setPetitions] = useState([]);
  useEffect(() => {
    petitions.length === 0 && listenForPetitions(setPetitions);
  }, []);

  return petitions;
};

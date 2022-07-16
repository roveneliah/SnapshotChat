import { useState } from "react";
import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import { CreatePetitionCard } from "./CreatePetitionCard";
import { PetitionPreviewCard } from "./PetitionPreviewCard";

const filters = [
  {
    title: "Recent",
  },
  {
    title: "$KRAUSE > 5000",
  },
  {
    title: "Courtside Seating",
  },
  {
    title: "Crypto Wizards",
  },
];

export const PetitionsListView = ({
  wallet,
  petitions,
  setSelectedPetition,
}) => {
  const [selectedCuration, setSelectedCuration] = useState(0);

  return (
    <div className="flex flex-row justify-center space-x-3">
      <CreatePetitionCard />
      <div className="flex basis-2/3 flex-col space-y-6  border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <Heading title="Live Petitions" size="2xl" />
          <Heading
            title="Petitions are an open to anyone to gather grassroots support from
          community members."
            size="md"
          />
        </div>
        <div className="flex flex-col space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <Heading title="Filter" size="xl" />
          <div className="flex flex-row flex-wrap space-x-3">
            {filters.map(({ title: filter }, i) => (
              <Button
                title={filter}
                color={i === selectedCuration ? "purple" : "hollow"}
                onClick={() => setSelectedCuration(i)}
                key={i}
              />
            ))}
          </div>
        </div>
        {petitions?.map((petition, i) => (
          <PetitionPreviewCard
            petition={petition}
            wallet={wallet}
            setSelected={() => setSelectedPetition(petition.id)}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

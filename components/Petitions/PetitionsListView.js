import { Heading } from "../Generics/Headings/Heading";
import { CreatePetitionCard } from "./CreatePetitionCard";
import { PetitionPreviewCard } from "./PetitionPreviewCard";

export const PetitionsListView = ({ petitions, setSelectedPetition }) => (
  <div className="flex flex-row justify-center space-x-3">
    <CreatePetitionCard />
    <div className="basis-2/3  p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 flex flex-col space-y-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Heading title="Live Petitions" size="2xl" />
        <Heading
          title="Petitions are an open to anyone to gather grassroots support from
          community members."
          size="md"
        />
        {petitions?.map((petition, i) => (
          <PetitionPreviewCard
            petition={petition}
            setSelected={() => setSelectedPetition(petition.id)}
            key={i}
          />
        ))}
      </div>
    </div>
  </div>
);

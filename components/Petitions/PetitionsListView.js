import { Button } from "../Buttons/Button"
import { Heading } from "../Generics/Headings/Heading"
import { PetitionPreviewCard } from "./PetitionPreviewCard"

export const PetitionsListView = ({ petitions, setSelectedPetition }) => (
    <div className="flex flex-row justify-center space-x-3">
        <div className="p-6 h-1/4 mt-6 basis-1/4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Create a Petition
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Petitions are an open to anyone to gather grassroots support from community members.
            </p>
            <Button title={"Create a Petition"} color="purple" icon={true} href="/petitions/create" />
        </div>
        <div className="basis-2/3  p-6 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 flex flex-col space-y-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <Heading title="Live Petitions" size="2xl"/>
                {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Petitions are an open to anyone to gather grassroots support from community members.
                </p> */}
                {petitions.map((petition, i) => 
                    <PetitionPreviewCard
                        title={petition.title}
                        description={petition.description}
                        setSelected={() => setSelectedPetition(petition.id)}
                        id={i}/>
                )}
            </div>
        </div>
    </div>
)
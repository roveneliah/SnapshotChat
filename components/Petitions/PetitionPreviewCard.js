
import { Button } from "../Buttons/Button"

export const PetitionPreviewCard = ({ title, description, setSelected, id }) => (
    <div key={id} className="p-6 max-w-2/3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
        </p>
        <Button title="View" color="purple" icon={true} onClick={setSelected} />
    </div>
)

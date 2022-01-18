import { toPercentStr } from "../../utils/functional"

export const PercentageBar = ({ title, percentage }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-blue-700 dark:text-white">{title}</span>
            <span className="text-sm font-medium text-blue-700 dark:text-white">{toPercentStr(percentage)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-purple-300 h-2.5 rounded-full" style={{width: toPercentStr(percentage)}}/>
        </div>
    </div>
)
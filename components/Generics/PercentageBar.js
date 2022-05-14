import { toPercentStr } from "../../utils/functional";

export const PercentageBar = ({ title, percentage }) => (
  <div>
    <div className="mb-1 flex justify-between">
      <span className="text-base font-medium text-blue-700 dark:text-white">
        {title}
      </span>
      <span className="text-sm font-medium text-blue-700 dark:text-white">
        {toPercentStr(percentage)}
      </span>
    </div>
    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-2.5 rounded-full bg-purple-300"
        style={{ width: toPercentStr(percentage) }}
      />
    </div>
  </div>
);

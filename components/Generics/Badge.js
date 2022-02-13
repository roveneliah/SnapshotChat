export const Badge = ({ title, color }) => (
  <span
    className={`bg-${color}-100 text-${color}-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-${color}-200 dark:text-${color}-900`}
  >
    {title}
  </span>
);

const green = "bg-green-100";

export const Badge = ({ title, color, size = "sm" }) => (
  <div>
    <span
      className={`select-none bg-${color}-100 text-${color}-800 text-${size} mr-2 rounded px-2.5 py-0.5 font-semibold dark:bg-${color}-200 dark:text-${color}-900`}
    >
      {title}
    </span>
  </div>
);

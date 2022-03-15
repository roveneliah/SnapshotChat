const styles = {
  sm: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400",
  md: "block mb-2 text-md font-medium text-gray-900 dark:text-gray-400",
  lg: "block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400",
  xl: "block mb-2 text-xl font-medium text-gray-900 dark:text-gray-400",
  "2xl": "block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-400",
};

export const HeadingFaint = ({ title, size = "xl" }) => {
  const className = styles[size];
  return <h5 className={className}>{title}</h5>;
};

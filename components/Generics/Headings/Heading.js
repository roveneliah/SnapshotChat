const styles = {
  xs: "mb-2 text-xs font-bold tracking-tight text-gray-900 dark:text-white",
  sm: "mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white",
  md: "mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white",
  lg: "mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white",
  xl: "mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white",
  "2xl": "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white",
};

export const Heading = ({ title, size, className }) => {
  // const className = styles[size];
  return <h5 className={`${styles[size]} ${className}`}>{title}</h5>;
};

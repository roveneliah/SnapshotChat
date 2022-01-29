export const NavBar = ({ navItems }) => {
  const selected =
    "block py-2 pr-4 pl-3 text-white bg-purple-300 rounded md:bg-transparent md:text-purple-300 md:p-0 dark:text-white";
  const notSelected =
    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  return (
    <div className="hidden justify-between items-center w-full md:flex md:w-auto">
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        {navItems.map((navItem, i) => (
          <li key={i}>
            <a href={navItem.href} onClick={navItem.onClick}>
              <p className={notSelected}>{navItem.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

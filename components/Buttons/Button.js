
const buttonStyle = {
    blue: `inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`,
    red:  "inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-300 rounded-lg hover:bg-red-400 focus:ring-4 focus:ring-red-300 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-800",
    purple: "inline-flex items-center py-2 px-3 text-sm font-medium text-center text-purple-900 bg-purple-300 rounded-lg hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 dark:bg-purple-200 dark:hover:bg-purple-300 dark:focus:ring-purple-200",
    hollow: "py-2 px-4 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
}

export const Button = ({ title, onClick, href, color="blue", icon }) => (
    <a onClick={onClick} href={href} 
        className={buttonStyle[color]}>
        {title}
        {icon && <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>}
    </a>
  )
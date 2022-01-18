

import Link from 'next/link';

export const NavBar = () => {
    const navItems = [{
        title: "Forum",
        link: "/forum"
    }, {
        title: "Earn",
        link: "/earn"
    }, {
        title: "Proposals",
        link: "/proposals"
    }, {
        title: "Squads",
        link: "/squads"
    }, {
        title: "Merch",
        link: "/merch"
    }]

    return (
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {navItems.map((navItem, i) => (
                <li key={i}>
                    <Link href={navItem.link}>
                    <p className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">
                        {navItem.title}
                    </p>
                    </Link>
                </li>
            ))}            
            <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Earn
                </a>
            </li>

            </ul>
        </div>
    )
}
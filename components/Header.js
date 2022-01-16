import styles from '../styles/Home.module.css'

import { ConnectButton } from './ConnectButton';
import { Wallet } from './Wallet';

import kh_holo from '../public/kh_holo.png'
import Image from 'next/image';
import Link from 'next/link';

export const Header = ({ connected, connect, setSigner, wallet }) => {
    return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
            <div className="flex space-x-2">
                <Image src={kh_holo} className="flex" width={40} height={40}/>
                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">The Krause House</span>
            </div>
            <div className="flex md:order-2">
                {!connected
                    ? <ConnectButton 
                        connect={connect} 
                        setSigner={setSigner}/>
                    : <Wallet wallet={wallet}/>}
            </div>
            {/* <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
                <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                {[]}
                <li>
                    <Link href="/">
                    <p className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">
                        Forum
                    </p>
                    </Link>
                </li>
                <li>
                    <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Earn
                    </a>
                </li>
                <li>
                    <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Proposals
                    </a>
                </li>
                <li>
                    <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Wallets
                    </a>
                </li>
                </ul>
            </div> */}
        </div>
    </nav>
   
);
}
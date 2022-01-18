
import HeaderWallet from './HeaderWallet';
import { HeaderLogo } from './HeaderLogo';
import { NavBar } from './NavBar';

export const Header = ({ connected, connect, setSigner, wallet }) => {
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <HeaderLogo />
                <HeaderWallet
                    connect={connect}
                    wallet={wallet}
                    connected={connected}
                    setSigner={setSigner}/>
                <NavBar />
            </div>
        </nav>
    );
}
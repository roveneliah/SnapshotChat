import HeaderWallet from "./HeaderWallet";
import { HeaderLogo } from "./HeaderLogo";
import { NavBar } from "./NavBar";
import { navItems } from "../../config/navItems";

export const Header = ({ connect, disconnect, wallet, wrongNetwork }) => {
  return (
    <nav className=" border-gray-200 px-2 sm:px-4">
      <div className="container flex justify-between items-center mx-auto my-6">
        <HeaderLogo />
        <HeaderWallet
          wallet={wallet}
          connect={connect}
          disconnect={disconnect}
          wrongNetwork={wrongNetwork}
        />
        {/* <NavBar navItems={navItems} /> */}
      </div>
    </nav>
  );
};

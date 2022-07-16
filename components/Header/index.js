import HeaderWallet from "./HeaderWallet";
import { HeaderLogo } from "./HeaderLogo";
import { NavBar } from "./NavBar";
import { navItems } from "../../config/navItems";

export const Header = ({ connect, disconnect, wallet, wrongNetwork }) => {
  return (
    <nav className="absolute top-0  w-full border-gray-200">
      <div className="flex items-center justify-between px-10 py-6">
        {/* <NavBar navItems={navItems} /> */}
        <HeaderLogo />
        <HeaderWallet
          wallet={wallet}
          connect={connect}
          disconnect={disconnect}
          wrongNetwork={wrongNetwork}
        />
      </div>
    </nav>
  );
};

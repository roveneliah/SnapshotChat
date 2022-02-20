import HeaderWallet from "./HeaderWallet";
import { HeaderLogo } from "./HeaderLogo";
import { NavBar } from "./NavBar";

const navItems = [
  {
    title: "Proposals",
    href: "/",
  },
  //   {
  //     title: "Delegates",
  //     href: "/delegates",
  //   },
  // {
  //   title: "Petitions",
  //   href: "/petitions",
  // },
  {
    title: "Profile",
    href: "/profile",
  },
  // {
  //   title: "Roster",
  //   href: "https://roster.krausehouse.club/",
  // },
  //   {
  //     title: "Earn",
  //     href: "/earn",
  //   },
  //   {
  //     title: "Squads",
  //     href: "/squads",
  //   },
  //   {
  //     title: "Merch",
  //     href: "/merch",
  //   },
];

export const Header = ({ connect, disconnect, wallet }) => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <HeaderLogo />
        <HeaderWallet
          wallet={wallet}
          connect={connect}
          disconnect={disconnect}
        />
        <NavBar navItems={navItems} />
      </div>
    </nav>
  );
};

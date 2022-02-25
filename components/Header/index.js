import HeaderWallet from "./HeaderWallet";
import { HeaderLogo } from "./HeaderLogo";
import { NavBar } from "./NavBar";

const navItems = [
  {
    title: "Governance",
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
  // {
  //   title: "Analytics",
  //   href: "https://analytics.krausehouse.club/",
  // },
  // {
  //   title: "Bounties",
  //   href: "https://app.dework.xyz/o/krause-house-0M48tOstbs6BKTdlGNrWNU",
  // },
  {
    title: "Contribute",
    href: "/pods",
  },
  {
    title: "Merch",
    href: "/merch",
  },
  {
    title: "Collection",
    href: "/collection",
  },
];

export const Header = ({ connect, disconnect, wallet, wrongNetwork }) => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto mb-6">
        <HeaderLogo />
        <HeaderWallet
          wallet={wallet}
          connect={connect}
          disconnect={disconnect}
          wrongNetwork={wrongNetwork}
        />
        <NavBar navItems={navItems} />
      </div>
    </nav>
  );
};

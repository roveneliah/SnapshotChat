import UserProfileCard from "./UserProfileCard";
import JerrySearch from "./JerrySearch";
import FollowingBox from "./FollowingBox";
import { useState } from "react";
import { QuickActionsCard } from "./QuickActionsCard";
import { Heading } from "../Generics/Headings/Heading";
import Image from "next/image";

export enum ProfileViews {
  Following = "Following",
  Search = "Search",
  Wallet = "Wallet",
  Store = "Store",
  MyJerry = "MyJerry",
}

export function ProfileView(props: any) {
  const [view, setView] = useState(ProfileViews.Following);
  return (
    <div className="flex flex-row justify-center space-x-10">
      <div className="flex w-[30vw] flex-col space-y-3">
        <UserProfileCard
          userProfile={props.connection.userProfile}
          wallet={props.connection.wallet}
          view={view}
          setView={setView}
        />
        <QuickActionsCard />
      </div>
      <div className="flex w-1/2 flex-col space-y-5 ">
        {/* <div className="flex flex-col space-y-4 rounded-lg border border-gray-200 bg-cards bg-opacity-75 p-8 shadow-xl ">
          <Heading title="My Jerry" size="xl" className="font-krausehouse2" />
          </div>
          <div className="flex flex-col space-y-4 rounded-lg border border-gray-200 bg-cards bg-opacity-75 p-8 shadow-xl ">
          <Heading title="My Squad" size="xl" className="font-krausehouse2" />
        </div> */}
        {view === ProfileViews.Following && (
          <div className="h-[80vh] overflow-auto rounded-lg">
            <FollowingBox
              userProfile={props.connection.userProfile}
              following={props.following}
            />
          </div>
        )}
        {view === ProfileViews.Search && (
          <JerrySearch userProfile={props.connection.userProfile} />
        )}
        {view === ProfileViews.Wallet && (
          <div className="flex flex-col space-y-4 rounded-lg border border-gray-200 bg-cards bg-opacity-75 p-8 shadow-xl ">
            <Heading title="Wallet" size="xl" className={"font-krausehouse2"} />
            <div>
              <Heading
                title={props.connection.wallet.$KRAUSE}
                size="xl"
                className={"font-krausehouse2"}
              />
              <a className="font-krausehouse2">$KRAUSE</a>
            </div>
            <div>
              <Heading
                title={props.connection.wallet.TICKETS}
                size="xl"
                className={"font-krausehouse2"}
              />
              <a className="font-krausehouse2">Tickets</a>
            </div>
            <div className="flex flex-col">
              <Heading
                title={props.connection.wallet.TICKETS_OLD}
                size="xl"
                className={"font-krausehouse2"}
              />
              <a className="font-krausehouse2">Tickets</a>
              <a className="font-krausehouse2 text-xs">
                Please migrate your ticket to v2.
              </a>
            </div>
          </div>
        )}
        {view === ProfileViews.Store && (
          <div className="flex flex-col space-y-5 rounded-lg border border-gray-200 bg-cards bg-opacity-75 p-8 shadow-xl ">
            <Heading title="Store" size="xl" className={"font-krausehouse2"} />
            <div>
              <div className="flex flex-row space-x-2 font-krausehouse2 text-sm">
                <a className="cursor-pointer select-none rounded-lg bg-cards/25 px-3 py-2 pb-5 hover:bg-cards/50">
                  Pre-Season
                </a>
                <a className="cursor-pointer select-none rounded-lg bg-cards/25 px-3 py-2 pb-5 hover:bg-cards/50">
                  Season 1
                </a>
                <a className="cursor-pointer select-none rounded-lg bg-cards/25 px-3 py-2 pb-5 hover:bg-cards/50">
                  Season 2
                </a>
                <a className="cursor-pointer select-none rounded-lg bg-cards px-3 py-2 pb-5">
                  NFT NYC
                </a>
                <a className="cursor-pointer select-none rounded-lg bg-cards/25 px-3 py-2 pb-5 hover:bg-cards/50">
                  Season 3
                </a>
              </div>
              <div className="-mt-3 flex flex-row space-x-5 rounded-lg bg-cards p-8 shadow-xl">
                <div className="overflow-hidden">
                  <Image
                    src="https://cdn.discordapp.com/attachments/916157990569148416/974530037749518386/Screen_Shot_2022-05-13_at_12.34.16_AM.png"
                    width={300}
                    height={250}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-between space-y-2">
                  <div>
                    <Heading
                      title="The og Tee"
                      size="xl"
                      className={"font-krausehouse2"}
                    />
                    <hr className="mb-3 border border-gray-600" />
                    <a className="text-sm font-semibold">
                      NFT.NYC marked the first official in-person Krause House
                      Event.
                    </a>
                  </div>
                  <a className="w-fit cursor-pointer select-none self-end rounded-lg bg-orange-200 p-3 pt-2 font-krausehouse2 text-sm hover:bg-orange-300">
                    40 $KRAUSE
                  </a>
                </div>
              </div>
              <div className="-mt-3 flex flex-row space-x-5 rounded-lg bg-cards p-8 shadow-xl">
                <div className="overflow-hidden">
                  <Image
                    src="https://cdn.discordapp.com/attachments/916157990569148416/974530037749518386/Screen_Shot_2022-05-13_at_12.34.16_AM.png"
                    width={300}
                    height={250}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-between space-y-2">
                  <div>
                    <Heading
                      title="The og Tee"
                      size="xl"
                      className={"font-krausehouse2"}
                    />
                    <hr className="mb-3 border border-gray-600" />
                    <a className="text-sm font-semibold">
                      NFT.NYC marked the first official in-person Krause House
                      Event.
                    </a>
                  </div>
                  <a className="w-fit cursor-pointer select-none self-end rounded-lg bg-orange-200 p-3 pt-2 font-krausehouse2 text-sm hover:bg-orange-300">
                    40 $KRAUSE
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {view === ProfileViews.MyJerry && (
          <div className="flex flex-col space-y-4 rounded-lg border border-gray-200 bg-cards bg-opacity-75 p-8 shadow-xl ">
            <Heading
              title="MyJerry"
              size="xl"
              className={"font-krausehouse2"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

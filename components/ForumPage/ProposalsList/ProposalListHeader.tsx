import { ProposalStateFilter } from "../../../types/ProposalStateFilter";
import Image from "next/image";
import { Heading } from "../../Generics/Headings/Heading";
import { Button } from "../../Buttons/Button";
import Link from "next/link";

const { None, Active, Closed } = ProposalStateFilter;
export function ProposalListHeader(props: any) {
  return (
    <div className="relative overflow-hidden p-6 basis-1/4 space-y-16 h-fit bg-cards bg-opacity-75 rounded-lg  border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div>
        <h5 className="mb-2 min-h-max text-sm font-krausehouse2 font-bold tracking-wide text-textPrimary dark:text-white">
          Krause House
        </h5>
        <h5 className="mb-2 min-h-max text-2xl font-krausehouse2 font-bold tracking-wide text-textPrimary dark:text-white">
          Governance Forum
        </h5>
      </div>
      <div className="absolute -bottom-3 right-0">
        <Image src="/mario.png" height={60} width={60} className="rounded-lg" />
      </div>

      {/* <div className="mt-5"> */}
      {/* {props.proposalStateFilter === Review && (
          <HeadingFaint
            size="sm"
            title="Proposals posted for review.  You can sign off on it to approve your support or pushback and advocate it moving to Snapshot."
          />
        )} */}
      {/* {props.proposalStateFilter === Active && (
          <HeadingFaint
            size="sm"
            title="Proposals currently undergoing voting."
          />
        )}
        {props.proposalStateFilter === Closed && (
          <HeadingFaint
            size="sm"
            title="View the Treasury's transaction log to view transactions relevant to a proposal."
          />
        )}
      </div> */}
      <div className="flex flex-row lg:flex-col lg:justify-start font-krausehouse2 space-y-3">
        <div
          onClick={() => props.setProposalStateFilter(Active)}
          className="flex flex-row space-x-3 px-3 py-1 pb-2 rounded-full lg:rounded-lg hover:border hover:border-gray-400 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <a className="hidden lg:block">Proposals</a>
        </div>
        <div
          onClick={() => props.setProposalStateFilter(Closed)}
          className="flex flex-row space-x-3 px-3 py-1 pb-2 rounded-full lg:rounded-lg hover:border hover:border-gray-400 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <a className="hidden lg:block">Archive</a>
        </div>
        <div>
          <Link href="profile">
            <div className="flex flex-row space-x-3 px-3 py-1 pb-2 rounded-full lg:rounded-lg hover:border hover:border-gray-400 hover:bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <a className="hidden lg:block">Profile</a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

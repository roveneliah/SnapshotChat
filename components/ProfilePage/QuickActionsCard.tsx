import { Heading } from "../Generics/Headings/Heading";
import Link from "next/link";

export function QuickActionsCard() {
  return (
    <div className="flex flex-col space-y-4 rounded-lg border border-gray-200 bg-cards bg-opacity-75 p-8 shadow-xl ">
      <Heading title="Quick Actions" size="xl" className="font-krausehouse2" />
      <div className="flex flex-row space-y-3 font-krausehouse2 lg:flex-col lg:justify-start">
        <div className="flex cursor-pointer flex-row space-x-3 rounded-full px-3 py-1 pb-2 hover:border hover:border-gray-400 hover:bg-gray-300 lg:rounded-lg">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <a className="hidden lg:block">Join the Team</a>
        </div>
        <div>
          <Link href="profile">
            <div className="flex cursor-pointer flex-row space-x-3 rounded-full px-3 py-1 pb-2 hover:border hover:border-gray-400 hover:bg-gray-300 lg:rounded-lg">
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
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <a className="hidden lg:block">Bounty Board</a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

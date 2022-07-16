import Image from "next/image";

export function DelegationPreviewCard({
  delegationVotes,
  proposal,
  selectedVote,
}) {
  return (
    <div className="group flex flex-col space-y-2 rounded-lg bg-cards/75 p-6 pb-10">
      <div className="flex-col space-y-2 rounded-lg dark:border-gray-700">
        <div className="flex flex-col justify-start space-y-4">
          <span className="w-fit select-none rounded bg-orange-100 px-2.5 py-0.5 text-sm font-semibold text-orange-800">
            {proposal.choices[selectedVote]}
          </span>
          <div className="flex flex-row -space-x-2">
            {delegationVotes[selectedVote]?.length == 0 && (
              <p className="whitespace-nowrap font-semibold text-black">
                None of your following voted this way.
              </p>
            )}
            {delegationVotes[selectedVote]?.map((voter, i) => (
              <div key={i} className="relative flex flex-col">
                <div className="peer">
                  <Image
                    src={voter.avatarUrl}
                    width={40}
                    height={40}
                    className="rounded-full hover:shadow-2xl"
                  />
                </div>
                <p className="absolute -bottom-6 hidden whitespace-nowrap font-semibold peer-hover:block">
                  {voter.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        {proposal.state === "active" && (
          <div>
            <span
              onClick={() => voteChoice(selectedVote + 1)}
              className="rounded bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-700 dark:text-purple-300"
            >
              Vote
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

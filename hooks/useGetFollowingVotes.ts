import { useEffect, useState } from "react";
import { shortenAddress } from "../utils/web3/shortenAddress";
import { useGetProposalVotes } from "./snapshot/useGetSnapshotVotes";
import { address } from "../types/Address";
import { avatarUrl } from "../utils/avatarUrl";

export const useGetFollowingVotes = (proposal: any, userProfile: any) => {
  const [delegationVotes, setDelegationVotes] = useState();
  const votes = useGetProposalVotes(proposal);

  const followingVotingForChoice = (choice: number) =>
    votes[0]
      .filter((vote: any) => vote.choice === choice) // get all votes for this choice
      .map((vote: any) => vote.voter.toLowerCase()) // get the addresses of the voters for this choice
      .filter((a: address) => userProfile.following.includes(a)) // addresses of followed voters for this choice
      .map((address: address) => userProfile.followingProfiles[address]) // get the profiles of the followed voters for this choice
      .map((profile: any) => ({
        name: profile.name || shortenAddress(profile.address),
        avatarUrl: avatarUrl(profile),
      }));

  useEffect(() => {
    if (
      votes[0] &&
      userProfile &&
      userProfile.followingProfiles != undefined &&
      Object.keys(userProfile.followingProfiles).length != 0 &&
      delegationVotes == undefined
    ) {
      // TODO: REFACTOR THE SHIT OUT OF THIS
      const x = proposal.choices.map((_: any, i: number) =>
        followingVotingForChoice(i + 1)
      );
      setDelegationVotes(x);
    }
  }, [votes, userProfile]);

  return delegationVotes;
};

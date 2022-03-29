import { useEffect, useState } from "react";
import { getKhVotingPower } from "../../utils/Snapshot/getVotingPower";

export interface Scores {
  scores_total: number;
  [choice: number]: number;
}

export const useGetProposalScores = (proposal: any, votes: any): Scores => {
  const [scores, setScores] = useState({
    scores: proposal.scores,
    scores_total: proposal.scores_total,
  });

  useEffect(() => {
    if (proposal.state === "active" && votes) {
      const voters = votes.map((vote: any) => vote.voter.toLowerCase());
      getKhVotingPower(voters, proposal.snapshot)
        .then((scoresMapping: any) => {
          return votes.reduce(
            (acc: any, vote: any) => {
              acc[vote.choice] =
                (acc[vote.choice] || 0) +
                (scoresMapping[vote.voter.toLowerCase()] || 0);
              acc["scores_total"] +=
                scoresMapping[vote.voter.toLowerCase()] || 0;
              return acc;
            },
            proposal.choices.reduce(
              (counter: any, _: any, i: number) =>
                Object.assign(counter, { [i + 1]: 0 }),
              { scores_total: 0 }
            )
          );
        })
        .then(setScores);
    }
  }, [proposal, votes]);

  return scores;
};

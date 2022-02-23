// get data from snapshot
const axios = require("axios");
const { head, prop } = require("ramda");
const uri = "https://hub.snapshot.org/graphql";
const liveProposals = (space) => `query Proposals {
  proposals (
    first: 20,
    skip: 0,
    where: {
      space_in: ["${space}"],
    },
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    title
    body
    choices
    start
    end
    snapshot
    type
    state
    author
    scores
    scores_total
    votes
    space {
      id
      name
    }
  }
}`;

const votesByAddress = (space, address) => {
  const query = `query MyVotes {
  votes (
    first: 1000
    skip: 0
    where: {
      space: "${space}",
    	voter: "${address}"
    }
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    voter
    created
    proposal {
      id
      choices
    }
    choice
    space {
      id
    }
  }
}`;
  return query;
};

const proposalVote = (proposalId, address) => {
  return `query MyVote {
    votes (
      first: 1000
      skip: 0
      where: {
        proposal: "${proposalId}",
        voter: "${address}"
      }
      orderBy: "created",
      orderDirection: desc
    ) {
      id
      voter
      created
      proposal {
        id
        choices
      }
      choice
      space {
        id
      }
    }
  }`;
};

const query = async (query) => {
  const x = await axios
    .post(uri, { query })
    .then((res) => res.data.data.proposals)
    .catch((e) => console.log(e));
  return x;
};

const query2 = async (query) => {
  const x = await axios
    .post(uri, { query })
    .then((res) => res.data.data.votes)
    .then(head)
    .then((vote) => vote.proposal.choices[vote.choice - 1])
    .catch((e) => console.log(e));
  return x;
};

const query3 = async (query) => {
  const x = await axios
    .post(uri, { query })
    .then((res) => res.data.data.votes)
    .catch((e) => console.log(e));
  return x;
};

module.exports.fetchProposals = async (space) =>
  await query(liveProposals(space));

module.exports.fetchAllVotes = async (space, address) =>
  await query3(votesByAddress(space, address));

module.exports.fetchProposalVote = async (proposalId, address) =>
  await query2(proposalVote(proposalId, address));

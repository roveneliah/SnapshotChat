// get data from snapshot
const axios = require("axios");
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
    space {
      id
      name
    }
  }
}`;

const query = async (query) => {
  const x = await axios
    .post(uri, { query })
    .then((res) => res.data.data.proposals)
    .catch((e) => console.log(e));
  return x;
};

module.exports.fetchProposals = async (space) =>
  await query(liveProposals(space));

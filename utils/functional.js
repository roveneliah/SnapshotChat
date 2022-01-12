import { compose, equals, prop } from "ramda";

export const head = (arr) => arr ? arr[0] : null;
export const proposalById = (proposals, id) => head(proposals.filter(compose(equals(id), prop("id"))))
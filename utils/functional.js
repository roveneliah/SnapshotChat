import { compose, equals, prop, composeWith, andThen } from "ramda";

export const head = (arr) => arr ? arr[0] : null;
export const proposalById = (proposals, id) => head(proposals.filter(compose(equals(id), prop("id"))))

export const itemByProp = (propName) => (objArr, propVal) => head(objArr.filter(compose(equals(propVal), prop(propName))));

export const composeP = composeWith(andThen);
export const printPass = (x) => { console.log(x); return x; }

export const toPercentStr = (x) => `${Math.floor(100*x)}%`
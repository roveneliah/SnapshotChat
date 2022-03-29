import { Badge } from "../../../Generics/Badge";

export const ProposalStateBadge = ({
  state,
}: {
  state: "active" | "closed" | "review";
}) =>
  state === "active" ? (
    <Badge color="green" title="Active" />
  ) : state === "closed" ? (
    <Badge color="red" title="Closed" />
  ) : state === "review" ? (
    <Badge color="yellow" title="Review" />
  ) : (
    <></>
  );

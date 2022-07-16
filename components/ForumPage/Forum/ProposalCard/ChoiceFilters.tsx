import { Heading } from "../../../Generics/Headings/Heading";
import { toPercentStr } from "../../../../utils/functional";
import { Badge } from "../../../Generics/Badge";
import { Col } from "../../../Generics/Col";
import { Row } from "../../../Generics/Row";

export function ChoiceFilters(props: any) {
  return (
    <div
      className={
        props.proposal.choices.length % 2
          ? "grid grid-cols-3"
          : "grid grid-cols-2"
      }
    >
      {props.proposal.choices.map((choice: string, i: number) => (
        <a
          onClick={() =>
            props.setSelectedVote &&
            props.setSelectedVote(props.selectedVote === i ? null : i)
          }
          className={
            props.selectedVote === i
              ? "m-2 block cursor-pointer rounded-lg border p-6 shadow-md shadow-background"
              : "m-2 block cursor-pointer rounded-lg border border-gray-200 p-6 shadow-md"
          }
          key={i}
        >
          <Col>
            <p className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
              {choice}
            </p>
            <div className="flex flex-row items-end justify-between">
              <Badge
                color="orange"
                size="sm"
                title={`${
                  props.scores[i + 1] != null
                    ? toPercentStr(
                        props.scores[i + 1] / props.scores.scores_total
                      )
                    : toPercentStr(
                        props.proposal.scores[i] / props.proposal.scores_total
                      )
                }`}
              />
              <div className="hidden xl:block">
                <Badge
                  color="gray"
                  size="sm"
                  title={`${
                    props.scores[i + 1] != null
                      ? Math.floor(props.scores[i + 1])
                      : Math.floor(props.proposal.scores[i])
                  } $KRAUSE`}
                />
              </div>
            </div>
          </Col>
        </a>
      ))}
    </div>
  );
}

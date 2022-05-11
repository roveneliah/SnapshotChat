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
              ? "cursor-pointer block p-6 m-2 rounded-lg border shadow-md shadow-background  dark:border-gray-700 dark:bg-gray-700"
              : "cursor-pointer block p-6 m-2 rounded-lg border shadow-md border-gray-200  dark:bg-gray-800 dark:border-gray-700"
          }
          key={i}
        >
          <Col>
            <Heading title={choice} size="sm" />
            <Row space={1} className="flex-wrap">
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
              <Badge
                color="gray"
                size="sm"
                title={`${
                  props.scores[i + 1] != null
                    ? Math.floor(props.scores[i + 1])
                    : Math.floor(props.proposal.scores[i])
                } $KRAUSE`}
              />
            </Row>
          </Col>
        </a>
      ))}
    </div>
  );
}

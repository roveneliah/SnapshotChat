import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";
import { Row } from "../../Generics/Row";
import { ChoiceFilters } from "./ProposalCard/ChoiceFilters";
import { postTypeFilters, posterFilters } from "./index";

export function ForumFilterView(props) {
  return (
    <div className="flex flex-col space-y-6 rounded-lg border border-gray-200 bg-cards bg-opacity-75 p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <HeadingFaint title="Filter Posts" size="xl" />
      <div>
        <Row>
          {postTypeFilters.map((postType, i) => (
            <span
              className={
                i === props.selectedPostTypeFilter
                  ? `cursor-pointer select-none rounded bg-purple-100 px-2.5 py-0.5 text-sm font-semibold text-purple-800 dark:bg-purple-200 dark:text-purple-900`
                  : `cursor-pointer select-none rounded bg-gray-100 px-2.5 py-0.5 text-sm font-semibold text-gray-800 dark:bg-gray-200 dark:text-gray-900`
              }
              onClick={() => props.setSelectedPostTypeFilter(i)}
              key={i}
            >
              {postType.name}
            </span>
          ))}
        </Row>
      </div>
      <ChoiceFilters
        proposal={props.proposal}
        selectedVote={props.selectedVote}
        setSelectedVote={props.setSelectedVote}
        scores={props.scores}
      />
      <div>
        <HeadingFaint title="Posted By" size="md" />
        <Row className="flex-wrap">
          {posterFilters.map((postType, i) => (
            <span
              className={
                i === props.selectedPosterFilter
                  ? `cursor-pointer select-none rounded bg-purple-100 px-2.5 py-0.5 text-sm font-semibold text-purple-800 dark:bg-purple-200 dark:text-purple-900`
                  : `cursor-pointer select-none rounded bg-gray-100 px-2.5 py-0.5 text-sm font-semibold text-gray-800 dark:bg-gray-200 dark:text-gray-900`
              }
              onClick={() => props.setSelectedPosterFilter(i)}
            >
              {postType.name}
            </span>
          ))}
        </Row>
      </div>
    </div>
  );
}

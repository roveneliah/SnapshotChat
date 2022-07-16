import { HeadingFaint } from "../Generics/Headings/HeadingFaint";

export enum ProposalTemplates {
  Stream,
  TeamUpdate,
  Custom,
}

const { Stream, TeamUpdate, Custom } = ProposalTemplates;
export function TemplateHeader(props: any) {
  return (
    <div className="basis-1/4 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div>
        <h5 className="mb-2 min-h-max text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Proposals
        </h5>
      </div>
      <span
        onClick={() => props.setSelectedTemplate(Stream)}
        className="mr-2 rounded bg-yellow-100 px-2.5 py-0.5 text-sm font-semibold text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900"
      >
        {props.selectedTemplate === Stream ? "• Stream •" : "Stream"}
      </span>
      {/* <span
        onClick={() => props.setSelectedTemplate(TeamUpdate)}
        className="bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900"
      >
        {props.selectedTemplate === TeamUpdate
          ? "• Team Update •"
          : "Team Update"}
      </span> */}
      <span
        onClick={() => props.setSelectedTemplate(Custom)}
        className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-sm font-semibold text-gray-800 dark:bg-gray-200 dark:text-gray-900"
      >
        {props.selectedTemplate === Custom ? "• Custom •" : "Custom"}
      </span>

      <div className="mt-5">
        {props.selectedTemplate === Stream && (
          <HeadingFaint
            size="sm"
            title="Streams are the easiest and most flexible way to start contributing."
          />
        )}
        {/* {props.selectedTemplate === TeamUpdate && (
          <HeadingFaint
            size="sm"
            title="Team Updates are how community members request and revoke permissions to individuals and teams."
          />
        )} */}
        {props.selectedTemplate === Custom && (
          <HeadingFaint
            size="sm"
            title="You can submit any proposal as long as it's clear and actionable."
          />
        )}
      </div>
    </div>
  );
}

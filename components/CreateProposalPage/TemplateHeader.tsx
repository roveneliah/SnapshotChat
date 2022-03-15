import { HeadingFaint } from "../Generics/Headings/HeadingFaint";

export enum ProposalTemplates {
  Stream,
  TeamUpdate,
  Custom,
}

const { Stream, TeamUpdate, Custom } = ProposalTemplates;
export function TemplateHeader(props: any) {
  return (
    <div className="p-6 basis-1/4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div>
        <h5 className="mb-2 min-h-max text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Proposals
        </h5>
      </div>
      <span
        onClick={() => props.setSelectedTemplate(Stream)}
        className="bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900"
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
        className="bg-gray-100 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900"
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

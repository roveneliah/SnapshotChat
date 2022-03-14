import { useEffect, useState } from "react";
import { Heading } from "../Generics/Headings/Heading";
import { StreamRequestForm } from "./TemplateForms/StreamRequestForm";
import { TeamUpdateForm } from "./TemplateForms/TeamUpdateForm";
import { createDraft } from "../../utils/firestore";
import { signMessage } from "../../utils/web3/submit";
import { HeadingFaint } from "../Generics/Headings/HeadingFaint";
import { useForm } from "../../hooks/useForm";
import { Button } from "../Buttons/Button";
import Link from "next/link";

enum ProposalTemplates {
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
        className="bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
      >
        {props.selectedTemplate === Stream ? "• Stream •" : "Stream"}
      </span>
      <span
        onClick={() => props.setSelectedTemplate(TeamUpdate)}
        className="bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900"
      >
        {props.selectedTemplate === TeamUpdate
          ? "• Team Update •"
          : "Team Update"}
      </span>
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
        {props.selectedTemplate === TeamUpdate && (
          <HeadingFaint
            size="sm"
            title="Team Updates are how community members request and revoke permissions to individuals and teams."
          />
        )}
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

export default function CreateProposalPage(props: any) {
  const [selectedTemplate, setSelectedTemplate] = useState(Stream);

  const [title, setTitle] = useState();
  const [recipientAddress, updateRecipientAddress] = useForm();
  const [usdc, updateUsdc] = useForm();
  const [krause, updateKrause] = useForm();
  const [description, setDescription] = useState();
  const complete = (usdc || krause) && recipientAddress && title && description;

  const submitStreamRequest = async () => {
    if (!props.hodler || !complete) return;

    const proposal = await signMessage(props.signer)({
      title: `${title} Stream Request`,
      recipient: title,
      type: "Do-ocracy Stream Request",
      request: {
        usdc: usdc || 0,
        krause: krause || 0,
      },
      description: description || "",
      author: await props.signer.getAddress(),
      choices: ["For", "Postpone: Needs Edits", "Against"],
      state: "review",
    });

    createDraft(proposal);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-row w-full px-10 space-x-5 justify-center">
        <div className="flex flex-col space-y-3 w-1/2">
          <TemplateHeader
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
          {selectedTemplate === Stream &&
            StreamRequestForm({
              ...props,
              title,
              setTitle,
              recipientAddress,
              updateRecipientAddress,
              usdc,
              updateUsdc,
              krause,
              updateKrause,
              description,
              setDescription,
            })}
        </div>
        <div className="flex flex-col space-y-5 w-2/3 p-6 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row justify-between">
            <Heading title="Preview" size="2xl" />
            {complete && props.hodler && (
              <div>
                <Button
                  title="Submit"
                  color="purple"
                  onClick={async () => {
                    await submitStreamRequest();
                    window.open("/", "_self");
                  }}
                  icon={true}
                />
              </div>
            )}
          </div>
          {title && (
            <div>
              <HeadingFaint
                title="————————————————————————————————————"
                size="lg"
              />
              <Heading
                title={`${title} Contributor Funding Request`}
                size="lg"
              />
              <Heading title={recipientAddress || ""} size="sm" />
              <HeadingFaint
                title="————————————————————————————————————"
                size="lg"
              />
            </div>
          )}
          {(usdc || krause) && (
            <div>
              <HeadingFaint title="Requesting up to.." size="lg" />
              <Heading title={usdc && `${usdc} $USDC / month`} size="sm" />
              <Heading
                title={krause && `${krause} $KRAUSE / month`}
                size="sm"
              />
              <HeadingFaint
                title="Paid bimonthly for 2 months. Stewardship team may cancel this agreement at any point. Community may submit a proposal to cancel this agreement at any point."
                size="sm"
              />
              <HeadingFaint
                title="————————————————————————————————————"
                size="lg"
              />
            </div>
          )}
          {description && (
            <div>
              <HeadingFaint title="Scope of Work" size="lg" />
              <HeadingFaint
                title="A stream request is designed to give contributors freedom and encouragement to work across multiple domains across the DAO; however, here are the current main focuses / intentions:"
                size="sm"
              />
              <Heading title={description} size="sm" />
              <HeadingFaint
                title="————————————————————————————————————"
                size="lg"
              />
            </div>
          )}
          {complete && (
            <div>
              <HeadingFaint title="Specification" size="lg" />
              <HeadingFaint
                title="This contributor may submit a request for up to the specified amount based on self-assessment of their work."
                size="sm"
              />
              <HeadingFaint title="Intention" size="lg" />
              <HeadingFaint
                title="This is intended to encourage contributors to take immediate action on a wide range of problems/opportunities, as opposed to proceeding through the slower process of submitting a proposal for a narrow scope of work."
                size="sm"
              />
              <HeadingFaint
                title="We prefer to invest in and groom talent, giving them the freedom and capital they need to be entrepreneurs within our community.  We value self-starters who are able to take action and deliver quality work."
                size="sm"
              />
              <HeadingFaint
                title="bUt SomEb0dY m1gHt t@kE t0o mUçh"
                size="lg"
              />
              <HeadingFaint
                title="Both the community and the Stewardship team has the power to cancel this stream if it is being abused.  In addition, if a contributor abuses this trust, they are effectively burning their social credibility and ability to successfully submit proposals in the future.  We expect some lossiness; however, we believe the benefits of getting good work off the ground is worth this small cost."
                size="sm"
              />
              <HeadingFaint
                title="————————————————————————————————————"
                size="lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

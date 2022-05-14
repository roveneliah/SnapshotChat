import { useEffect, useState } from "react";
import { StreamRequestForm } from "./TemplateForms/StreamRequestForm";
import { CustomForm } from "./TemplateForms/CustomForm";
import { useForm } from "../../hooks/useForm";
import { StreamPreview } from "./ProposalPreviews/StreamPreview";
import { ProposalTemplates, TemplateHeader } from "./TemplateHeader";

const { Stream, Custom } = ProposalTemplates;
export default function CreateProposalPage(props: any) {
  const [selectedTemplate, setSelectedTemplate] = useState(Stream);

  const [title, updateTitle] = useForm();
  const [recipientAddress, updateRecipientAddress] = useForm();
  const [usdc, updateUsdc] = useForm();
  const [krause, updateKrause] = useForm();
  const [description, updateDescription] = useForm(``);
  const [url, updateUrl] = useForm();

  return (
    <div className="flex flex-row justify-center">
      <div className="flex w-full flex-row justify-center space-x-5 px-10">
        <div className="flex w-1/2 flex-col space-y-3">
          <TemplateHeader
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
          {selectedTemplate === Stream &&
            StreamRequestForm({
              ...props,
              title,
              updateTitle,
              recipientAddress,
              updateRecipientAddress,
              usdc,
              updateUsdc,
              krause,
              updateKrause,
              description,
              updateDescription,
            })}
          {selectedTemplate === Custom &&
            CustomForm({
              signer: props.signer,
              hodler: props.hodler,
              title,
              updateTitle,
              url,
              updateUrl,
            })}
        </div>
        {selectedTemplate === Stream && (
          <StreamPreview
            title={title}
            recipientAddress={recipientAddress}
            usdc={usdc}
            krause={krause}
            description={description}
            hodler={props.hodler}
            signer={props.signer}
          />
        )}
      </div>
    </div>
  );
}

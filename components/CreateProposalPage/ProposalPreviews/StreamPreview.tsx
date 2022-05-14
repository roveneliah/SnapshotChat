import { createDraft } from "../../../utils/firestore";
import { signMessage } from "../../../utils/web3/submit";
import { Button } from "../../Buttons/Button";
import { Heading } from "../../Generics/Headings/Heading";
import { HeadingFaint } from "../../Generics/Headings/HeadingFaint";

interface Props {
  title?: string;
  recipientAddress?: string;
  usdc?: string;
  krause?: string;
  description?: string;
  hodler?: boolean;
  signer?: any;
}

export function StreamPreview(props: Props) {
  const { usdc, krause, recipientAddress, title, description } = props;
  const complete =
    (usdc || krause) && recipientAddress && title && description ? true : false;

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
      choices: ["Approve", "Conditional Approval", "Needs Edits"],
      state: "review",
    });

    createDraft(proposal);
  };

  return (
    <div className="flex w-2/3 flex-col space-y-5 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
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
      <div className="flex flex-col space-y-5">
        {title && (
          <div>
            <HeadingFaint
              title="————————————————————————————————————"
              size="lg"
            />
            <Heading title={`${title} Contributor Funding Request`} size="lg" />
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
            <Heading title={krause && `${krause} $KRAUSE / month`} size="sm" />
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
            <HeadingFaint title="bUt SomEb0dY m1gHt t@kE t0o mUçh" size="lg" />
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
  );
}

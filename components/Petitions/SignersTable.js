import { Heading } from "../Generics/Headings/Heading";
import { PercentageBar } from "../Generics/PercentageBar";
import { SignatureList } from "./SignatureList";
import { percentApproved } from "./Petition";

export const SignersTable = ({
  title = "Signers",
  signers,
  progressBar = false,
}) =>
  signers?.length > 0 && progressBar ? (
    <div>
      <Heading title={title} size="xl" />
      <PercentageBar title="" percentage={percentApproved(signers)} />
      <SignatureList signers={signers} />
    </div>
  ) : (
    <div>
      <Heading title={title} size="lg" />
      <SignatureList signers={signers} />
    </div>
  );

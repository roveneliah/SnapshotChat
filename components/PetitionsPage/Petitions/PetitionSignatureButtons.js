import { Button } from "../../Buttons/Button";
import { submit } from "../../../utils/web3/submit";
import { postSigner } from "../../../utils/firestore";

const signPetition = (s) => async (petition, status) => {
  if (!s) return;

  const connectedAddress = await s.getAddress();
  const msg = {
    petition: petition.title,
    status,
    signer: connectedAddress,
    requested: petition.signers != null && connectedAddress in petition.signers,
    name: `Rando #${Math.floor(69 * Math.random())}`,
  };

  const signature = await submit(s)(JSON.stringify(msg));
  postSigner(petition)({ ...msg, signature });
};

export const PetitionSignatureButtons = ({ signer, petition }) =>
  ["Approve", "Against", "Abstain"].map((status, i) => (
    <Button
      title={status}
      onClick={async () => await signPetition(signer)(petition, status)}
      key={i}
    />
  ));

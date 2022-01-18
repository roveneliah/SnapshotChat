import { Button } from "../Buttons/Button";

// Inject connect fn.
export const ConnectButton = ({ connect, setSigner }) => (
  <Button title="Connect" onClick={() => connect(setSigner)} color="hollow" />
)
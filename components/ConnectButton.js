

// Inject connect fn.
export const ConnectButton = ({ connect, setSigner }) => (
    <button onClick={() => connect(setSigner)}>
      Connect
    </button>
  )
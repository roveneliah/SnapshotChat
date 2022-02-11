const shortenAddress = (address) =>
  address.slice(0, 6) + "..." + address.slice(-4);

export const Wallet = ({ wallet }) => {
  return (
    <div>
      <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">
        {wallet?.$KRAUSE || 0} $KRAUSE
      </span>
      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
        {wallet?.TICKETS || 0} Genesis Tickets
      </span>
      {/* <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
        {wallet?.CLUB || 0} Club Level
      </span>
      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
        {wallet?.UPPER || 0} Upper Level
      </span> */}
      {/* TODO: modal that allows disconnection */}
      <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
        {shortenAddress(wallet.address)}
      </span>
    </div>
  );
};

export const RelevantSigners = () => {
  const columnHeaders = ["Signer", "Status", "Signature"];
  const signers = [
    { signer: "greg_", status: "Approved", signature: "0x9982636" },
    { signer: "eli", status: "Not Approved" },
  ];

  const row = ({ signer, status, signature }) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {signer}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        {status}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-purple-200">
        <a href="https://app.mycrypto.com/verify-message">{signature}</a>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {columnHeaders.map((colName, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {colName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{signers.map(row)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

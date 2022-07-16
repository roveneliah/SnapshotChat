import { sortWith, ascend, compose, pipe } from "ramda";

export function SignatureList({ signers }) {
  const statusOrder = {
    Against: 1,
    Approve: 2,
    Abstain: 3,
    Pending: 4,
  };

  const colors = {
    Approve:
      "py-4 px-6 text-sm text-green-500 whitespace-nowrap dark:text-green-400",
    Against:
      "py-4 px-6 text-sm text-red-500 whitespace-nowrap dark:text-red-400",
    Abstain:
      "py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400",
    Pending:
      "py-4 px-6 text-sm text-yellow-500 whitespace-nowrap dark:text-yellow-300",
  };

  const row = ({ signer, status, signature, tag }) => (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
      <td className={colors[status]}>{status}</td>
      <td className="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
        {signer}
      </td>
      <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
        {tag}
      </td>
      <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
        {signature}
      </td>
    </tr>
  );

  const sortedSigners = sortWith([ascend(({ status }) => statusOrder[status])])(
    signers
  );
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {["Status", "Signer", "Tags", "Signature"].map(
                    (colHeader, i) => (
                      <th
                        scope="col"
                        className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-400"
                        key={i}
                      >
                        {colHeader}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>{sortedSigners.map(row)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

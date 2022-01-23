import { pipe, map, pick } from "ramda";

const Row = ({ colHeaders, r }) => {
  const first =
    "py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white";
  const standard =
    "py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400";

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {colHeaders
        .map((col) => col.toLowerCase())
        .map((col, i) => {
          return (
            <td className={i === 0 ? first : standard} key={i}>
              {r[col]}
            </td>
          );
        })}
    </tr>
  );
};

export const Table = ({ columnNames, sort, rows }) => {
  // const columnNames = Object.keys(rows[0]);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {columnNames.map((name, i) => (
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      key={i}
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pipe(
                  sort,
                  map(pick(columnNames.map((c) => c.toLowerCase()))),
                  map((row) => Row({ columnNames, r: row }))
                )(rows)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

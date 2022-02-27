import { pipe, map, pick, identity } from "ramda";
import { printPass } from "../../utils/functional";

const Row = ({ colHeaders, r, remove }) => {
  const first =
    "py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white";
  const standard =
    "py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400";
  const removeStyle =
    "py-4 px-6 text-sm text-red-500 whitespace-nowrap dark:text-red-400";

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
        })
        .concat(
          remove && (
            <td onClick={remove} className={removeStyle} key={-1}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </td>
          )
        )}
    </tr>
  );
};

export const Table = ({
  columnNames,
  sort = identity,
  rows,
  removeAtIndex,
}) => {
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
                  {removeAtIndex && (
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-red-700 uppercase dark:text-red-400"
                      key={-1}
                    />
                  )}
                </tr>
              </thead>
              <tbody>
                {pipe(
                  sort,
                  map(pick(columnNames.map((c) => c.toLowerCase()))),
                  (rows) =>
                    rows.map((row, i) => (
                      <Row
                        colHeaders={columnNames}
                        r={row}
                        key={i}
                        remove={() => {
                          console.log("Removing at index", i);
                          console.log("Removing row", row);
                          removeAtIndex(i);
                        }}
                      />
                    ))
                )(rows)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

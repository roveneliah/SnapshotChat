type Props = { choice: number; votesLoaded: boolean; wallet: any };

export const VotedCard = ({ choice, votesLoaded, wallet }: Props) =>
  choice ? (
    <div>
      <span className="mb-2 bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
        Voted: {choice}
      </span>
    </div>
  ) : votesLoaded && wallet.loaded ? (
    <></>
  ) : (
    // <div>
    //   <span className="mb-2 bg-gray-100 text-gray-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
    //     Abstained
    //   </span>
    // </div>
    <></>
  );

import { Button } from "../../Buttons/Button";

export const ViewProfileCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col space-y-3 p-6 basis-1/4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
        <div>
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Your Profile
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Follow other Jerrys to curate their opinions on proposals. This will
            boost their opinions to the top of your feed so you can cut through
            the noise.
          </p>
        </div>
        <Button
          title={"Go"}
          href="/profile"
          color="purple"
          icon={true}
          newTab={true}
          onClick={null}
        />
      </div>
    </div>
  );
};

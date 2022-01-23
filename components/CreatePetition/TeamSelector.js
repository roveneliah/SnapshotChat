import { Button } from "../Buttons/Button";
import { compose, prop, head } from "ramda";
import { useState } from "react";

// TODO: move this into .env.local
const teamMembers = {
  "Dev Team": [
    {
      signer: "eli_",
      address: process.env.NEXT_PUBLIC_ADDR1,
    },
    {
      signer: "greg",
      address: process.env.NEXT_PUBLIC_ADDR2,
    },
  ],
  "Stewards Team": [
    {
      signer: "eli_",
      address: process.env.NEXT_PUBLIC_ADDR1,
    },
    {
      signer: "commodore",
      address: process.env.NEXT_PUBLIC_ADDR2,
    },
    {
      signer: "flexchapman",
      address: "0x435361",
    },
    {
      signer: "gladrobot",
      address: "0x435362",
    },
    {
      signer: "mario lopes",
      address: "0x435364",
    },
    {
      signer: "dogstoevsky",
      address: "0x435365",
    },
    {
      signer: "lewwwk",
      address: "0x435366",
    },
    {
      signer: "magnus",
      address: "0x435367",
    },
  ],
};

export const TeamSelector = ({ addSigners }) => {
  const [selectedTeam, setSelectedTeam] = useState(
    head(Object.keys(teamMembers))
  );

  const addTeam = () => {
    console.log(selectedTeam);
    console.log(
      teamMembers[selectedTeam].map((teamMember) => ({
        ...teamMember,
        tag: selectedTeam,
      }))
    );

    const taggedTeamMembers = teamMembers[selectedTeam].map((teamMember) => ({
      ...teamMember,
      tag: selectedTeam,
    }));

    addSigners(taggedTeamMembers);
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Teams
      </label>
      <div className="flex flex-row space-x-2">
        <Button title="Add" color="purple" onClick={addTeam} />
        <select
          value={selectedTeam}
          onChange={compose(setSelectedTeam, prop("value"), prop("target"))}
          id="team"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {Object.keys(teamMembers).map((teamName) =>
            selectedTeam === teamName ? (
              <option selected value={teamName}>
                {teamName}
              </option>
            ) : (
              <option value={teamName}>{teamName}</option>
            )
          )}
        </select>
      </div>
    </div>
  );
};

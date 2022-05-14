import { Button } from "../Buttons/Button";
import { compose, prop, head, map } from "ramda";
import { useEffect, useState } from "react";
import { addTeams, fetchTeams } from "../../utils/firestore";
import { printPass } from "../../utils/functional";

// Get this from firebase
const useGetTeams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    fetchTeams()
      .then(printPass)
      .then((teams) =>
        teams.reduce((acc, team) => ({ ...acc, [team.name]: team.members }), {})
      )
      .then(setTeams);
  }, []);

  useEffect(() => {
    setSelectedTeam(head(Object.keys(teams)));
  }, [teams]);

  return [teams, selectedTeam, setSelectedTeam];
};

export const TeamSelector = ({ addSigners }) => {
  const [teams, selectedTeam, setSelectedTeam] = useGetTeams();

  const addTeam = () => {
    console.log(teams, selectedTeam);
    const taggedTeamMembers = teams[selectedTeam].map((teamMember) => ({
      ...teamMember,
      tag: selectedTeam,
    }));

    addSigners(taggedTeamMembers);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
        Teams
      </label>
      <div className="flex flex-row space-x-2">
        <Button title="Add" color="purple" onClick={addTeam} />
        <select
          value={selectedTeam}
          onChange={compose(setSelectedTeam, prop("value"), prop("target"))}
          id="team"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          {Object.keys(teams).map((teamName) =>
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

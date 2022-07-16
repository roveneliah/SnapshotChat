import { useState, useEffect } from "react";
import { listenForTeams, addTeams, listenForJerrys } from "../utils/firestore";
import { Button } from "./Buttons/Button";
import { useForm } from "../hooks/useForm";
import { Heading } from "./Generics/Headings/Heading";
import { AddSignersBox } from "./CreatePetitionsPage/AddSignersBox";
import { TeamSelector } from "./CreatePetitionsPage/TeamSelector";
import { AddressForm } from "./CreatePetitionsPage/AddressForm";
import { Table } from "./Generics/Table";
import { useList } from "../hooks/useList";
import { head, prop } from "ramda";

export const useListTeamMembers = () => {
  const [list, addToList, removeAtIndex] = useList([]);

  const addToTeam = (jerry) => {
    const conflicts = list.reduce((conflict, member) => {
      return (
        conflict ||
        Object.keys(member).some((key) => member[key] === jerry[key])
      );
    }, false);
    !conflicts && addToList(jerry);
  };

  return [list, addToTeam, removeAtIndex];
};

export const useListenTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // listen for teams on firebase.
    listenForTeams(setTeams);
  }, []);

  return [teams];
};

const useListenJerrys = () => {
  const [jerrys, setJerrys] = useState([]);

  useEffect(() => {
    listenForJerrys((jerrys) => {
      setJerrys(jerrys);
    });
  }, []);

  return jerrys;
};

export default function TeamsPage(props) {
  const [teams, setTeams] = useListenTeams();
  const [jerrys] = useListenJerrys(); // for searching KH directory
  const [teamMembers, addTeamMember, removeAtIndex] = useListTeamMembers();
  const [teamName, updateTeamName] = useForm("");

  return (
    <div>
      <div>
        <Heading title="Team Name" size="md" />
        <input
          value={teamName}
          onChange={updateTeamName}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="90's Bulls"
        />
      </div>
      <div className="flex flex-row justify-evenly space-x-3">
        {teams && (
          <Table
            title="Teams"
            rows={teams.map((team) => ({
              ...team,
              members: team.members.map(prop("signer")).join(", "),
            }))}
            columnNames={["Name", "Members"]}
          />
        )}
      </div>
      {head(teamMembers) && (
        <div>
          <Heading title="Roster" size="md" />
          <Table
            columnNames={["Signer", "Address"]}
            rows={teamMembers}
            removeAtIndex={removeAtIndex}
          />
          {/* <TeamSelector addSigner={addTeamMember} /> */}
        </div>
      )}
      <AddressForm addSigner={addTeamMember} />
      <Button
        title="Add Team"
        size="large"
        onClick={() =>
          addTeams({
            [teamName]: teamMembers,
          })
        }
      />
    </div>
  );
}

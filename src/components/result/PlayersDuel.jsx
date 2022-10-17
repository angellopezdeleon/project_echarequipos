import React from "react";
import TeamCard from "./TeamCard";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";

function PlayersDuel(props) {
  let [teams, setTeams] = useState([]);

  useEffect(() => {
    function shufflePlayers(namesRaw) {
      let currentIndex = namesRaw.length,
        randomIndex;

      while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [namesRaw[currentIndex], namesRaw[randomIndex]] = [
          namesRaw[randomIndex],
          namesRaw[currentIndex],
        ];
      }
      return namesRaw;
    }

    function sortNames(namesRaw) {
      let i = 0;
      let names = "";
      let regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
      let nameList = [];

      while (i < namesRaw.length) {
        console.log("%cPlayersDuel.jsx line:30 i", "color: #007acc;", i);
        while (i < namesRaw.length && !regex.test(namesRaw[i])) {
          i++;
        }
        if (regex.test(namesRaw[i])) {
          while (i < namesRaw.length && regex.test(namesRaw[i])) {
            names += namesRaw[i];
            i++;
          }
          if (namesRaw[i] || regex.test(namesRaw[i - 1])) {
            nameList.push(names);
            names = "";
          }
        }
      }
      let newNameList = shufflePlayers(nameList);
      return newNameList;
    }

    function createTeams(props) {
      let sortedNames = sortNames(props.props.players);
      console.log(
        "%cPlayersDuel.jsx line:52 sortedNames",
        "color: #007acc;",
        sortedNames
      );
      let teamsSize = sortedNames.length / props.props.teams;
      let j = sortedNames.length;
      let i = 0;
      let teamsGroups = [];

      while (j > 0) {
        let newTeam = {};
        let teamMembers = sortedNames.slice(j - teamsSize, j);
        newTeam.team = teamMembers;
        newTeam.id = i;
        teamsGroups[i] = newTeam;
        i++;
		console.log('%cPlayersDuel.jsx line:71 i', 'color: #007acc;', i);
        j -= teamsSize;
      }
      setTeams(teamsGroups);
    }
    createTeams(props);
  }, []);

  return (
    <Grid container spacing={1} display="flex" justifyContent="center" alignItems="center">
      {teams.map((teams) => {
        return (
          <Grid xs={6}>
            <TeamCard key={teams.id} team={teams.team} id={teams.id} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default PlayersDuel;

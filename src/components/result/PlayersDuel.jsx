import React from "react";
import TeamCard from "./TeamCard";
import { useState, useEffect } from "react";
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

        function createTeams(props) {
            let sortedNames = shufflePlayers(props.props.players);
            let teamsSize = sortedNames.length / props.props.teams;
            let j = sortedNames.length;
            let i = 0;
            let teamsGroups = [];

            while (j > 0 && i < props.props.teams) {
                let newTeam = {};
                let teamMembers = sortedNames.slice(j - teamsSize, j);
                newTeam.team = teamMembers;
                newTeam.id = i;
                teamsGroups[i] = newTeam;
                i++;
                j -= teamsSize;
            }
            setTeams(teamsGroups);
        }

        createTeams(props);
    }, []);

    return (
        <Grid
            container
            spacing={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {teams.map((teams, index) => {
                return (
                    <Grid item xs={6} key={index}>
                        <TeamCard
                            key={teams.id}
                            team={teams.team}
                            id={teams.id}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default PlayersDuel;

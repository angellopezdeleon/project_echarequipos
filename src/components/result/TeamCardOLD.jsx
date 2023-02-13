import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function TeamCard(props) {

  let { id, team } = props;
  
  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: "1em" }}
          color="text.secondary"
          gutterBottom
        >
          EQUIPO {id + 1}
        </Typography>
        {team.map((team) => {
          return (
            <Typography
              key={team + 'Member'}
              variant="span"
              component="div"
              sx={{ fontSize: "1.2em" }}
            >
              {team}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
}

import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";

import { useMoveLocationMutation, MoveDirection } from "src/generated/graphql";

export function Locations(): JSX.Element | null {
  const hero = useHero();
  const [currentDelay, setDelay] = useDelay();
  const [moveMutation, { loading }] = useMoveLocationMutation();

  if (!hero) {
    return null;
  }

  async function handleMove(direction: MoveDirection) {
    try {
      await moveMutation({
        variables: {
          direction,
        },
      });
    } catch (e: any) {
      if (e.graphQLErrors && e.graphQLErrors[0]?.extensions?.delay) {
        setDelay(e.graphQLErrors[0].extensions.remaining);
      }
    }
  }

  return (
    <React.Fragment>
      <Grid container columns={2}>
        <Grid item xs={2} sm={1}>
          <Grid container columns={6} spacing={3}>
            <Grid item style={{ textAlign: "center" }} xs={6}>
              <Typography>Use buttons to move around the map.</Typography>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                disabled={loading || currentDelay > 0}
                variant="contained"
                onClick={() => handleMove(MoveDirection.North)}
              >
                North
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                disabled={loading || currentDelay > 0}
                variant="contained"
                onClick={() => handleMove(MoveDirection.West)}
              >
                West
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Typography>
                {hero.location.x}, {hero.location.y}
              </Typography>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                disabled={loading || currentDelay > 0}
                variant="contained"
                onClick={() => handleMove(MoveDirection.East)}
              >
                East
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                disabled={loading || currentDelay > 0}
                variant="contained"
                onClick={() => handleMove(MoveDirection.South)}
              >
                South
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            <Grid item style={{ textAlign: "center" }} xs={6}>
              <Typography>(Visual map coming very soon)</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
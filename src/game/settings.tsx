import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { useHero } from "src/hooks/use-hero";
import {
  useChangeMinimumStatMutation,
  useChangeAutoDustMutation,
  Hero,
} from "src/generated/graphql";

function MaximumStatField({
  hero,
  stat,
}: {
  hero: Hero;
  stat:
    | "strength"
    | "dexterity"
    | "constitution"
    | "intelligence"
    | "wisdom"
    | "willpower"
    | "luck";
}): JSX.Element {
  const [statValue, setStatValue] = useState<number>(
    hero.settings.minimumStats[stat] ?? 10
  );
  const [changeMinimumStatMutation] = useChangeMinimumStatMutation();

  async function handleValueChange(value: string) {
    let numVal = Number(value);
    if (isNaN(numVal) || !Number.isFinite(numVal)) {
      return;
    }
    numVal = Math.max(1, Math.min(2000000000, numVal));
    setStatValue(numVal);
  }

  async function handleChangeMinimumStat() {
    await changeMinimumStatMutation({
      variables: {
        name: stat,
        value: statValue,
      },
    });
  }

  return (
    <React.Fragment>
      <Grid item xs={2}>
        {`${stat.substr(0, 1).toUpperCase()}${stat.substr(1)}`}:
      </Grid>
      <Grid item xs={2}>
        <TextField
          value={statValue}
          onChange={(e) => handleValueChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={handleChangeMinimumStat}>Save</Button>
      </Grid>
    </React.Fragment>
  );
}

export function AutoDustSetting({ hero }: { hero: Hero }): JSX.Element {
  const [changeAutoDustMutation] = useChangeAutoDustMutation();
  const [autoDust, setAutoDust] = useState<number>(hero.settings.autoDust);

  function handleValueChange(value: string) {
    const num = Math.round(Number(value));

    if (isNaN(num) || !Number.isFinite(num)) {
      return;
    }
    setAutoDust(num);
  }

  async function handleChangeAutoDust() {
    await changeAutoDustMutation({
      variables: {
        value: autoDust,
      },
    });
  }

  return (
    <React.Fragment>
      <Grid item xs={2}>
        Auto dust equipment at or below this level:
      </Grid>
      <Grid item xs={2}>
        <TextField
          value={autoDust}
          onChange={(e) => handleValueChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={handleChangeAutoDust}>Save</Button>
      </Grid>
    </React.Fragment>
  );
}

export function Settings(): JSX.Element {
  const hero = useHero();

  if (!hero) {
    return <div />;
  }

  return (
    <Box>
      <Typography variant="h2">Settings</Typography>
      <Typography variant="subtitle2">
        Configure your mysterious automation
      </Typography>
      <Typography variant="h5">Minimum Stats</Typography>
      <Typography variant="subtitle2">
        Prevents transfering from lowering your stats below these values...
      </Typography>
      <Grid container columns={6}>
        <MaximumStatField hero={hero} stat="strength" />
        <MaximumStatField hero={hero} stat="dexterity" />
        <MaximumStatField hero={hero} stat="constitution" />
        <MaximumStatField hero={hero} stat="intelligence" />
        <MaximumStatField hero={hero} stat="wisdom" />
        <MaximumStatField hero={hero} stat="willpower" />
        <MaximumStatField hero={hero} stat="luck" />
      </Grid>

      <AutoDustSetting hero={hero} />
    </Box>
  );
}

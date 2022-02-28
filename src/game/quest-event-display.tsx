import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import NoSsr from "@mui/material/NoSsr";

import { useDismissQuestMutation, Maybe } from "src/generated/graphql";

export function QuestEventDisplay({
  event,
}: {
  event: { message?: Maybe<string[]> };
}): JSX.Element {
  const { message } = event;
  const [dismissQuest, { loading }] = useDismissQuestMutation();

  function handleClick() {
    dismissQuest();
  }

  return (
    <NoSsr>
      <Box
        sx={{
          bgcolor: "success.light",
          color: "success.contract",
          fontStyle: "italic",
          padding: 2,
        }}
      >
        {message &&
          message.map((str, i) => <Typography key={`${i}`}>{str}</Typography>)}
        <br />
        <Divider />
        <br />
        <Button
          variant="contained"
          color="error"
          onClick={handleClick}
          disabled={loading}
        >
          Continue
        </Button>
        <br />
      </Box>
    </NoSsr>
  );
}
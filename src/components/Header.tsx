import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { SelectEnv } from "./SelectEnv";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    select: {
      flexGrow: 1,
    },
  })
);

export function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SelectEnv />
        </Toolbar>
      </AppBar>
    </div>
  );
}

import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { TableListContext } from "../contexts/TableListContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
      color: theme.palette.info.contrastText,
    },
    select: {
      color: theme.palette.info.contrastText,
    },
    label: {
      color: theme.palette.info.contrastText,
    },
  })
);

export const SelectEnv = () => {
  const classes = useStyles();
  const { tableList, env, setEnv } = useContext(TableListContext);
  const [envList, setEnvList] = useState<string[]>([]);

  useEffect(() => {
    const envList = Object.keys(tableList);
    envList.sort();
    envList.forEach(e => {
      if (e === "develop") {
        setEnv(e);
      }
    });
    setEnvList(envList);
  }, [tableList, setEnv]);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setEnv(event.target.value as string);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-env" className={classes.label}>
        Env
      </InputLabel>
      <Select
        labelId="select-env"
        id="select-env"
        value={env}
        className={classes.select}
        onChange={handleChange}
      >
        {envList.map(e => (
          <MenuItem value={e} key={e}>
            {e}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

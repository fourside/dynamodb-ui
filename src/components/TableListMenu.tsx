import React, { useContext, useState, MouseEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TableListContext } from "../contexts/TableListContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 200,
      backgroundColor: theme.palette.background.paper,
    },
    listItem:{
      paddingTop: 4,
      paddingBottom: 4,
    }
  }),
);

const tablePattern = /^(\w+)-.+$/;

const TableListMenu :React.FC<RouteComponentProps> = ({ history } :RouteComponentProps) => {
  const classes = useStyles();
  const { tableList, env } = useContext(TableListContext);
  const [index, setIndex] = useState<number | null>(null)

  const handleClick = (event: MouseEvent<HTMLDivElement>, i :number, tableName :string) => {
    setIndex(i);
    history.push(`/tables/${tableName}`);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        {tableList[env]?.map((table, i) => {
          const tableName = table.replace(tablePattern, "$1");
          return (
            <ListItem
              key={table}
              button
              selected={index === i}
              onClick={event => handleClick(event, i, tableName)}
              className={classes.listItem}
            >
              <ListItemText primary={tableName} />
            </ListItem>
          )
        })}
      </List>
    </div>
  );

};

export default withRouter(TableListMenu);
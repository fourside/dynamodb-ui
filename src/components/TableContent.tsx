import React, { useEffect, useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TableListContext } from "../contexts/TableListContext";
import { Client } from "../client/client";
import { TableName } from "../domain/TableName";
import { toModel, getFields } from "../domain/Model";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Props = RouteComponentProps<{tableName :string}>;

export const TableContent = ({ match } :Props) => {
  const [items, setItems] = useState<any[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const { tableList, env } = useContext(TableListContext);
  const client = new Client();

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const tableName = match.params.tableName;
      const findCallback = TableName.getFindCallback(tableName, env);
      const tableFullName = tableList[env]?.find(findCallback);
      if (!tableFullName) {
        return;
      }
      const output = await client.scan(tableFullName);
      const items = output.Items?.map(item => toModel(item));
      if (!items) {
        return;
      }
      setItems(items);
      const fields = getFields(items);
      setFields(fields);
    })();
  // eslint-disable-next-line
  }, [match.params.tableName, env]);

  if (items.length === 0) return null;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {fields.map(field => (
              <TableCell key={field}>{field}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              {fields.map(field => (
                <TableCell key={field}>{item[field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

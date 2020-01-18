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
import { ConditionalTableCell } from "./ConditionalTableCell";
import { Loading } from "./Loading";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Props = RouteComponentProps<{tableName :string}>;

export const TableContent = ({ match } :Props) => {
  const [items, setItems] = useState<any[]>([]);
  const [fields, setFields] = useState<string[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const { tableList, env } = useContext(TableListContext);
  const client = new Client();


  useEffect(() => {
    (async () => {
      setInProgress(true);
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
      setInProgress(false);
    })();
  // eslint-disable-next-line
  }, [match.params.tableName, env]);

  return (
    <>
      <h2>{match.params.tableName}</h2>
      {!inProgress && (
        <>
          {items.length === 0 && <p>no data</p>}
          <DynamodbTable fields={fields} items={items} />
        </>
      )}
      {inProgress && <Loading />}
    </>
  );
};

interface TableProps {
  fields :string[]
  items :any[]
}
const DynamodbTable :React.FC<TableProps> = ({ fields, items }) => {

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} stickyHeader size="small" aria-label="a dense table">
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
              {fields.map((field, i) => (
                <ConditionalTableCell key={i} item={item} field={field} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
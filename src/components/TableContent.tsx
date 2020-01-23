import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { ConditionalTableCell } from "./ConditionalTableCell";
import { Loading } from "./Loading";
import { RowDialog } from "./RowDialog";
import { NoData } from "./NoData";
import { useFetchTableContent } from "../hooks/useFetchTable";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Props = RouteComponentProps<{ tableName: string }>;

export const TableContent = ({ match }: Props) => {
  const { items, fields, inProgress } = useFetchTableContent(match.params.tableName);
  return (
    <>
      <h2>{match.params.tableName}</h2>
      {!inProgress && (
        <>
          {items.length === 0 && <NoData />}
          <DynamodbTable
            fields={fields}
            items={items}
            tableName={match.params.tableName}
          />
        </>
      )}
      {inProgress && <Loading />}
    </>
  );
};

interface TableProps {
  tableName: string;
  fields: string[];
  items: any[];
}
const DynamodbTable: React.FC<TableProps> = ({ tableName, fields, items }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const toggle = () => {
    setOpen(!open);
  };

  const handleClickShowItem = (event: React.MouseEvent, item: any) => {
    event.preventDefault();
    setSelectedItem(item);
    setOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          stickyHeader
          size="small"
          aria-label="a dense table"
        >
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
                  <ConditionalTableCell
                    key={i}
                    item={item}
                    field={field}
                    isDetail={false}
                    handleClickShowItem={handleClickShowItem}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RowDialog
        open={open}
        item={selectedItem}
        fields={fields}
        toggle={toggle}
        tableName={tableName}
      />
    </>
  );
};

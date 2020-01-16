import React, { useEffect, useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TableListContext } from "../contexts/TableListContext";
import { Client } from "../client/client";
import { ItemList } from "aws-sdk/clients/dynamodb";

type Props = RouteComponentProps<{tableName :string}>;

export const TableContent = ({ match } :Props) => {
  const [items, setItems] = useState<ItemList | undefined>(undefined);
  const { tableList, env } = useContext(TableListContext);
  const client = new Client();

  useEffect(() => {
    (async () => {
      const tableName = match.params.tableName;
      const pattern = new RegExp(`^${tableName}-\\w+-${env}$`);
      const tableFullName = tableList[env]?.find(table => pattern.test(table));
      console.log("tablename", tableFullName)
      if (tableFullName) {
        const output = await client.scan(tableFullName);
        setItems(output.Items);
        console.log(items);
      }
    })();
  // eslint-disable-next-line
  }, [match.params.tableName, env]);

  if (!items) return null;

  return (
    <></>
  );
};

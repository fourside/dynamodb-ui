import React, { useContext } from "react";
import { TableListContext } from "../contexts/TableListContext";

const tablePattern = /^(\w+)-.+$/;

export const TableListMenu :React.FC = () => {
  const { tableList, env } = useContext(TableListContext);

  return (
    <ul>
      {tableList[env]?.map(table => (
        <li key={table}>
          {table.replace(tablePattern, "$1")}
        </li>
      ))}
    </ul>
  );

};

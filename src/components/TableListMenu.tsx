import React, { useContext } from "react";
import { TableListContext } from "../contexts/TableListContext";


interface prop {
  envName :string
};

const tablePattern = /^(\w+)-.+$/;

export const TableListMenu :React.FC<prop> = ({ envName }) => {
  const tableList = useContext(TableListContext);

  return (
    <ul>
      {tableList[envName]?.map(table => (
        <li key={table}>
          {table.replace(tablePattern, "$1")}
        </li>
      ))}
    </ul>
  );

};

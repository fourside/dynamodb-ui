import React from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<{tableName :string}>;

export const TableContent = ({ match } :Props) => {
  console.log("tablename:", match.params.tableName);
  return (
    <></>
  );
};

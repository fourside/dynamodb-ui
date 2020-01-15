import { createContext } from "react";
import { TableList } from "../client/client";

const tableList :TableList = {};
export const TableListContext = createContext(tableList);

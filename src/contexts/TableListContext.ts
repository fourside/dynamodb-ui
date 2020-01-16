import { createContext } from "react";
import { TableList } from "../client/client";

const tableList :TableList = {};
const env = "";
const setEnv = (env :string) => {};
export const TableListContext = createContext({ tableList, env, setEnv });

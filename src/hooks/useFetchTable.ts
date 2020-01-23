import { useEffect, useState, useContext } from "react";
import { TableName } from "../domain/TableName";
import { TableListContext } from "../contexts/TableListContext";
import { Client, TableList } from "../client/client";
import { toModel, getFields } from "../domain/Model";

const client = new Client();

export const useFetchTableList = () => {

  const [tableList, setTableList] = useState<TableList>({});
  const [env, setEnv] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const tables = await client.listTablesByEnv();
        setTableList(tables);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return { tableList, env, setEnv };
};

type TableType = {
  items :any[];
  fields :string[];
  inProgress :boolean;
};

export const useFetchTableContent = (tableName: string) => {

  const { tableList, env } = useContext(TableListContext);
  const [state, setState] = useState<TableType>({
    items: [],
    fields: [],
    inProgress: false,
  });

  useEffect(() => {
    setState(state => {
      return {
        ...state,
        inProgress: true,
      };
    });
    const findCallback = TableName.getFindCallback(tableName, env);
    const tableFullName = tableList[env]?.find(findCallback);
    if (!tableFullName) {
      return;
    }
    (async () => {
      const output = await client.scan(tableFullName);
      const items = output.Items?.map(item => toModel(item));
      if (!items) {
        return;
      }
      const fields = getFields(items);
      setState({
        items,
        fields,
        inProgress: false,
      });
    })();
  }, [tableName, env, tableList]);

  return state;
};

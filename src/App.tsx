import React, { useState, useEffect } from "react";
import { TableList, Client } from "./client/client";
import { TableListContext } from "./contexts/TableListContext";
import { DynamodbUI } from "./components/DynamodbUI";

const App :React.FC = () => {

  const [tableList, setTableList] = useState<TableList>({});
  const [env, setEnv] = useState("");
  const value = {tableList, env, setEnv};

  useEffect(() => {
    (async () => {
      try {
        const client = new Client();
        const tables = await client.listTablesByEnv();
        setTableList(tables);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <TableListContext.Provider value={value} >
      <DynamodbUI />
    </TableListContext.Provider>
  );
};

export default App;

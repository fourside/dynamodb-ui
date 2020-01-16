import React, { useState, useEffect } from "react";
import { TableList, Client } from "./client/client";
import { TableListContext } from "./contexts/TableListContext";
import { TableListMenu } from "./components/TableListMenu";
import { Header } from "./components/Header";

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
      <Header />
      <TableListMenu />
    </TableListContext.Provider>
  );
};

export default App;

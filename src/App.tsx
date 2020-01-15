import React, { useState, useEffect } from "react";
import { TableList, Client } from "./client/client";
import { TableListContext } from "./contexts/TableListContext";
import { TableListMenu } from "./components/TableListMenu";
import { Header } from "./components/Header";

const App :React.FC = () => {

  const [tableList, setTableList] = useState<TableList>({});

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
    <TableListContext.Provider value={tableList} >
      <Header />
      <TableListMenu envName={"production"} />
    </TableListContext.Provider>
  );
};

export default App;

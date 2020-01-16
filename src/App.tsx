import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TableList, Client } from "./client/client";
import { TableListContext } from "./contexts/TableListContext";
import TableListMenu from "./components/TableListMenu";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { TableContent } from "./components/TableContent";

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
    <Router>
      <TableListContext.Provider value={value} >
        <Header />
        <TableListMenu />
        <Switch>
          <Route path="/tables/:tableName" component={TableContent} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </TableListContext.Provider>
    </Router>
  );
};

export default App;

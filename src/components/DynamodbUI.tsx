import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import TableListMenu from "./TableListMenu";
import { Header } from "./Header";
import { Home } from "./Home";
import { TableContent } from "./TableContent";

export const DynamodbUI: React.FC = () => {
  return (
    <Router>
      <Header />
      <Grid container>
        <Grid item xs={2}>
          <TableListMenu />
        </Grid>
        <Grid item xs={10}>
          <Switch>
            <Route path="/tables/:tableName" component={TableContent} />
            <Route path="/" component={Home} />
          </Switch>
        </Grid>
      </Grid>
    </Router>
  );
};

import React from "react";
import { TableListContext } from "./contexts/TableListContext";
import { DynamodbUI } from "./components/DynamodbUI";
import { useFetchTableList } from "./hooks/useFetchTable";

const App :React.FC = () => {

  const value = useFetchTableList();

  return (
    <TableListContext.Provider value={value} >
      <DynamodbUI />
    </TableListContext.Provider>
  );
};

export default App;

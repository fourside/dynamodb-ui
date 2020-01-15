import React, { useState, useEffect } from 'react';
import { TableList, Client } from './client/client';
import { TableListContext } from './contexts/TableListContext';

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
      Hello World
    </TableListContext.Provider>

  );
};

export default App;

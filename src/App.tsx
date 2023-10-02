import React, { useState, ChangeEvent } from 'react';
import './App.css';
import Table from './components/table.component';

function App(): JSX.Element {
  const [rows, setRows] = useState<number>(3);
  const [columns, setColumns] = useState<number>(5);

  const handleRowsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let newRowCount = parseInt(e.target.value, 10);
    if (isNaN(newRowCount) || newRowCount <= 0) {
      newRowCount = 1;
    } else if (newRowCount > 100) {
      newRowCount = 100;
    }
    setRows(newRowCount);
  };

  const handleColumnsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let newColumnCount = parseInt(e.target.value, 10);
    if (isNaN(newColumnCount) || newColumnCount <= 0) {
      newColumnCount = 1;
    } else if (newColumnCount > 100) {
      newColumnCount = 100;
    }
    setColumns(newColumnCount);
  };

  return (
    <div className="App">
      <div>
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={handleRowsChange}
            min="1"
            max="100"
          />
        </label>
      </div>
      <div>
        <label>
          Columns:
          <input
            type="number"
            value={columns}
            onChange={handleColumnsChange}
            min="1"
            max="100"
          />
        </label>
      </div>
      <Table rows={rows} columns={columns} />
    </div>
  );
}

export default App;

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './table.style.css';
import { calculatePercentage, findDuplicateAmounts } from '../utils/utils.table';

type CellId = number;
type CellValue = number;

type Cell = {
  id: CellId;
  amount: CellValue;
};

interface TableProps {
  rows: number;
  columns: number;
}

const Table: React.FC<TableProps> = ({ rows, columns }) => {
  const [rowSums, setRowSums] = useState<number[]>([]);
  const [colAverages, setColAverages] = useState<number[]>([]);
  const [initialData, setInitialData] = useState<Cell[][]>([]);
  
  const data = useMemo(() => {
    const newData: Cell[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < columns; j++) {
        row.push({
          id: i * columns + j,
          amount: Math.floor(Math.random() * 25),
        });
      }
      newData.push(row);
    }
    return newData;
  }, [rows, columns]);
  
  useEffect(() => {
    setInitialData(data);
  }, [data]);
  
  const calculateSumsAndAverages = useCallback(() => {
    const newColSums: number[] = Array(columns).fill(0);
    const newRowSums: number[] = [];
    let totalSum = 0;
  
    initialData.forEach((row, rowIndex) => {
      let newRowSum = 0;
      row.forEach((cell, colIndex) => {
        newRowSum += cell.amount;
        totalSum += cell.amount;
        newColSums[colIndex] += cell.amount;
      });
      newRowSums.push(newRowSum);
    });
  
    const newColAverages = newColSums.map((sum) => (sum / rows).toFixed(2));
    setColAverages(newColAverages.map(Number));
    setRowSums(newRowSums);
  }, [initialData, rows, columns]);
  
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const upd = [...initialData]
    upd[rowIndex][colIndex].amount += 1
    return setInitialData(upd)
  }

  const handleRemoveRow = (rowIndex: number) => {
    const updatedData = [...initialData];
    updatedData.splice(rowIndex, 1);
    setInitialData(updatedData);
  };
  
  const handleRemoveColumn = (colIndex: number) => {
    const updatedData = [...initialData];
    updatedData.forEach((row) => {
      row.splice(colIndex, 1);
    });
    setInitialData(updatedData);
  };
  
  useEffect(() => {
    calculateSumsAndAverages();
  }, [initialData, calculateSumsAndAverages]);

  const duplicateCells = useMemo(() => findDuplicateAmounts(initialData), [initialData]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: initialData[0]?.length || 0 }, (_, index) => ( // i know to use Index by key it's bad practice ;) 
              <th key={index}> 
                Cell Values N = {index + 1}
                <button onClick={() => handleRemoveColumn(index)}>Remove Column</button>
              </th>
            ))}
            <th>Sum values</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th>
                Cell Values M = {rowIndex + 1} 
                <button onClick={() => handleRemoveRow(rowIndex)}>Remove Row</button>
              </th>
              {row.map((cell, colIndex) => {
                const isDuplicate = duplicateCells.some((duplicateCell) => duplicateCell.amount === cell.amount);
                const percentage = calculatePercentage(cell.amount, rowSums[rowIndex]);

                return (
                  <td 
                    key={colIndex} 
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`cell ${isDuplicate ? 'equal' : 'not-equal'}`}
                  >
                      <span>{cell.amount}</span> <span className="percentage">{`-> ${percentage}`}</span>
                  </td>
                );
              })}
              <th>{rowSums[rowIndex]}</th>
            </tr>
          ))}
          <tr>
            <th>Average values</th>
            {Array.from({ length: columns }, (_, index) => (
              <th key={index}>{colAverages[index]}</th>
            ))}
            <th></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
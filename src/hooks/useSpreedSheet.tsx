import { useState, useEffect } from 'react'
import _ from 'lodash';

const NUM_ROWS = 10;
const NUM_COLUMNS = 10;


type SelectedCell  = {
  rowIndex: number
  colIndex: number
} | null

export const useSpreedSheet = () => {
  const [spreadsheetState, setSpreadsheetState] = useState(
    _.times(NUM_ROWS, () => _.times(NUM_COLUMNS, _.constant(''))),
  );
  
  const [selectedCell, setSelectedCell] = useState<SelectedCell>(null)

  const onCellSelected = (rowIndex: number, colIndex: number) => {
    // boundary test
    if (rowIndex < 0 || colIndex < 0 || rowIndex >= NUM_ROWS || colIndex >= NUM_COLUMNS) {
      return
    }
    setSelectedCell({ rowIndex, colIndex})
  }

  const onCellChange = (rowIndex: number, colIndex: number, newValue: string) => {
    
    const newRow = [
      ...spreadsheetState[rowIndex].slice(0, colIndex),
      newValue,
      ...spreadsheetState[rowIndex].slice(colIndex + 1),
    ];
    setSpreadsheetState([
      ...spreadsheetState.slice(0, rowIndex),
      newRow,
      ...spreadsheetState.slice(rowIndex + 1),
    ]);

  }

  useEffect(function keyboardNavigation () {
    const handleKeyDown = (event: KeyboardEvent) => {
      // don't use keyboard navigation if no current cell selected
      if (!selectedCell) return

     
      // Arrow Up
      if (event.keyCode === 38) {
        // @ts-ignore
        document.activeElement.blur();

        if (selectedCell.rowIndex > 0) {
          setSelectedCell(prev => ({
            ...prev,
            rowIndex: prev.rowIndex - 1
          }))
        }
      } 
      // Arrow Down
      else if (event.keyCode === 40) {
        // @ts-ignore
        document.activeElement.blur();
        if (selectedCell.rowIndex < NUM_ROWS -1) {
          setSelectedCell(prev => ({
            ...prev,
            rowIndex: prev.rowIndex + 1
          }))
        }
      }
      // Arrow Left
      else if (event.keyCode === 37) {
        // @ts-ignore
        document.activeElement.blur();
        if (selectedCell.colIndex > 0) {
          setSelectedCell(prev => ({
            ...prev,
            colIndex: prev.colIndex - 1
          }))
        }
      }
      // Arrow Right
      else if (event.keyCode === 39) {
        // @ts-ignore
        document.activeElement.blur();
        if (selectedCell.colIndex < NUM_COLUMNS - 1) {
          setSelectedCell(prev => ({
            ...prev,
            colIndex: prev.colIndex + 1
          }))
        }
      }
      // enter key
      else if (event.keyCode === 13) {
        // @ts-ignore
        document.activeElement.blur();
        if (selectedCell?.rowIndex < NUM_ROWS - 1) {
          setSelectedCell(prev => ({
            ...prev,
            rowIndex: prev.rowIndex + 1,
          }))
        }
        else {
          setSelectedCell(null)
        }
      }
      // Tab key
      else if (event.keyCode === 9) {
        event.preventDefault();
        // @ts-ignore
        document.activeElement.blur();
        if (selectedCell.colIndex < NUM_COLUMNS - 1) {
          setSelectedCell(prev => ({
            ...prev,
            colIndex: prev.colIndex + 1
          }))
        }
        else {
          if (selectedCell.rowIndex < NUM_ROWS - 1) {
            setSelectedCell(prev => ({
              rowIndex: prev.rowIndex + 1,
              colIndex: 0
            }))
          }
          else {
            setSelectedCell(null)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCell])


  return {
    numCols: NUM_COLUMNS,
    spreadsheetState,
    selectedCell,
    onCellSelected,
    onCellChange,
  }
}
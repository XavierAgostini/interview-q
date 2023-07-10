import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';

import TableHeader from 'components/TableHeader'
import Cell from 'components/Cell';
import RowLabel from 'components/RowLabel'
import { useSpreedSheet } from 'hooks/useSpreedSheet';

const Spreadsheet: React.FC = () => {

  const {
    spreadsheetState,
    selectedCell,
    numCols,
    onCellSelected,
    onCellChange,
  } = useSpreedSheet()

  return (
    <Box width="full">
      <TableHeader
        numCols={numCols}
        selectedCol={selectedCell?.colIndex}
      />
      {spreadsheetState.map((row, rowIdx) => {
        return (
          <Flex key={String(rowIdx)}>
            <RowLabel
              label={`${rowIdx}`}
              isSelected={selectedCell?.rowIndex === rowIdx}
            />
            {row.map((cellValue, columnIdx) => (
              <Cell
                key={`${rowIdx}/${columnIdx}`}
                rowIdx={rowIdx}
                columnIdx={columnIdx}
                isSelected={Boolean(selectedCell && selectedCell.rowIndex == rowIdx && selectedCell.colIndex == columnIdx)}
                value={cellValue}
                onClick={onCellSelected}
                onChange={onCellChange}
              />
            ))}
          </Flex>
        );
      })}
    </Box>
  );
};

export default Spreadsheet;

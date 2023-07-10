import { Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
  colIndex: number;
  isSelected: boolean;
}

const ColumnLabel: React.FC<Props> = ({  colIndex, isSelected }) => {
  const label = String.fromCharCode(64 + colIndex + 1)

  return (
    <Box 
      width="full"
      className={`columnLabel ${isSelected ? 'activeLabel' : ''}`}
      >
      {label}
    </Box>
  );
};

export default ColumnLabel;

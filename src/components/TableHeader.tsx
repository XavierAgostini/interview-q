import React from 'react'
import { Flex, Box } from '@chakra-ui/react';
import _ from 'lodash';

import ColumnLabel from './ColumnLabel'

interface Props {
  numCols: number;
  selectedCol: number;
}
const TableHeader: React.FC<Props> = ({ numCols, selectedCol }) => {
  return (
    <Box>
      <Flex>
        <Box className='cornerBox'></Box>
        {_.times(numCols).map(colIndex => (
          <ColumnLabel
            key={colIndex}
            colIndex={colIndex}
            isSelected={selectedCol == colIndex}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default TableHeader
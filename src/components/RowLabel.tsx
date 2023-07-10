import { Box } from '@chakra-ui/react';
import React from 'react';

interface Props {
  label: string;
  isSelected: boolean;
}

const Label: React.FC<Props> = ({ label, isSelected }) => {

  return (
    <Box 
      className={`rowLabel ${isSelected ? 'activeLabel' : ''}`}
    >
      {label}
    </Box>
  );
};

export default Label;

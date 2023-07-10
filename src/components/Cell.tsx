import { Input, Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useCallback } from 'react';

interface Props {
  value: string;
  rowIdx: number;
  columnIdx: number;
  isSelected: boolean;
  onChange: (rowIdx: number, columnIdx: number, newValue: string) => void;
  onClick: (rowIdx: number, columnIdx: number) => void
}

const Cell: React.FC<Props> = ({ value, rowIdx, columnIdx, isSelected, onClick, onChange }) => {

  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (ev) => {
      onChange(rowIdx, columnIdx, ev.target.value);
    },
    [onChange],
  );

  const handleCellClicked = () => onClick(rowIdx, columnIdx)
 
  const formatValue = (input: string) => {
    const number = parseFloat(input);
  
    if (!isNaN(number)) {
      const formattedCurrency = number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return formattedCurrency;
    }
    return input
  }

  useEffect(function initializeSelection () {
    const cellSelectedButNotFocused = isSelected && document.activeElement !== inputRef.current 
    if (cellSelectedButNotFocused) {
      inputRef.current.focus()
    }
  }, [isSelected])

  return (
    <Box 
      onClick={handleCellClicked}
    >
      {!isSelected ? (
         <Input value={formatValue(value)} borderRadius={0} width="full" ref={inputRef} readOnly />
      ) : (
        <Input value={value} borderRadius={0} width="full" onChange={onChangeHandler} ref={inputRef} />
      )}
     
    </Box>
  );
};

export default Cell;

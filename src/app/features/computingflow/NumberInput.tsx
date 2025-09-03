import React, { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Box, TextField, Typography } from "@mui/material";

interface NumberInputProps {
  id: string;
  data: {
    value: number;
    label: string;
  };
}

const NumberInput: React.FC<NumberInputProps> = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();
  const [number, setNumber] = useState<number>(data.value);

  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const cappedNumber = Math.min(255, Math.max(0, Number(evt.target.value)));
      setNumber(cappedNumber);
      updateNodeData(id, { value: cappedNumber });
    },
    [updateNodeData, id]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 1,
        backgroundColor: "#f5f5f5",
        borderRadius: 1,
      }}
    >
      <Typography variant="body2">{data.label}</Typography>
      <TextField
        id={`number-${id}`}
        name="number"
        type="number"
        inputProps={{ min: 0, max: 255 }}
        onChange={onChange}
        value={number}
        size="small"
      />
      <Handle type="source" position={Position.Right} />
    </Box>
  );
};

export default NumberInput;
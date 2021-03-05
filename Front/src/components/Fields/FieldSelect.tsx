import { TextField } from "@material-ui/core";
import React, { forwardRef } from "react";
interface propsDetails {
  options: (string | number)[];
  ref: any;
  id: string;
  type: string;
  label?: string;
  name: string;
  error: boolean;
  helperText: string;
}

const FieldInput = forwardRef((props: propsDetails, ref) => {
  const { options, ...rest } = props;
  return (
    <TextField
      select
      variant="outlined"
      margin="normal"
      inputRef={ref}
      fullWidth
      {...rest}
      SelectProps={{
        native: true,
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </TextField>
  );
});

export default FieldInput;

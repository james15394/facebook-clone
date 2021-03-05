import { TextField } from "@material-ui/core";
import React, { forwardRef } from "react";
interface propsDetails {
  id: string;
  type: string;
  label: string;
  name: string;
  error: any;
  helperText: any;
}
const Input = forwardRef((props: propsDetails, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});

export default Input;

import { FormControlLabel, Radio } from "@material-ui/core";
import React, { forwardRef } from "react";
interface propsDetails {
  ref: any;
  label: string;
  value: string;
  error: boolean;
  name: string;
  helperText: string;
}

const FieldRadio = forwardRef((props: propsDetails, ref) => {
  return <FormControlLabel control={<Radio />} {...props} />;
});

export default FieldRadio;

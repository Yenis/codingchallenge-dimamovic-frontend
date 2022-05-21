
import { TextField } from "@mui/material";
import { FieldAttributes, useField } from "formik";

export const InputField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField 
      {...field}
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
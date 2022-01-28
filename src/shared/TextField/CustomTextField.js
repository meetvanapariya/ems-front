import { TextField, MenuItem } from "@mui/material";

const CustomTextField = ({
  id,
  label,
  size,
  variant,
  field,
  select,
  ...rest
}) => {
  return (
    <>
      {select ? (
        <TextField
          id={id}
          label={label}
          size={size}
          variant={variant}
          InputLabelProps={{
            shrink: true,
          }}
          {...field}
          select
          fullWidth
          {...rest}
        >
          {rest?.options?.map((option) => (
            <MenuItem key={MenuItem.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          id={id}
          label={label}
          size={size}
          variant={variant}
          {...field}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          {...rest}
        />
      )}
    </>
  );
};

CustomTextField.defaultProps = {
  label: "Enter Value",
  variant: "outlined",
  size: "small",
};
export default CustomTextField;

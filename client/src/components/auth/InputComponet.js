import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import React from "react";
import { Email, Lock, People, Person2 } from "@mui/icons-material";

export const EmailInput = ({ onChange, helperText }) => {
  return (
    <FormControl
      sx={{ m: 1, width: "100%" }}
      variant="outlined"
      error={Boolean(helperText)}
      required
    >
      <InputLabel size={"small"} htmlFor="outlined-adornment-email">
        Email
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        type={"email"}
        size={"small"}
        onChange={(e) => onChange(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Email fontSize={"small"} />
          </InputAdornment>
        }
        label="Email"
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export const PasswordInput = ({ onChange, label, error, helperText }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{ m: 1, width: "100%" }}
      variant="outlined"
      error={Boolean(error)}
      required
    >
      <InputLabel size={"small"} htmlFor={label}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={label}
        type={showPassword ? "text" : "password"}
        size={"small"}
        onChange={(e) => onChange(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Lock fontSize={"small"} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size={"small"}
            >
              {showPassword ? (
                <VisibilityOff fontSize={"small"} />
              ) : (
                <Visibility fontSize={"small"} />
              )}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export const Firstname = ({ onChange, helperText }) => {
  return (
    <FormControl
      sx={{ m: 0, width: "100%" }}
      variant="outlined"
      error={Boolean(helperText)}
      required
    >
      <InputLabel size={"small"} htmlFor="firstname">
        First Name
      </InputLabel>
      <OutlinedInput
        id="firstname"
        type={"text"}
        size={"small"}
        onChange={(e) => onChange(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <People fontSize={"small"} />
          </InputAdornment>
        }
        label="First Name"
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export const Lastname = ({ onChange, helperText }) => {
  return (
    <FormControl
      sx={{ m: 0, width: "100%" }}
      variant="outlined"
      error={Boolean(helperText)}
      required
    >
      <InputLabel size={"small"} htmlFor="lastname">
        Last Name
      </InputLabel>
      <OutlinedInput
        id="lastname"
        type={"text"}
        size={"small"}
        onChange={(e) => onChange(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Person2 fontSize={"small"} />
          </InputAdornment>
        }
        label="Last Name"
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

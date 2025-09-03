import {
  Box,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "@mui/material/utils";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormFieldProps } from "../../model/Form.types";

export const FormSelectField: React.FC<FormFieldProps> = ({
  name,
  label,
  options = [],
  rules,
  disabled,
  isSearchEnabled = false,
  allowCustomValue = false,
  isOptionLoading = false,
  searchFunction,
}) => {
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpen = useCallback(() => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      setTimeout(() => searchInputRef.current?.focus(), 150);
    });
  }, []);

  const handleClose = useCallback(() => {
    setMenuOpen(false);
    setSearchTerm("");
  }, []);

  useEffect(() => {
    if (isSearchEnabled && menuOpen && searchFunction) {
      debounce((searchTerm: string) => {
        searchFunction(searchTerm);
      }, 300)(searchTerm);
    }
  }, [searchTerm]);

  const filteredOptions = useMemo(() => {
    if (!isSearchEnabled) return options;
    return options.filter((option) =>
      String(option.label).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, isSearchEnabled]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const fieldValue = field.value ?? "";
        const selectedOption = options.find(
          (option) => option.value === field.value
        );
        const hasDescription = !!selectedOption?.description;

        // Check if current value exists in options
        const valueExists = options.some(
          (option) => option.value === fieldValue
        );

        // If value doesn't exist in options and allowCustomValue is true, show as text input
        const showAsTextInput =
          allowCustomValue && !valueExists && fieldValue !== "";

        if (showAsTextInput) {
          return (
            <TextField
              variant="standard"
              value={fieldValue}
              label={label}
              fullWidth
              disabled={disabled}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                endAdornment: (
                  <Box
                    component="button"
                    onClick={() => {
                      field.onChange("");
                    }}
                    sx={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "gray",
                      "&:hover": { color: "black" },
                    }}
                  >
                    ✕
                  </Box>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiInputLabel-root": { top: "-6px", fontSize: "small" },
                "& .MuiInputLabel-shrink": { top: 0 },
              }}
            />
          );
        }

        return (
          <TextField
            variant="standard"
            {...field}
            value={fieldValue}
            select
            label={label}
            fullWidth
            disabled={disabled}
            onChange={(event) => {
              field.onChange(event.target.value);
              setSearchTerm("");
            }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            SelectProps={{
              open: menuOpen,
              onOpen: handleOpen,
              onClose: handleClose,
              MenuProps: {
                autoFocus: false,
                sx: {
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(-5px)",
                  transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
                },
                onKeyDown: (event) => {
                  if (document.activeElement === searchInputRef.current) {
                    event.stopPropagation();
                  }
                },
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: hasDescription ? 56 : 36,
                display: "flex",
                alignItems: "center",
                backgroundColor: "inherit",
              },
              "& .MuiInputLabel-root": { top: "-6px", fontSize: "x-small" },
              "& .MuiInputLabel-shrink": { top: 0 },
            }}
          >
            {isSearchEnabled && (
              <MenuItem
                disableRipple
                onClick={(e) => e.stopPropagation()}
                sx={{
                  backgroundColor: "inherit !important",
                  "&.Mui-focusVisible": { backgroundColor: "inherit" },
                  "&.Mui-selected": { backgroundColor: "inherit" },
                  "&:hover": { backgroundColor: "inherit" },
                }}
              >
                <TextField
                  variant="standard"
                  fullWidth
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  inputRef={searchInputRef}
                  autoFocus
                  onKeyDown={(event) => {
                    event.stopPropagation();
                    // If Enter is pressed and allowCustomValue is true, use the search term as custom value
                    if (
                      event.key === "Enter" &&
                      allowCustomValue &&
                      searchTerm
                    ) {
                      field.onChange(searchTerm);
                      handleClose();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    "& .MuiInputBase-input": {
                      backgroundColor: "inherit",
                    },
                  }}
                />
                {isOptionLoading && (
                  <CircularProgress size={20} sx={{ ml: 1 }} />
                )}
              </MenuItem>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <MenuItem
                  key={option.label}
                  value={option.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange(option.value);
                    setSearchTerm("");
                    handleClose();
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontSize={"small"}>
                      {option.label}
                    </Typography>
                    {option.description && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontSize={"x-small"}
                      >
                        {option.description}
                      </Typography>
                    )}
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled={!allowCustomValue}>
                {allowCustomValue && searchTerm ? (
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      field.onChange(searchTerm);
                      handleClose();
                    }}
                    sx={{ cursor: "pointer", width: "100%" }}
                  >
                    <Typography variant="body2">Add "{searchTerm}"</Typography>
                  </Box>
                ) : (
                  <Typography variant="body2">No results found</Typography>
                )}
              </MenuItem>
            )}
          </TextField>
        );
      }}
    />
  );
};

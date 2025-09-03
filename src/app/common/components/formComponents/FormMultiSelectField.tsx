import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { debounce } from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormFieldProps, IFormOptions } from '../../model/Form.types';
import NodeIcon from '../../../../utils/NodeIcon';

const styles = {
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
    overflowY: 'auto',
    maxHeight: '4.5em',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 'x-small',
    top: '-6px',
    left: '-14px',
    '&.MuiInputLabel-shrink': {
      top: '5px',
      left: '-15px',
      fontSize: 'small',
    },
  },
  searchContainer: {
    padding: '8px',
    position: 'sticky',
    top: 0,
    background: 'white', // Use a solid color instead of 'inherit'
    zIndex: 1200, // Higher z-index to ensure it stays on top
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)', // Add a subtle border
    marginBottom: '4px', // Add some space below the search box
  },
  menuPaper: {
    maxHeight: 250,
    overflowY: 'auto',
    '& .MuiList-root': {
      paddingTop: 0, // Remove default padding to avoid gaps
    },
  },
  clearAll: {
    fontWeight: 'bold',
    color: 'White',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    position: 'sticky', // Make the clear all button sticky too
    top: '46px', // Position it just below the search box
    zIndex: 1100, // Lower than search but higher than options
  },
  searchTextField: {
    '& .MuiInputBase-root': {
      backgroundColor: 'white',
    },
    '& .MuiInputBase-input:focus': {
      backgroundColor: 'white',
    },
  },
  menuList: {
    paddingTop: 0, // Remove default padding
  },
};

export const FormMultiSelectField: React.FC<FormFieldProps> = ({
  name,
  label,
  options = [],
  rules,
  disabled,
  isSearchEnabled = false,
  isOptionLoading = false,
  searchFunction,
  returnObjects,
}) => {
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Create a stable debounced search function with useCallback
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (searchFunction && term.trim() !== '') {
        searchFunction(term);
      }
    }, 300),
    [searchFunction]
  );

  const handleOpen = useCallback(() => {
    setMenuOpen(true);
    if (isSearchEnabled) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchEnabled]);

  const handleClose = useCallback(() => {
    setMenuOpen(false);
    if (isSearchEnabled) {
      setSearchTerm('');
    }
  }, [isSearchEnabled]);

  // Handle search term changes
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTerm = e.target.value;
      setSearchTerm(newTerm);

      if (isSearchEnabled && menuOpen && searchFunction) {
        debouncedSearch(newTerm);
      }
    },
    [isSearchEnabled, menuOpen, searchFunction, debouncedSearch]
  );

  const filteredOptions = useMemo(() => {
    const uniqueOptions = Array.from(
      new Map(options.map((o) => [o.value, o])).values()
    );
    if (!isSearchEnabled) return uniqueOptions;
    return uniqueOptions
      .filter((option) =>
        String(option.label).toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => String(a.label).localeCompare(String(b.label)));
  }, [options, searchTerm, isSearchEnabled]);

  // Clean up the debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field, fieldState }) => {
        // Handle both object array and primitive array formats
        const selectedItems: IFormOptions[] = Array.isArray(field.value)
          ? field.value.map((item) => {
              if (
                typeof item === 'object' &&
                item !== null &&
                'value' in item
              ) {
                return item as IFormOptions;
              } else {
                const option = options.find((opt) => opt.value === item);
                return option
                  ? { ...option }
                  : { value: item, label: String(item) };
              }
            })
          : [];

        // Extract just the values for the Select component
        const selectedValues = selectedItems.map((item) => item.value);
        return (
          <FormControl fullWidth>
            <InputLabel id={`${name}-label`} sx={styles.inputLabel}>
              {label}
            </InputLabel>
            <Select
              labelId={`${name}-label`}
              id={name}
              multiple
              open={menuOpen}
              onOpen={handleOpen}
              onClose={handleClose}
              value={selectedValues}
              onChange={() => {
                // This is just for the MUI Select component, actual handling is in MenuItem onClick
              }}
              error={!!fieldState.error}
              renderValue={() => (
                <Box
                  sx={styles.chipContainer}
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  {selectedItems.map((item) => (
                    <Chip
                      key={`${item.value}-${name}`}
                      label={item.label}
                      avatar={
                        item.icon && (
                          <Avatar>
                            <NodeIcon iconName={item.icon as string} />
                          </Avatar>
                        )
                      }
                      onDelete={() => {
                        const newItems = selectedItems.filter(
                          (i) => i.value !== item.value
                        );
                        field.onChange(
                          returnObjects
                            ? newItems
                            : newItems.map((i) => i.value)
                        );
                      }}
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  ))}
                </Box>
              )}
              sx={styles.select}
              variant="standard"
              MenuProps={{
                PaperProps: {
                  sx: styles.menuPaper,
                },
                MenuListProps: {
                  sx: styles.menuList,
                },
                autoFocus: false,
                onKeyDown: (event) => {
                  if (document.activeElement === searchInputRef.current) {
                    event.stopPropagation();
                  }
                },
              }}
            >
              {/* Wrap search and clear all in a container to keep them together */}
              <Box
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 1200,
                  bgcolor: 'white',
                }}
              >
                {menuOpen && isSearchEnabled && (
                  <Box
                    sx={styles.searchContainer}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        placeholder="Search..."
                        variant="standard"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        inputRef={searchInputRef}
                        onKeyDown={(event) => event.stopPropagation()}
                        sx={styles.searchTextField}
                      />
                    </Box>
                  </Box>
                )}

                {selectedItems.length > 0 && (
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      setTimeout(() => {
                        field.onChange(returnObjects ? [] : []);
                      }, 0);
                    }}
                    sx={styles.clearAll}
                  >
                    Clear All
                  </MenuItem>
                )}
              </Box>

              {/* Options list */}
              <Box sx={{ pt: selectedItems.length > 0 ? '40px' : 0 }}>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        let newItems: IFormOptions[];

                        if (selectedValues.includes(option.value)) {
                          // Remove the item
                          newItems = selectedItems.filter(
                            (item) => item.value !== option.value
                          );
                        } else {
                          // Add the item
                          newItems = [...selectedItems, { ...option }];
                        }

                        // Return either the full objects or just the values based on returnObjects prop
                        field.onChange(
                          returnObjects
                            ? newItems
                            : newItems.map((item) => item.value)
                        );
                      }}
                    >
                      <Typography variant="body1" fontSize={'small'}>
                        {option.label}
                      </Typography>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    {isOptionLoading ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                        }}
                      >
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        <Typography variant="body2">Loading...</Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2">No results found</Typography>
                    )}
                  </MenuItem>
                )}
              </Box>
            </Select>
          </FormControl>
        );
      }}
    />
  );
};

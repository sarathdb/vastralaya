// CronScheduler.tsx
import {
  Box,
  CSSObject,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const styles: { [key: string]: React.CSSProperties | CSSObject } = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginTop: 2,
    maxWidth: "100%",
  },
  cronItemContainer: { flex: 1 },
};

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const cronItems = [
  { name: "minute", label: "Minute", range: 60 },
  { name: "hour", label: "Hour", range: 24 },
  { name: "day", label: "Day", range: 31 },
  { name: "month", label: "Month", range: 12 },
];

const generateOptions = (range: number) =>
  Array.from({ length: range }, (_, i) => i.toString());

export const CronScheduler = () => {
  const { control, watch } = useFormContext();

  const minute = watch("minute") || "0";
  const hour = watch("hour") || "0";
  const day = watch("day") || "0";
  const month = watch("month") || "0";
  const weekday = watch("weekday") || "0";

  return (
    <Box sx={styles.container}>
      <Stack direction="row" spacing={2}>
        {cronItems.map(({ name, label, range }) => (
          <FormControl
            key={name}
            variant="standard"
            sx={styles.cronItemContainer}
          >
            <InputLabel>{label}</InputLabel>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Select {...field} label={label}>
                  {generateOptions(range).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        ))}
      </Stack>
      <FormControl fullWidth variant="standard">
        <InputLabel>Weekday</InputLabel>
        <Controller
          name="weekday"
          control={control}
          render={({ field }) => (
            <Select {...field} label="Weekday">
              {weekdays.map((day, index) => (
                <MenuItem key={index} value={index.toString()}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <Stack>
        <Typography variant="body1" sx={{ fontSize: "small" }}>
          {`Cron Expression: ${minute} ${hour} ${day} ${month} ${weekday}`}
        </Typography>
      </Stack>
    </Box>
  );
};

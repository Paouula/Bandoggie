import React, { useRef, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";

const DatePickerComponent = ({ value, onChange, label = "Fecha", open, onClose }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
      <DatePicker
        value={value}
        onChange={(newDate) => {
          onChange(newDate);
          onClose();
        }}
        open={open}
        onClose={onClose}
        disablePast={false}
        PopperProps={{
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport",
              },
            },
          ],
          sx: {
            yIndex: 1300,
          },
        }}
        slotProps={{
          textField: {
            inputRef,
            sx: {
              position: "relative",
              width: 0,
              height: 0,
              padding: 0,
              margin: 0,
              border: 0,
              visibility: "hidden",
            },
          },
        }}
        label={label}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;

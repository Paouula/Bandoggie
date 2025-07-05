import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";

const DatePickerComponent = ({ value, onChange, label = "Fecha" }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newDate) => {
          onChange(newDate);
          setOpen(false);
        }}
        open={open}
        onClose={() => setOpen(false)}
        disablePast={false}
        slotProps={{
          textField: {
            sx: { display: "none" } // 🔒 Oculta el input
          }
        }}
      />
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="calendar-trigger"
      >
        📅 Seleccionar fecha
      </button>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;

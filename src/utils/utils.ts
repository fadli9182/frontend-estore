export const customStylesInputWithoutRounded = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#f2f2f2" : "var(--background)",
    border: state.isFocused
      ? "1px solid var(--primary)"
      : "1px solid var(--input)",
    boxShadow: state.isFocused ? "1px solid var(--primary)" : 0,
    "&:hover": {
      // border: "1px solid #1A4373"
    },
    borderRadius: "0.375rem",
    // borderRadius: "0.375rem",
    minWidth: "150px",
    height: "100%",
    maxHeight: "auto",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    whiteSpace: "nowrap",
    textAlign: "start",
    fontSize: "0.875rem",
    textTransform: "capitalize",
  }),
  menu: (provided) => ({
    ...provided,
    minWidth: "155px",
    borderRadius: "8px",
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    whiteSpace: "nowrap", // width option
    backgroundColor: state.isSelected ? "#1A4373" : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: state.isSelected ? "#1A4373" : "#f2f2f2",
      color: state.isSelected ? "white" : "black",
    },
    fontSize: "0.875rem",
    textTransform: "capitalize",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "grey" : "#1A4373", // Warna panah hijau
  }),
};

export const formatDate = (date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (date) {
    return new Date(date).toLocaleDateString("id-ID", options);
  } else {
    return null;
  }
};
export const formatDateString = (dateString) => {
  if (!dateString) {
    return ""; // If dateString is null or undefined, return an empty string
  }

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Jakarta", // Set the timezone to Indonesian timezone
  };

  return date
    .toLocaleDateString("id-ID", options)
    .replace(/(\d+)\/(\d+)\/(\d+),/, "$2/$1/$3"); // Remove the comma after the day
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("id-ID").format(number);
};

export const formatNumberWithTwoDecimals = (number) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export function deleteEmptyStringPayload(data) {
  const newData = { ...data };
  for (const key in newData) {
    if (newData[key] === "") {
      delete newData[key];
    }
  }
  return newData;
}

export function makeNullIntoEmptyStringPayload(data) {
  const newData = { ...data };
  for (const key in newData) {
    if (newData[key] === null) {
      newData[key] = "";
    }
  }
  return newData;
}

export const formatDateLocal = (dateString) => {
  if (!dateString) {
    return ""; // If dateString is null or undefined, return an empty string
  }

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Jakarta", // Set the timezone to Indonesian timezone
  };

  return date
    .toLocaleDateString("id-ID", options)
    .replace(/(\d+)\/(\d+)\/(\d+),/, "$3-$2-$1"); // Remove the comma after the day
};

const timeZone: Intl.DateTimeFormatOptions = {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

export const formatDatetoString = (date) => {
  const formattedDate = new Intl.DateTimeFormat("id-ID", timeZone).format(date);
  const [month, day, year] = formattedDate.split("/");
  const result = [year, month, day].join("-");
  return result;
};

export const formatDatePayload = (date) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", timeZone).format(date);
  const [month, day, year] = formattedDate.split("/");
  const result = [year, month, day].join("-");
  return result;
};

export const getNowHour = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const result = `${currentHour}:${currentMinute}`;

  return result;
};

export const findObjectSelected = (opts, selected) => {
  const filter = opts?.find((obj) => obj?.value === selected);
  if (filter) {
    return { value: filter.value, label: filter.label };
  }
  return null;
};

export const removeTrailingSpaces = (val) => {
  if (typeof val === "string" || val instanceof String) {
    return val.trim();
  }
  return "";
};

export const isEmptyV2 = (data) => {
  if (data === null) {
    return true;
  }

  if (data === undefined) {
    return true;
  }

  if (removeTrailingSpaces(data) === "" && typeof data === "string") {
    return true;
  }

  if (data?.length <= 0 && Array.isArray(data)) {
    return true;
  }

  if (Object.keys(data)?.length === 0 && data?.constructor === Object) {
    return true;
  }

  return false;
};

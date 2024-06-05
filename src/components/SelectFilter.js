import React from "react";
import Select from "react-select";
const SelectFilter = ({
  value,
  onChange,
  options,
  customisations = {},
  placeholder = "Select an advertiser...",
}) => {
  const styles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: customisations.style?.border || 0,
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      "&:hover": {
        borderColor: "gray",
      },
    }),
  };

  return (
    <div className="rounded-sm">
      <Select
        value={value}
        onChange={(selectedAdvertiser) => onChange(selectedAdvertiser)}
        options={options}
        placeholder={placeholder}
        styles={styles}
      />
    </div>
  );
};

export default SelectFilter;

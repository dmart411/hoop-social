import { useState } from "react";

const Selector = ({ options, onChange, label }) => {
  const [value, setValue] = useState(options[0].value);
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <>
      <div className="label">{label}</div>
      <select
        className="ui dropdown"
        onChange={handleChange}
        value={value}
        style={{ width: "100%" }}
      >
        {options.map((option, index) => {
          return (
            <option value={option.value} key={index}>
              {option.text}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Selector;

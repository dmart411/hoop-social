import { useState } from "react";

const Selector = ({ placeholder, options, onChange }) => {
  const [value, setValue] = useState(options[0].value);
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <form>
      <select className="ui dropdown" onChange={handleChange} value={value}>
        {options.map(( option, index )=>{
          return <option value={option.value} key={index}>{option.text}</option>
        })}
      </select>
      <p></p>
    </form>
  );
};

export default Selector;

import { useState } from "react";

const Checkbox = ({ label, onChange }) => {
  const [checked, setChekced] = useState(false);

  const onClick = () => {
    onChange(!checked);
    setChekced(!checked);
  };

  return (
    <div className="ui checkbox">
      <input
        type="checkbox"
        id="scales"
        name="scales"
        checked={checked}
        onChange={onClick}
      />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;

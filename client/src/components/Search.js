import { useState } from "react";
import { useHistory } from "react-router";

const Search = ({ onSearch }) => {
  let history = useHistory();
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(text);
    setText("");
    history.push("/results");
  };

  return (
    <form className="ui icon input" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <i className="search link icon" />
    </form>
  );
};

export default Search;

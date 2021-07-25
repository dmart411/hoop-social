import { useState } from "react";
import { useHistory } from "react-router";

const Search = ({ onSearch, redirect }) => {
  const [text, setText] = useState("");
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(text);
    setText("");
    history.push(redirect);
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

import { useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { Search } from "semantic-ui-react";
import _ from "lodash";
import { searchPlayers } from "../actions";

const SearchAutoComplete = ({ search, searchPlayers }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const history = useHistory();

  const handleResultSelect = (e, { result }) => {
    setValue(result.title);
    history.push(`/player-profile/${result.id}`);
  };

  const handleSearchChange = (e, { value }) => {
    setLoading(true);
    searchPlayers(value);
    setValue(value);

    setTimeout(() => {
      const source = [];
      search.forEach((player) => {
        source.push({
          title: `${player.first_name} ${player.last_name}`,
          description: player.team.full_name,
          id: player.id,
        });
      });
      setLoading(false);
      setResults(source);
    }, 300);
  };

  return (
    <Search
      fluid
      loading={loading}
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 500, {
        leading: true,
      })}
      results={results}
      value={value}
    />
  );
};

const mapStateToProps = ({ search }) => {
  return {
    search,
  };
};

export default connect(mapStateToProps, { searchPlayers })(SearchAutoComplete);

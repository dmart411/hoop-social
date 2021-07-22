import { useEffect } from "react";
import { connect } from "react-redux";
import { searchPlayers, clearSearch } from "../actions";

const Results = ({ results, searchPlayers, clearSearch }) => {
  useEffect(() => {
    if (!results) {
      searchPlayers();
    }
    return () => {
      clearSearch();
    };
  }, []);

  return (
    <div
      className="ui container"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <h3>Results</h3>
      <div className="ui middle aligned celled list" style={{ width: "25%" }}>
        {results
          ? results.map((result) => {
              return (
                <div className="item" key={result.id}>
                  <div className="right floated content">
                    {result.position[0]}
                  </div>
                  <div className="content">
                    {result.first_name} {result.last_name}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    results: state.search.results,
  };
};

export default connect(mapStateToProps, { searchPlayers, clearSearch })(
  Results
);

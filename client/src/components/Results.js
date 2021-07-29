import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPlayers } from "../actions";

const Results = ({ players, fetchPlayers }) => {
  useEffect(() => {
    if (!players) {
      fetchPlayers();
    }
  });

  return (
    <div className="ui container">
      <h3>Results</h3>
      <div className="ui middle aligned celled list">
        {players
          ? players.map((player) => {
              return (
                <Link
                  to={`/player-profile/${player.id}`}
                  className="item"
                  key={player.id}
                >
                  <div className="right floated content">
                    {player.position[0]}
                  </div>
                  <div className="content">
                    {player.first_name} {player.last_name}
                  </div>
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.players,
  };
};

export default connect(mapStateToProps, { fetchPlayers })(Results);

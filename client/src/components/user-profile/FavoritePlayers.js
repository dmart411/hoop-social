/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPlayer } from "../../actions";
import PlayerPreview from "./PlayerPreview";

const FavoritePlayers = ({ userId, favoritePlayers, players, fetchPlayer }) => {
  useEffect(() => {
    for (let playerId of favoritePlayers) {
      if (players.indexOf(playerId) === -1) {
        fetchPlayer(playerId);
      }
    }
  }, []);

  return (
    <div className="ui container">
      <div className="ui large header" style={{ marginRight: "20px" }}>
        Favorite Players
      </div>
      {favoritePlayers.length > 0 ? (
        <div className="ui three stackable cards">
          {favoritePlayers.map((player) => {
            return <PlayerPreview playerId={player} key={player} />;
          })}
        </div>
      ) : (
        <div>No favorite players yet.</div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    favoritePlayers: state.auth.favoritePlayers,
    players: state.players,
  };
};

export default connect(mapStateToProps, { fetchPlayer })(FavoritePlayers);

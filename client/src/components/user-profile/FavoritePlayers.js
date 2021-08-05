/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPlayer, fetchUser } from "../../actions";
import PlayerPreview from "./PlayerPreview";

const FavoritePlayers = ({ userId, user, players, fetchPlayer, fetchUser }) => {
  useEffect(() => {
    if (!user) {
      fetchUser(userId);
    } else {
      for (let playerId of user.favoritePlayers) {
        if (players.indexOf(playerId) === -1) {
          fetchPlayer(playerId);
        }
      }
    }
  }, [user]);

  return (
    <div className="ui container">
      {user && user.favoritePlayers.length > 0 ? (
        <div className="ui three stackable cards">
          {user.favoritePlayers.map((player) => {
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
    user: state.users
      .filter((user) => {
        return user.googleId === ownProps.userId;
      })
      .pop(),
    players: state.players,
  };
};

export default connect(mapStateToProps, { fetchPlayer, fetchUser })(
  FavoritePlayers
);

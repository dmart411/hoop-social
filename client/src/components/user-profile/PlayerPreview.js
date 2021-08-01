/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserFavoritePlayers } from "../../actions";

const PlayerPreview = ({
  playerId,
  player,
  favoritePlayers,
  updateUserFavoritePlayers,
}) => {
  const onRemoveClick = () => {
    const updatedFavorites = favoritePlayers.filter((player) => {
      return player !== playerId.toString();
    });
    updateUserFavoritePlayers(updatedFavorites);
  };

  const displayCard = () => {
    return (
      <div className="ui card">
        <div className="image">
          <img
            src={`https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`}
            alt={`${player.first_name} ${player.last_name}`}
          />
        </div>
        <div className="content">
          <Link
            to={`/player-profile/${player.id}`}
            className="header"
          >{`${player.first_name} ${player.last_name}`}</Link>
          <div className="description">
            <div>{`Team: ${player.team.full_name}`}</div>
            <div>{player.position ? `Position: ${player.position}` : null}</div>
            <div>
              {player.height_feet
                ? `Height: ${player.height_feet}' ${player.height_inches}`
                : null}
            </div>
            <div>
              {player.weight_pounds
                ? `Weight: ${player.weight_pounds} lbs`
                : null}
            </div>
          </div>
        </div>
        <div className="ui bottom attached button" onClick={onRemoveClick}>
          <i className="minus icon"></i>
          Remove From Favorites
        </div>
      </div>
    );
  };

  return player ? displayCard() : <div>Loading...</div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    player: state.players
      .filter((player) => {
        return player.id.toString() === ownProps.playerId;
      })
      .pop(),
    favoritePlayers: state.auth.favoritePlayers,
  };
};

export default connect(mapStateToProps, {
  updateUserFavoritePlayers,
})(PlayerPreview);

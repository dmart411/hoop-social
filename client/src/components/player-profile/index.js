import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPlayer } from "../../actions";
import SeasonAverages from "./SeasonAverages";
import GameAverages from "./GameStats";
import FavoritePlayerButton from "./FavoritePlayerButton";

const PlayerProfile = ({ match, fetchPlayer, player, auth }) => {
  useEffect(() => {
    const id = match.params.id;
    fetchPlayer(id);
  }, [fetchPlayer, match]);

  const renderProfile = () => {
    return (
      <div className="ui container" style={{ marginBottom: "50px" }}>
        <img
          className="ui small bordered left floated image"
          src={`https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`}
          alt={`${player.first_name} ${player.last_name}`}
        />
        <div>{`Team: ${player.team.full_name}`}</div>
        <div>{player.position ? `Position: ${player.position}` : null}</div>
        <div>
          {player.height_feet
            ? `Height: ${player.height_feet}' ${player.height_inches}`
            : null}
        </div>
        <div>
          {player.weight_pounds ? `Weight: ${player.weight_pounds} lbs` : null}
        </div>
      </div>
    );
  };

  return (
    <div className="ui container">
      {auth ? <FavoritePlayerButton id={match.params.id} /> : null}
      <div className="ui huge header">
        {player ? `${player.first_name} ${player.last_name}` : null}
      </div>
      <div>{player ? renderProfile() : null}</div>
      <div className="ui divider"></div>
      <SeasonAverages id={match.params.id} />
      <div className="ui divider"></div>
      <GameAverages id={match.params.id} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    player: state.players
      .filter((player) => {
        return player.id.toString() === ownProps.match.params.id;
      })
      .pop(),
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  fetchPlayer,
})(PlayerProfile);

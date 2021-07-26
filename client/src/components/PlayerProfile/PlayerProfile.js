import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPlayer, fetchSeasonAverages, fetchStats } from "../../actions";
import SeasonAverages from "./SeasonAverages";

const PlayerProfile = ({
  match,
  fetchPlayer,
  fetchStats,
  fetchSeasonAverages,
  player,
  stats,
}) => {
  useEffect(() => {
    const id = match.params.id;
    if (!player) {
      fetchPlayer(id);
    }
    fetchStats(id);
    fetchSeasonAverages(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProfile = () => {
    return (
      <div className="ui container">
        <div>{`Team: ${player.team.full_name}`}</div>
        <div>{`Height: ${player.height_feet}' ${player.height_inches}`}</div>
        <div>{`Weight: ${player.weight_pounds} lbs`}</div>
      </div>
    );
  };

  return (
    <div className="ui container">
      <div className="ui huge header">
        {player ? `${player.first_name} ${player.last_name}` : null}
      </div>

      <div>{player ? renderProfile() : null}</div>
      <div className="ui divider"></div>
      <div>
        <SeasonAverages season={2020} id={match.params.id} />
      </div>
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
    stats: state.stats,
  };
};

export default connect(mapStateToProps, {
  fetchPlayer,
  fetchSeasonAverages,
  fetchStats,
})(PlayerProfile);

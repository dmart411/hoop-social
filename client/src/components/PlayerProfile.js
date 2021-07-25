import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPlayer, fetchSeasonAverages, fetchStats } from "../actions";

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
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">
              <h3>
                {player.first_name} {player.last_name}
              </h3>
            </div>
            <div className="meta">{player.team.full_name}</div>
            <div className="description">
              <div>{`Height: ${player.height_feet}' ${player.height_inches}`}</div>
              <div>{`Weight: ${player.weight_pounds} lbs`}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ui stackable four column grid">
        <div className="row">
          <div className="column"></div>
          {player ? renderProfile() : null}
          <div className="column">Hello</div>
          <div className="column">Hello</div>
          <div className="column">Hello</div>
        </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    player: state.players.filter((player) => {
      return player.id.toString() === ownProps.match.params.id;
    })[0],
    stats: state.stats,
  };
};

export default connect(mapStateToProps, {
  fetchPlayer,
  fetchSeasonAverages,
  fetchStats,
})(PlayerProfile);

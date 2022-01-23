import { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchStats, fetchTeams } from "../../actions";
import Selector from "../Selector";
import Checkbox from "../Checkbox";

const GameStats = ({ id, fetchStats, fetchTeams, stats, teams, meta }) => {
  const date = new Date();
  const baseSeason =
    date.getMonth() < 8 ? date.getFullYear() - 1 : date.getFullYear();

  const [season, setSeason] = useState(baseSeason);
  const [postseason, setPostseason] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchStats(id, season, postseason, page);
    fetchTeams();
  }, [id, season, postseason, page, fetchStats, fetchTeams]);

  const options = [];
  for (var i = 0; i < 40; i++) {
    options.push({
      text: baseSeason - i + "-" + (baseSeason - i + 1),
      value: baseSeason - i,
    });
  }

  const onSeasonChange = (season) => {
    fetchStats(id, season, postseason, 0);
    setSeason(season);
    setPage(0);
  };

  const onPostseasonChange = (checked) => {
    fetchStats(id, season, checked, 0);
    setPostseason(!postseason);
    setPage(0);
  };

  const renderTable = () => {
    return (
      <table className="ui small compact celled inverted ten column table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Date</th>
            <th>Points</th>
            <th>Rebounds</th>
            <th>Assits</th>
            <th>Steals</th>
            <th>Blocks</th>
            <th>FG%</th>
            <th>3P%</th>
            <th>FT%</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => {
            return (
              <tr key={stat.id}>
                <td>{`${teams[stat.game.home_team_id].abbreviation} vs ${
                  teams[stat.game.visitor_team_id].abbreviation
                }`}</td>
                <td>{stat.game.date.substring(0, 10)}</td>
                <td>{stat.pts || 0}</td>
                <td>{stat.reb || 0}</td>
                <td>{stat.ast || 0}</td>
                <td>{stat.stl || 0}</td>
                <td>{stat.blk || 0}</td>
                <td>{stat.fg_pct || 0}</td>
                <td>{stat.fg3_pct || 0}</td>
                <td>{stat.ft_pct || 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderPaginationMenu = () => {
    let choices = [];
    let page = 1;
    while (choices.length < meta.total_pages) {
      choices.push(page++);
    }

    return (
      <>
        <div className="ui right floated pagination menu">
          {choices.map((choice) => {
            return (
              <div
                key={choice}
                className={`${
                  meta.current_page === choice ? "active" : null
                } item`}
                onClick={() => {
                  if (meta.current_page !== choice) {
                    fetchStats(id, season, postseason, choice);
                  }
                }}
              >
                {choice}
              </div>
            );
          })}
        </div>
        <div className="ui left floated orange label">
          {`Total games: ${meta.total_count}`}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="ui large header" style={{ marginRight: "20px" }}>
        Game Stats
      </div>
      <div className="ui equal width form">
        <div className="two fields">
          <div className="field">
            <Selector
              label="Season"
              options={options}
              onChange={onSeasonChange}
            />
          </div>
          <div className="field">
            <Checkbox label="Postseason" onChange={onPostseasonChange} />
          </div>
        </div>
      </div>
      {stats.length > 0 && !_.isEmpty(teams) ? (
        renderTable()
      ) : (
        <div className="ui orange floating message">
          No stats fit search criteria.
        </div>
      )}
      {meta && meta.total_pages !== 0 ? renderPaginationMenu() : null}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stats: state.stats.gameStats,
    meta: state.stats.meta,
    teams: state.teams,
  };
};

export default connect(mapStateToProps, { fetchStats, fetchTeams })(GameStats);

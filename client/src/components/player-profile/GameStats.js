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
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: false });

  useEffect(() => {
    setSortConfig({ key: "date", direction: false });
    fetchStats(id, season, postseason, page);
    fetchTeams();
  }, [id, season, postseason, page, fetchStats, fetchTeams, baseSeason]);

  const options = [];
  for (var i = 0; i < 40; i++) {
    options.push({
      text: baseSeason - i + "-" + (baseSeason - i + 1),
      value: baseSeason - i,
    });
  }

  const requestSort = (key) => {
    let direction = true;
    if (sortConfig.key === key && sortConfig.direction) {
      direction = false;
    }
    setSortConfig({ key, direction });
  };

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
    const renderIcon = (key) => {
      if (sortConfig.key === key) {
        return sortConfig.direction ? (
          <i className="caret up icon"></i>
        ) : (
          <i className="caret down icon"></i>
        );
      }
    };

    let sortedStats = [...stats];
    if (sortConfig.key !== null) {
      sortedStats.sort((a, b) => {
        let valueA =
          sortConfig.key === "date" ? a["game"].date : a[sortConfig.key];
        let valueB =
          sortConfig.key === "date" ? b["game"].date : b[sortConfig.key];
        if (valueA < valueB) {
          return sortConfig.direction ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction ? 1 : -1;
        }
        return 0;
      });
    }

    return (
      <table className="ui small compact celled inverted ten column table">
        <thead>
          <tr>
            <th>Game</th>
            <th onClick={() => requestSort("date")}>
              Date {renderIcon("date")}
            </th>
            <th onClick={() => requestSort("pts")}>
              Points {renderIcon("pts")}
            </th>
            <th onClick={() => requestSort("reb")}>
              Rebounds {renderIcon("reb")}
            </th>
            <th onClick={() => requestSort("ast")}>
              Assits {renderIcon("ast")}
            </th>
            <th onClick={() => requestSort("stl")}>
              Steals {renderIcon("stl")}
            </th>
            <th onClick={() => requestSort("blk")}>
              Blocks {renderIcon("blk")}
            </th>
            <th onClick={() => requestSort("fg_pct")}>
              FG% {renderIcon("fg_pct")}
            </th>
            <th onClick={() => requestSort("fg3_pct")}>
              3P% {renderIcon("fg3_pct")}
            </th>
            <th onClick={() => requestSort("ft_pct")}>
              FT% {renderIcon("ft_pct")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStats.map((stat) => {
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

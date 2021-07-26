import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSeasonAverages } from "../../actions";
import Selector from "../Selector";

const SeasonAverages = ({ id, fetchSeasonAverages, seasonAverages }) => {
  const [season, setSeason] = useState(2020);

  useEffect(() => {
    if (!seasonAverages) {
      fetchSeasonAverages(id, season);
    }
  });

  const options = [];
  const baseSeason = 2020;
  for (var i = 0; i < 40; i++) {
    options.push({
      text: baseSeason - i + "-" + (baseSeason - i + 1),
      value: baseSeason - i,
    });
  }

  const onSeasonChange = (value) => {
    fetchSeasonAverages(id, value);
    setSeason(value);
  };

  const renderStats = () => {
    const stats =
      seasonAverages
        .filter((stat) => {
          return stat.season === parseInt(season);
        })
        .pop() || null;
    return stats ? (
      <>
        <div className="ui statistics" style={{ marginBottom: "10px" }}>
          <div className="ui small horizontal statistic">
            <div className="value">{`${stats.season}-${stats.season + 1}`}</div>
            <div className="label">Season</div>
          </div>
          <div className="ui small horizontal statistic">
            <div className="value">{stats.games_played}</div>
            <div className="label">Games Played</div>
          </div>
        </div>
        <div className="ui grid">
          <div className="doubling eight column row">
            <div className="column">
              <div className="ui small statistic">
                <div className="value">{stats.pts}</div>
                <div className="label">PPG</div>
              </div>
            </div>
            <div className="column">
              <div className="ui small statistic">
                <div className="value">{stats.reb}</div>
                <div className="label">RPG</div>
              </div>
            </div>
            <div className="column">
              <div className="ui small statistic">
                <div className="value">{stats.ast}</div>
                <div className="label">APG</div>
              </div>
            </div>
            <div className="column">
              <div className="ui small statistic">
                <div className="value">{stats.stl}</div>
                <div className="label">Steals</div>
              </div>
            </div>
            <div className="column">
              <div className="ui small statistic">
                <div className="value">{stats.blk}</div>
                <div className="label">Blocks</div>
              </div>
            </div>
            <div className="column">
              <div className="ui small statistic">
                <div className="value">{stats.fg_pct}</div>
                <div className="label">FG%</div>
              </div>
            </div>
            <div className="column">
              <div className="ui small statistic">
                <div className="value">{stats.fg3_pct}</div>
                <div className="label">3P%</div>
              </div>
            </div>
            <div className="column">
              <div className="ui small statistic">
                <div className="value">{stats.ft_pct}</div>
                <div className="label">FT%</div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div>No stats for selected season</div>
    );
  };

  return seasonAverages ? (
    <div className="ui container">
      <div className="ui container grid">
        <div className="row">
          <div className="ui large header" style={{ marginRight: "20px" }}>
            Season Averages
          </div>
          <Selector
            placeholder="Season"
            options={options}
            onChange={onSeasonChange}
          />
        </div>
      </div>
      {renderStats()}
    </div>
  ) : (
    <div>Loading..</div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    seasonAverages: state.stats.seasonAverages.filter((stat) => {
      return stat.player_id.toString() === ownProps.id;
    }),
  };
};

export default connect(mapStateToProps, { fetchSeasonAverages })(
  SeasonAverages
);

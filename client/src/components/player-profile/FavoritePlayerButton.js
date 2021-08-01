/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateUserFavoritePlayers } from "../../actions";

const FavoritePlayerButton = ({ id, updateUserFavoritePlayers, auth }) => {
  const [favorite, setFavorite] = useState(null);

  useEffect(() => {
    if (auth.favoritePlayers.indexOf(id) === -1) {
      setFavorite(false);
    } else {
      setFavorite(true);
    }
  }, []);

  const onClick = () => {
    if (favorite) {
      const updatedFavorites = auth.favoritePlayers.filter((player) => {
        return player !== id.toString();
      });
      updateUserFavoritePlayers(updatedFavorites);
      setFavorite(false);
    } else {
      updateUserFavoritePlayers([...auth.favoritePlayers, id.toString()]);
      setFavorite(true);
    }
  };

  return auth ? (
    <div className="ui orange right floated button" onClick={onClick}>
      {favorite ? "Remove from favorites" : "Add to favorites"}
    </div>
  ) : (
    <div className="ui disabled button">
      You must be logged in to favorite a player
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { updateUserFavoritePlayers })(
  FavoritePlayerButton
);

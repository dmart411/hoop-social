import { FETCH_TEAMS } from "../actions/types";

const teamReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_TEAMS:
            const newState = action.payload.reduce(function(teams, team) {
                teams[team.id] = team;
                return teams;
            }, {})
            return newState;
        default: 
            return state;
    }
};

export default teamReducer;
import { combineReducers } from "redux";
import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER } from "../actions/actions";

//reducer for filter
function visibilityFilter(state = "", action) {
    switch (action.type) { //switch to initial action type if unrelated action occur within function
        case SET_FILTER:
            console.log('SET_FILTER IS TRIGGERED');;
            return action.value;
        default:
            return state; //return initial state
    }
}

//reducer for movies
function movies(state = [], action) {
    switch (action.type) { //if no movies action occurs, return initial state of empty array, else switch to case
        case SET_MOVIES:
            console.log('SET_MOVIES IS TRIGGERED');
            return action.value; //return the SET_MOVIE action type based on its object parameter, value.
        default:
            return state; //return to initial state
    }
}

//reducer for user
function user(state = [], action) {
    switch (action.type) {
        case SET_USER:
            console.log('SET_USER is triggered');
            return action.value
        default:
            return state;
    }
}

//reducer for updateUser
function updateUser(state = [], action) {
    switch (action.type) {
        case UPDATE_USER:
            console.log('UPDATED_USER is triggered');
            return action.value
        default:
            return state;
    }
}

//combined reducer
const movieApp = combineReducers({
    visibilityFilter,
    movies,
    user,
    updateUser

});

export default movieApp;
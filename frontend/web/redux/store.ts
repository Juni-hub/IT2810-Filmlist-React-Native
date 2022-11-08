import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from 'redux'
import thunk from "redux-thunk";

export interface Store {
    title: string;
    genre: string;
    year: string;
    sorting: string;
}

/**
 * Function for redux implementation
 * @param state
 */
function storeReducer(state: Store = {
    title: "",
    genre: "",
    year: "0",
    sorting: "1",
}, action: any ) {
    switch (action.type) {
        case "SET_TITLE":
            return {
                ...state,
                title: action.payload
            };
        case "SET_GENRE":
            return {
                ...state,
                genre: action.payload
            };
        case "SET_YEAR":
            return {
                ...state,
                year: action.payload
            };
        case "SET_SORTING":
            return {
                ...state,
                sorting: action.payload
            };
        default:
            return state;
    }
}

//Apply thunk middleware to store
const store = createStore(storeReducer, applyMiddleware(thunk));

export default store;
export const SET_TITLE = "SET_TITLE";
export const SET_GENRE = "SET_GENRE";
export const SET_YEAR = "SET_YEAR";
export const SET_SORTING = "SET_SORTING";

/** 
* Action types for changing values in redux store
*/
export type ActionTypes = 
    | { type: typeof SET_TITLE, payload: string }
    | { type: typeof SET_GENRE, payload: string }
    | { type: typeof SET_YEAR, payload: string }
    | { type: typeof SET_SORTING, payload: string };

export const setTitle = (title: string): ActionTypes => ( {
    type: SET_TITLE,
    payload: title, 
});

export const setGenre = (genre: string): ActionTypes => ( {
    type: SET_GENRE,
    payload: genre,
});

export const setYear = (year: string): ActionTypes => ( {
    type: SET_YEAR,
    payload: year,
});

export const setSorting = (sorting: string): ActionTypes => ( {
    type: SET_SORTING,
    payload: sorting,
});
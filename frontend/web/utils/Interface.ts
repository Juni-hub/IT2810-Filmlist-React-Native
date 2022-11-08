/** 
* Interface for a Film item
*/
export interface Film {
    _id: string,
    title: string,
    year: string,
    cast: string[],
    genres: string[]
}

/** 
* Interface for the values used to create a film
*/
export interface CreateFilm {
    title: string;
    year: string;
    cast: string;
    genres: string;
}

/** 
* Interface for values to be sent when creating a AddFilm component
*/
export interface CreateFormProps {
    open: boolean;
    onCreate: (values: CreateFilm) => void;
    onCancel: () => void;
}

/** 
* Interface for the values used to show a film modal
*/
export interface CreateShowFilmProps {
    film: Film;
    open: boolean;
    onCancel: () => void;
}

/** 
* Interface for the values used to show the YearPicker
*/
export interface CreateShowYearProps {
    open: boolean;
    onClose: () => void;
}

/** 
* Interface for the values used to create a FilmCard
*/
export interface CreateFilmCard {
    film: Film,
    handleClick: (film: Film) => void;
}
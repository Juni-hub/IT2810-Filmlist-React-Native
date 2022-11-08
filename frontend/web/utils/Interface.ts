export interface Film {
    _id: string,
    title: string,
    year: string,
    cast: string[],
    genres: string[]
}


export interface Values {
    title: string;
    year: string;
    cast: string;
    genres: string;
}

export interface CreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

export interface CreateShowFilmProps {
    film: Film;
    open: boolean;
    onCancel: () => void;
}

export interface CreateShowYearProps {
    open: boolean;
    onClose: () => void;
}

export interface CreateFilmCard {
    film: Film,
    handleClick: (film: Film) => void;
}
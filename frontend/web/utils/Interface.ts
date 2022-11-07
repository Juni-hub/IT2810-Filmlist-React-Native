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

export interface CreateModalProps {
    film: Film;
    open: boolean;
    onCancel: () => void;
}

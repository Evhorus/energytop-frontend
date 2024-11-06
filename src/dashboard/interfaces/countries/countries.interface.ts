export interface BaseCountry {
    id: number;
    countryName: string;
    countryCode: string;
    population: number | null;
}

export interface CountryFormInputs
    extends Required<
        Pick<BaseCountry, "countryName" | "countryCode" | "population">
    > {}

//Pagination Response
export interface CountryResponse {
    content: BaseCountry[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    pageable: Pageable;
    sort: Sort;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

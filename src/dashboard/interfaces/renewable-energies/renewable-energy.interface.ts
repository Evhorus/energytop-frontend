export interface BaseRenewableEnergy {
    id: number;
    consumption: number;
    production: number;
    year: number;
    energyType: EnergyType;
    country: Country;
}

export interface RenewableEnergyFormInputs
    extends Required<
        Pick<BaseRenewableEnergy, "year">
    > {
    production: number | null;
    consumption: number | null;
    energyType: number | null;
    country: number | null;
}

export interface RenewableEnergyResponse {
    content: BaseRenewableEnergy[];
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

export interface Country {
    id: number;
    countryName: string;
    countryCode: string;
    population: number;
}

export interface EnergyType {
    id: number;
    energyName: string;
    source: string;
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

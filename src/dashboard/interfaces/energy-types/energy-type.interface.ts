export interface BaseEnergyType {
    id: number;
    energyName: string;
    source: string;
}

export interface EnergyTypeFormInputs
    extends Required<Pick<BaseEnergyType, "energyName" | "source">> {}


//Pagination Response
export interface EnergyTypeResponse {
    content: BaseEnergyType[];
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

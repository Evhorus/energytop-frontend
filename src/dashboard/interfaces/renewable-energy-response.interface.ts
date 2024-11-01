export interface RenewableEnergyResponse {
  content:          Content[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  first:            boolean;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  empty:            boolean;
}

export interface Content {
  id:          number;
  consumption: number;
  production:  number;
  year:        number;
  energyType:  EnergyType;
  country:     Country;
}

export interface Country {
  id:          number;
  countryName: string;
  population:  number;
  countryCode: string;
}

export interface EnergyType {
  id:         number;
  energyName: string;
  source:     string;
}

export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}

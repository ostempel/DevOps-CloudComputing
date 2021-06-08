export interface Car {
  id: number;
  brand: string;
  model: string;
  manufactureYear: Date;
  ps: number;
  topSpeed: number;
}

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  country: string;
}

export interface Racetrack {
  id: number;
  name: string;
  country: string;
  length: number;
}

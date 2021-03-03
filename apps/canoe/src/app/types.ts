export interface Fare {
  id: number;
  origin: string;
  dest: string;
  depart: string; // ISO date string
  arrive: string;
  price: number;
  mode: string;
}


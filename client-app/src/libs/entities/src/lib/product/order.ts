import { Product } from "./product";

export interface Order {
    id: string;
    products: Product[];
    name: string;
    address: string;
    city: string;
    zipCode: string;

  }
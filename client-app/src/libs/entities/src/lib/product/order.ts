import { Product } from "./product";

export interface Order {
    products: Product[];
    name: string;
    address: string;
    city: string;
    zipCode: string;
  }
import { Product } from "../entities/src/lib/product/product";

export interface OrderData {
    products: Product[];
    name: string;
    address: string;
    city: string;
    zipCode: string;
  }
export enum Role {
    USER, ADMIN
  }
  
  export interface User {
    id: string;
    email: string;
    role: Role;
    name: string;
    address: string;
    city: string;
    zipCode: string;
  }
export class UpdateUserData {
    email: string;
    name: string;
    address: string;
    city: string;
    zipCode: string;


    constructor(email: string, name: string, address: string, city: string, zipCode: string) {
        this.email = email;
        this.name = name;
        this.address = address;
        this.city = city;
        this.zipCode = zipCode;
    }
}
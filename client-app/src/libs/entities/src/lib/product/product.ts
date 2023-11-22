export class Product {
  id: string;
  productId: string;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  quantity: number;
  availability: number;
  isSold: boolean;

  constructor(id: string, productId: string, title: string, description: string,
     price: number, quantity: number, isSold: boolean, imageSrc: string, availability: number) {
    this.id = id;
    this.productId = productId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.isSold = isSold;
    this.imageSrc = imageSrc;
    this.availability = availability;
  }
}
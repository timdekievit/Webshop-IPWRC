export class Product {
  id: string;
  productId: string;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  quantity: number;
  availability: number;

  constructor(id: string, productId: string, title: string, description: string,
     price: number, quantity: number, imageSrc: string, availability: number) {
    this.id = id;
    this.productId = productId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.imageSrc = imageSrc;
    this.availability = availability;
  }
}
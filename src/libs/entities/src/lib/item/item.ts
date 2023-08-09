export class Item {
  id: string;
  title: string;
  price: number;
  imageSrc: string;
  quantity: number;
  completed: boolean;

    constructor(id: string, title: string, price: number, quantity: number, completed: boolean, imageSrc: string) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.quantity = quantity;
      this.completed = completed;
      this.imageSrc = imageSrc;
    }
}

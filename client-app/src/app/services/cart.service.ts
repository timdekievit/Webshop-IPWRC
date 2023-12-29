import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCartService } from 'src/libs/api/src/lib/shoppingCart/shoppingCart.service';
import { Product } from 'src/libs/entities/src/lib/product/product';

@Injectable({
    providedIn: 'root',
})
export class CartService {

    // TODO a user that is not loggedin should be able to add products to the cart

    private isCartOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private cartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

    private totalPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    totalCartPrice: number = 0;

    constructor(private shoppingCartService: ShoppingCartService) { }

    public toggleCart() {
        this.isCartOpenSubject.next(!this.isCartOpenSubject.getValue());
        console.log(this.isCartOpenSubject.getValue());
    }

    public setCartClosed() {
        this.isCartOpenSubject.next(false);
    }

    public get isCartOpen() {
        return this.isCartOpenSubject.asObservable();
    }

    public getcart() {
        this.shoppingCartService.get().subscribe(
            (response) => {
                this.cartSubject.next(response);
                this.calculateTotalPrice();
            },
            (error) => {
                console.log(error);
            }
        );
        return this.cartSubject.asObservable();
    }

    public addProductToCart(product: Product) {
        const currentCart = this.cartSubject.getValue();

        if (!currentCart.some(p => p.id === product.id)) {
            this.shoppingCartService.add(product).subscribe(
                (response) => {
                    this.cartSubject.next([...this.cartSubject.getValue(), product]);
                    this.calculateTotalPrice();
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    public removeProductFromCart(product: Product) {
        this.shoppingCartService.del(product).subscribe(
            (response) => {
                this.cartSubject.next(this.cartSubject.getValue().filter((p) => p.id !== product.id));
                this.calculateTotalPrice();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    public setCart(cart: Observable<Product[]>) {
        cart.subscribe((products) => {
            this.cartSubject.next(products);
        });
        this.calculateTotalPrice();
    }

    calculateTotalPrice() {
        let total = 0;
        this.cartSubject.getValue().forEach((product) => {
            total += product.price * product.quantity;
        });
        this.totalPriceSubject.next(total);
    }

    public getCartTotalPrice() {
        return this.totalPriceSubject.asObservable();
    }

    public updateQuantity(product: Product, quantity: number) {
        this.shoppingCartService.updateQuantity(product, quantity).subscribe(
            (response) => {
                this.cartSubject.next(this.cartSubject.getValue().map((p) => {
                    if (p.id === product.id) {
                        p.quantity = quantity;
                    }
                    return p;
                }));
                this.calculateTotalPrice();

            },
            (error) => {
                console.log(error);
            }
        );
    }

}



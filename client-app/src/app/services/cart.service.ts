import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCartService } from 'src/libs/api/src/lib/shoppingCart/shoppingCart.service';
import { Product } from 'src/libs/entities/src/lib/product/product';
import { JwtService } from './jwt.service';

@Injectable({
    providedIn: 'root',
})
export class CartService {

    private isCartOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private cartSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

    private totalPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    totalCartPrice: number = 0;

    constructor(private shoppingCartService: ShoppingCartService, private jwtService: JwtService) { }

    public toggleCart() {
        this.isCartOpenSubject.next(!this.isCartOpenSubject.getValue());
    }

    public setCartClosed() {
        this.isCartOpenSubject.next(false);
    }

    public get isCartOpen() {
        return this.isCartOpenSubject.asObservable();
    }

    public getcart() {
        if (this.jwtService.isLoggedIn()) {
            this.shoppingCartService.get().subscribe(
                (response) => {
                    this.cartSubject.next(response);
                    this.calculateTotalPrice();
                },
                (error) => {
                }
            );
            return this.cartSubject.asObservable();
        } else {
            return this.cartSubject.asObservable();
        }

    }

    public addProductToCart(product: Product) {
        const currentCart = this.cartSubject.getValue();

        if (!currentCart.some(p => p.id === product.id)) {
            if (this.jwtService.isLoggedIn()) {
                this.shoppingCartService.add(product).subscribe(
                    (response) => {
                        this.cartSubject.next([...currentCart, product]);
                        this.calculateTotalPrice();
                    },
                    (error) => {
                    }
                );
            } else {
                this.cartSubject.next([...currentCart, product]);
                this.calculateTotalPrice();
            }
        }
    }

    public removeProductFromCart(product: Product) {
        if (this.jwtService.isLoggedIn()) {
            this.shoppingCartService.del(product).subscribe(
                (response) => {
                    this.cartSubject.next(this.cartSubject.getValue().filter((p) => p.id !== product.id));
                    this.calculateTotalPrice();
                },
                (error) => {
                }
            );
        } else {
            this.cartSubject.next(this.cartSubject.getValue().filter((p) => p.id !== product.id));
            this.calculateTotalPrice();
        }
        
    }

    public setCart(cart: Observable<Product[]>) {
        cart.subscribe((products) => {
            this.cartSubject.next(products);
        });
        this.calculateTotalPrice();
    }

    public emptyCart() {
        this.cartSubject.next([]);
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
        if (this.jwtService.isLoggedIn()) {
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
                }
            );
        } else {
            this.cartSubject.next(this.cartSubject.getValue().map((p) => {
                if (p.id === product.id) {
                    p.quantity = quantity;
                }
                return p;
            }));
            this.calculateTotalPrice();
        }

    }

}



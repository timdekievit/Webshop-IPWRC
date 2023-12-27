import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ManagementComponent } from './management/management.component';
import { AdminGuard } from './guards/admin.guard';
import { ManagementOrdersComponent } from './management/management-orders/management-orders.component';
import { ManagementProductsComponent } from './management/management-products/management-products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'item/:id', component: ItemPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'account', component: AccountComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'confirmation', component: ConfirmationComponent},
  { path: 'management', 
    component: ManagementComponent, 
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'orders', component: ManagementOrdersComponent },
      { path: 'products', component: ManagementProductsComponent },
    ]
  
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

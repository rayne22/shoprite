import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ProductsComponent } from "../components/products/products.component";
import { ProductDetailsComponent } from "../components/product-details/product-details.component";
import { AuthGuard } from "./guard/auth.guard";
import { SignInComponent } from "../components/sign-in/sign-in.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { ForgotPasswordComponent } from "../components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "../components/verify-email/verify-email.component";
import { AllItemsComponent } from "../components/all-items/all-items.component";
import { CartComponent } from "../components/cart/cart.component";
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CategoriesService } from "./services/categories.service";
import { CartService } from "./services/cart.service";
import { OrdersService } from "./services/orders.service";
import { AboutUsComponent } from "../about-us/about-us.component";
import { CreditCardDirectivesModule } from 'angular-cc-library';

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "home",
  //   pathMatch: "full",
  // },
  { path: "", component: HomeComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "products/:id", component: ProductsComponent },
  {
    path: "product-details/:id/:itemId",
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: "sign-in", component: SignInComponent },
  { path: "register-user", component: SignUpComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "verify-email-address", component: VerifyEmailComponent },
  { path: "view-item/:itemId", component: AllItemsComponent },
];

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    HeaderComponent,
    ProductDetailsComponent,
    CartComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    AllItemsComponent,
    HomeComponent,
    AboutUsComponent,
  ],
  imports: [
    NgbModule,
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CreditCardDirectivesModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [
    CategoriesService,
    CartService,
    OrdersService,
    // AuthService,
    // { provide: NZ_I18N, useValue: en_US },
  ],
})
export class HomeModule {}

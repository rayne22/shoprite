import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";
import { AuthGuard } from "./home/guard/auth.guard";
import { AllItemsComponent } from "./components/all-items/all-items.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  { path: "home", component: HomeComponent },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAnalyticsModule } from "@angular/fire/analytics";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule, BUCKET } from "@angular/fire/storage";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CategoriesService } from "./home/services/categories.service";
import { ProductsComponent } from "./components/products/products.component";
import { HeaderComponent } from "./components/header/header.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { CartComponent } from "./components/cart/cart.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { en_US } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { CartService } from "./home/services/cart.service";
import { OrdersService } from "./home/services/orders.service";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { AuthService } from "./home/services/auth.service";
import { AllItemsComponent } from "./components/all-items/all-items.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularRaveModule } from "angular-rave";

registerLocaleData(en);

const firebaseConfig = {
  apiKey: "AIzaSyDm5IkoRBkSDIg4PoU7VBrGBh5gAlnxmvQ",
  authDomain: "shoperite-d69fa.firebaseapp.com",
  databaseURL: "https://shoperite-d69fa.firebaseio.com",
  projectId: "shoperite-d69fa",
  storageBucket: "shoperite-d69fa.appspot.com",
  messagingSenderId: "509236349940",
  appId: "1:509236349940:web:807b0a303d9367809ec7a1",
  measurementId: "G-094QCC34Z3",
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CategoriesService,
    { provide: NZ_I18N, useValue: en_US },
    CartService,
    OrdersService,
    AuthService,
  ],
  bootstrap: [AppComponent, HomeComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule, BUCKET } from "@angular/fire/storage";
import "firebase/storage";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from './components/footer/footer.component';

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
  declarations: [AppComponent, HomeComponent, NavbarComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

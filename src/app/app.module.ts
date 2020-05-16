import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule, BUCKET } from "@angular/fire/storage";
import { environment } from "../environments/environment";
import "firebase/storage";

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
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

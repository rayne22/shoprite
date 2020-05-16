import { Component } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from "@angular/fire/firestore";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection("items").valueChanges();
  }
}
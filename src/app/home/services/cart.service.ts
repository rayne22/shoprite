import { Injectable } from "@angular/core";
import { CartModel } from "../models/cart.model";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { NzMessageService } from "ng-zorro-antd";
import { HttpClient } from "@angular/common/http";
import { AngularFireStorage } from "@angular/fire/storage";
import { filter, first, map, finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartCollection: AngularFirestoreCollection<CartModel>;
  cart: Observable<CartModel[]>;

  constructor(
    private firebase: AngularFirestore,
    private msg: NzMessageService,
    private http: HttpClient,
    private storage: AngularFireStorage
  ) {
    this.cartCollection = firebase.collection<CartModel>("carts");
    this.cart = this.cartCollection.valueChanges();
  }

  getOrders() {
    return this.cart;
  }

  addCart(cart: CartModel) {
    this.cart.pipe(first()).subscribe((carts) => {
      cart.cartNumber = this.generateCartNumber(carts.length);
      this.cartCollection
        .doc(cart.id)
        .set(cart)
        .then((res) => {
          this.msg.success("Added Successfully");
        })
        .catch((err) => {
          this.msg.warning("failed");
        });
    });
  }

  updateCart(cart: CartModel) {
    this.cartCollection
      .doc(cart.id)
      .update(cart)
      .then((res) => {
        // this.msg.success("Updated Successfully");
      })
      .catch((err) => {
        this.msg.warning("failed");
      });
  }

  updateCartQuantity(cart: CartModel) {
    this.cartCollection.doc(cart.id).update(cart);
  }

  deleteItem(cart: CartModel) {
    console.log("DELETE LOG>>>>>", cart);

    this.cartCollection
      .doc(cart.id)
      .delete()
      .then((res) => {
        this.msg.success("Removed Successfully");
      })
      .catch((err) => {
        this.msg.warning("failed");
      });
  }

  countGenerator(numb) {
    if (numb <= 9999) {
      numb = ("0000" + numb).slice(-5);
    }
    return numb;
  }

  // Generating Category Number
  generateCartNumber(totalCart: number) {
    const count = this.countGenerator(totalCart);
    const today = new Date();
    const dateString: string =
      today.getFullYear().toString().substr(-2) +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      +("0" + today.getDate()).slice(-2);

    return "CRT" + dateString + count;
  }
}

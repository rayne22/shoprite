import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { NzMessageService } from "ng-zorro-antd";
import { HttpClient } from "@angular/common/http";
import { AngularFireStorage } from "@angular/fire/storage";
import { filter, first, map, finalize } from "rxjs/operators";
import { OrderModel } from "../models/orders.model";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private ordersCollection: AngularFirestoreCollection<OrderModel>;
  orders: Observable<OrderModel[]>;

  constructor(
    private firebase: AngularFirestore,
    private msg: NzMessageService,
    private http: HttpClient,
    private storage: AngularFireStorage
  ) {
    this.ordersCollection = firebase.collection<OrderModel>("orders");
    this.orders = this.ordersCollection.valueChanges();
  }

  getOrders() {
    return this.orders;
  }

  addOrder(order: OrderModel) {
    this.orders.pipe(first()).subscribe((orders) => {
      order.orderNumber = this.generateOrderNumber(orders.length);
      this.ordersCollection
        .doc(order.id)
        .set(order)
        .then((res) => {
          this.msg.success("Added Successfully");
        })
        .catch((err) => {
          this.msg.warning("failed");
        });
    });
  }

  updateOrder(order: OrderModel) {
    this.ordersCollection
      .doc(order.id)
      .update(order)
      .then((res) => {
        this.msg.success("Updated Successfully");
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
  generateOrderNumber(totalorders: number) {
    const count = this.countGenerator(totalorders);
    const today = new Date();
    const dateString: string =
      today.getFullYear().toString().substr(-2) +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      +("0" + today.getDate()).slice(-2);

    return "ORD" + dateString + count;
  }
}

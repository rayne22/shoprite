import { Component, OnInit } from "@angular/core";
import { CartModel } from "src/app/home/models/cart.model";
import { CartService } from "src/app/home/services/cart.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  listOfData: CartModel[];
  listOfDisplayData: CartModel[];
  cart: CartModel;

  constructor(
    private cartService: CartService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.cartService.getOrders().subscribe((res) => {
      this.listOfData = res;
      this.listOfDisplayData = this.listOfData;
      console.log("Orders>>>>", this.listOfDisplayData);
    });
  }

  edit(item) {}
}

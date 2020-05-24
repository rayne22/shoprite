import { Component, OnInit } from "@angular/core";
import { CartModel } from "src/app/home/models/cart.model";
import { CartService } from "src/app/home/services/cart.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isVisible = false;
  searchString: number;

  listOfData: CartModel[];
  listOfDisplayData: CartModel[];
  cart: CartModel;
  quant: CartModel;

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

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log("Button ok clicked!");
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }

  log(value) {
    this.quant = this.listOfDisplayData.filter((x) => x.id === value)[0];
    // this.quant.quantity = res;

    console.log("QUANT>>>", this.quant.quantity);
  }
}

import { Component, OnInit } from "@angular/core";
import { CartModel } from "src/app/home/models/cart.model";
import { CartService } from "src/app/home/services/cart.service";
import { NzMessageService } from "ng-zorro-antd";
import { OrderModel } from "src/app/home/models/orders.model";
import { v4 } from "uuid";
import { OrdersService } from "src/app/home/services/orders.service";
import { AuthService } from "src/app/home/services/auth.service";
import { UsersService } from "src/app/home/services/users.service";
import { UserModel } from "src/app/home/models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  addressForm: FormGroup;
  isVisible = false;
  searchString: number;
  isAddressConfirmationVisible = false;

  listOfData: CartModel[];
  listOfDisplayData: CartModel[];
  cart: CartModel;
  total = 0;
  quant: CartModel;
  item: any;
  order: OrderModel;
  newQuantity: number;
  user: any;
  userData: any;
  indexW: any;
  ads = [
    "Today special Offers !",
    "Strictly from Shoprite",
    "Customer Satisfaction Guaranteed",
  ];

  selectedValue = null;
  selectedPayment = "";

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private msg: NzMessageService,
    public authService: AuthService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private fb: FormBuilder
  ) {
    this.addressForm = fb.group({
      clientName: ["", Validators.required],
      email: ["", Validators.required],
      clientPhone: ["", Validators.required],
      clientAddress: ["", Validators.required],
    });
    // this.indexW = setInterval(() => {
    //   this.ads.;
    // }, 5000);

    console.log(this.ads);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("USER>>>>>>", this.user);
    this.usersService.getUsers().subscribe((users) => {
      this.userData = users.filter((x) => x.email === this.user.email)[0];

      this.cartService.getOrders().subscribe((res) => {
        this.listOfData = res.filter((x) => x.clientId === this.userData.id);
        this.listOfDisplayData = this.listOfData;
        console.log("Orders>>>>", this.listOfDisplayData);
        // for (const s of this.listOfDisplayData) {
        //   this.total = this.total + s.amount;
        // }

        // for (const l of this.listOfDisplayData) {
        //   l.amount = l.amount * l.quantity;
        // }

        const sum: number = this.listOfDisplayData
          .map((a) => a.amount * a.quantity)
          .reduce((a, b) => {
            return a + b;
          });
        console.log("ewrwerewrwer r wrewrw>>>>>>", sum);
        this.total = sum;
      });
    });

    this.addressForm.get("clientName");
    this.addressForm.get("email");
    this.addressForm.get("clientPhone");
    this.addressForm.get("clientAddress");
  }

  edit(item) {
    this.cartService.deleteItem(item);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    for (const l of this.listOfDisplayData) {
      l.amount = l.amount * l.quantity;
    }

    const sum: number = this.listOfDisplayData
      .map((a) => a.amount)
      .reduce((a, b) => {
        return a + b;
      });

    this.total = sum;

    let quantitySum = 0;
    this.listOfData.forEach((a) => (quantitySum += Number(a.quantity)));

    this.newQuantity = quantitySum;
    console.log("this>>>>>", this.newQuantity);

    this.order = {
      id: v4(),
      orderNumber: "",
      quantity: quantitySum,
      amount: this.total,
      deliveryStatus: "Not Delivered",
      clientName: this.userData.clientName,
      clientId: this.userData.id,
      clientPhone: this.userData.clientPhone,
      clientAddress: this.userData.clientAddress,
      cart: this.listOfDisplayData,
    };

    this.orderService.addOrder(this.order);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }

  log(value) {
    // this.quant = this.listOfDisplayData.filter((x) => x.id === value.id)[0];
    // this.quant.quantity = res;

    // this.quant.amount = this.quant.amount * res;

    // this.cartService.updateCartQuantity(value);
    const sum: number = this.listOfDisplayData
      .map((a) => a.amount * a.quantity)
      .reduce((a, b) => {
        return a + b;
      });
    console.log("ewrwerewrwer r wrewrw>>>>>>", sum);
    this.total = sum;

    console.log("TTTTTTT>>>>", value);
  }

  handleCheck() {
    for (const l of this.listOfDisplayData) {
      l.amount = l.amount * l.quantity;
    }

    const sum: number = this.listOfDisplayData
      .map((a) => a.amount)
      .reduce((a, b) => {
        return a + b;
      });
    console.log("ewrwerewrwer r wrewrw>>>>>>", sum);
    this.total = sum;
  }
  searchItem() {
    this.router.navigateByUrl("view-item");
  }

  handleAddress() {
    this.isVisible = false;
    this.isAddressConfirmationVisible = true;
  }

  handleAddressCancel() {
    this.isAddressConfirmationVisible = false;
  }
}

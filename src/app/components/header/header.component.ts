import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
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
import * as cryptico from "node-cryptico";
import * as CryptoJS from "crypto-js";
import * as forge from "node-forge";
import * as utf8 from "utf8";
import * as md5 from "md5";
import { HttpClient } from "@angular/common/http";
import { async } from "rxjs/internal/scheduler/async";
import { CategoryModel } from "src/app/home/models/categories.model";
import { CategoriesService } from "src/app/home/services/categories.service";
import { ItemModel } from "src/app/home/models/items.model";
import {auth} from "firebase";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  addressForm: FormGroup;
  cardForm: FormGroup;
  isVisible = false;
  searchString: number;
  isAddressConfirmationVisible = false;
  numberInCart: number;
  disabled = true;

  listOfData: CartModel[] = [];
  listOfDisplayData: CartModel[] = [];
  listOfCategoryData: CategoryModel[] = [];
  listOfDisplayCategoryData: CategoryModel[] = [];
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

  @Input() isOkLoading;

  selectedValue = null;
  selectedPayment = "";
  newItems: ItemModel[] = [];
  inputValue?: string;
  searchItems: ItemModel[] = [];
  searchedItem = "";

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private msg: NzMessageService,
    public authService: AuthService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private categoryService: CategoriesService
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

    this.cardForm = fb.group({
      cardNumber: ["", Validators.required],
      date: ["", Validators.required],
      cvc: ["", Validators.required],
      cardName: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.usersService.getUsers().subscribe((users) => {
      this.userData = users.filter((x) => x.email === this.user.email)[0];
      this.cardForm.get("cardName").setValue(this.userData.clientName);

      this.cartService.getOrders().subscribe((res) => {
        this.listOfDisplayData = res.filter(
          (x) =>
            x.clientId === this.userData.id &&
            x.checkoutStatus === "Pending Checkout"
        );
        this.numberInCart = this.listOfDisplayData.length;

        const sum: number = this.listOfDisplayData
          .map((a) => a.amount * a.quantity)
          .reduce((a, b) => {
            return a + b;
          });
        this.total = sum + 40;
      });
    });

    this.categoryService.getCategories().subscribe((res) => {
      this.listOfCategoryData = res;
      this.listOfDisplayCategoryData = this.listOfCategoryData;
      for (const cat of this.listOfDisplayCategoryData) {
        if (cat.items !== undefined || []) {
          this.newItems = this.newItems.concat(cat.items);
        }
      }

      this.searchItems = this.newItems;
    });
  }

  ngOnChanges() {
    this.usersService.getUsers().subscribe((users) => {
      this.userData = users.filter((x) => x.email === this.user.email)[0];
      this.cardForm.get("cardName").setValue(this.userData.clientName);

      this.cartService.getOrders().subscribe((res) => {
        this.listOfDisplayData = res.filter(
          (x) =>
            x.clientId === this.userData.id &&
            x.checkoutStatus === "Pending Checkout"
        );
        this.numberInCart = this.listOfDisplayData.length;

        const sum: number = this.listOfDisplayData
          .map((a) => a.amount * a.quantity)
          .reduce((a, b) => {
            return a + b;
          });
        this.total = sum + 40;
      });
    });
  }

  onChange(value: string): void {
    this.searchItems = this.newItems.filter(
      (option) =>
        option.itemName.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    this.searchedItem = value;
  }

  edit(item) {
    this.cartService.deleteItem(item);
  }

  showModal(): void {
    this.isVisible = true;
  }


  handleCancel(): void {
    this.isVisible = false;
  }

  log(value) {
    const sum: number = this.listOfDisplayData
      .map((a) => a.amount * a.quantity)
      .reduce((a, b) => {
        return a + b;
      });
    this.total = sum + 40;
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
    this.total = sum + 40;
  }
  searchItem() {
    this.router.navigateByUrl("view-item/" + this.searchedItem);
  }

  handleAddress() {
    this.isVisible = false;
    this.isAddressConfirmationVisible = true;
    this.addressForm.get("clientName").setValue(this.userData.clientName);
    this.addressForm.get("email").setValue(this.userData.email);
    this.addressForm.get("clientPhone").setValue(this.userData.clientPhone);
    this.addressForm.get("clientAddress").setValue(this.userData.clientAddress);
  }

  handleAddressCancel() {
    this.isAddressConfirmationVisible = false;
  }

  handleCardInfo() {

      const txref = 'MC-' + this.makeRef(6)
    const dateArray = this.cardForm.controls.date.value.match(/\d/g);
      const m1 = dateArray[0] + dateArray[1]
      const month = m1.replace(/^0+/, '');
    const year = dateArray[2] + dateArray[3];

    for (const l of this.listOfDisplayData) {
      l.amount = l.amount * l.quantity;
    }

    const sum: number = this.listOfDisplayData
      .map((a) => a.amount)
      .reduce((a, b) => {
        return a + b;
      });

    this.total = sum  + 40;

    let quantitySum = 0;
    this.listOfDisplayData.forEach((a) => (quantitySum += Number(a.quantity)));

    this.newQuantity = quantitySum;


    const cardPayment = {
      amount: 1,
      txref: txref,
      email: this.addressForm.controls.email.value,
      customer_phone: this.addressForm.controls.clientPhone.value,
      currency: 'ZMW',
      cardno: this.cardForm.controls.cardNumber.value,
      Cvv: this.cardForm.controls.cvc.value,
      expirymonth: month,
      expiryyear: year,
      pin:''
    }


    this.order = {
      id: v4(),
      orderNumber: "",
      quantity: quantitySum,
      amount: 1,
      deliveryStatus: "Not Delivered",
      paymentMethod: this.selectedPayment,
      paymentStatus: "Paid",
      clientName: this.addressForm.controls.clientName.value,
      clientId: this.userData.id,
      clientPhone: this.addressForm.controls.clientPhone.value,
      clientAddress: this.addressForm.controls.clientAddress.value,
      cart: this.listOfDisplayData,
    };


    this.orderService.cardPayment(cardPayment).subscribe((res: any) => {
      const authUrl = res.data.data.authurl
      this.http.get(authUrl).toPromise().catch((err) => {
        console.log('Card Payment Error', err)
      });

      this.orderService.addOrder(this.order);
      for (const cart of this.listOfDisplayData) {
        cart.checkoutStatus = "Checked Out";
        this.cartService.updateCart(cart);
      }
    }, (errb) => {
      console.log('Card Payment Error', errb)
    })

    this.total = 0;
    this.isVisible = false;
    this.isAddressConfirmationVisible = false;

    console.log('Card Data', cardPayment)





  }


  handlePay() {
    for (const l of this.listOfDisplayData) {
      l.amount = l.amount * l.quantity;
    }

    const sum: number = this.listOfDisplayData
      .map((a) => a.amount)
      .reduce((a, b) => {
        return a + b;
      });

    this.total = sum + 40;

    let quantitySum = 0;
    this.listOfDisplayData.forEach((a) => (quantitySum += Number(a.quantity)));

    this.newQuantity = quantitySum;

    this.order = {
      id: v4(),
      orderNumber: "",
      quantity: quantitySum,
      amount: this.total,
      deliveryStatus: "Not Delivered",
      paymentMethod: this.selectedPayment,
      paymentStatus: "Not Paid",
      clientName: this.addressForm.controls.clientName.value,
      clientId: this.userData.id,
      clientPhone: this.addressForm.controls.clientPhone.value,
      clientAddress: this.addressForm.controls.clientAddress.value,
      cart: this.listOfDisplayData,
    };

    this.orderService.addOrder(this.order);
    for (const cart of this.listOfDisplayData) {
      cart.checkoutStatus = "Checked Out";
      this.cartService.updateCart(cart);
    }

    this.total = 0;
    this.isVisible = false;
    this.isAddressConfirmationVisible = false;

  }


  makeRef(length: number) {
    let result           = '';
    const characters       = '0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }



}

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
import * as cryptico from "node-cryptico";
import * as CryptoJS from "crypto-js";
import * as forge from "node-forge";
import * as utf8 from "utf8";
import * as md5 from "md5";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  addressForm: FormGroup;
  cardForm: FormGroup;
  isVisible = false;
  searchString: number;
  isAddressConfirmationVisible = false;
  numberInCart: number;

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
    private fb: FormBuilder,
    private http: HttpClient
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

    console.log(this.ads);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("USER>>>>>>", this.user);
    this.usersService.getUsers().subscribe((users) => {
      this.userData = users.filter((x) => x.email === this.user.email)[0];
      this.cardForm.get("cardName").setValue(this.userData.clientName);

      this.cartService.getOrders().subscribe((res) => {
        this.listOfData = res.filter((x) => x.clientId === this.userData.id);
        this.listOfDisplayData = this.listOfData;
        this.numberInCart = this.listOfDisplayData.length;
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
        this.total = sum + 40;
      });
    });
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
    this.total = sum + 40;

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
    this.total = sum + 40;
  }
  searchItem() {
    this.router.navigateByUrl("view-item");
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
    const cardInfo = {
      PBFPubKey: "FLWPUBK-17d0d3f5788c77f9c19f474350af5175-X",
      cardno: this.cardForm.controls.cardNumber.value,
      cvv: this.cardForm.controls.cvc.value,
      expirymonth: "06",
      expiryyear: "20",
      currency: "ZMW",
      country: "ZM",
      amount: 2,
      email: this.addressForm.controls.email.value,
      phonenumber: this.addressForm.controls.clientPhone.value,
      firstname: "Changa",
      lastname: "Lesa",
      IP: "",
      txRef: "MCDL-" + Date.now(), // your unique merchant reference
      meta: [{ metaname: "flightID", metavalue: "123949494DC" }],
      redirect_url: "https://rave-webhook.herokuapp.com/receivepayment",
      device_fingerprint: "69e6b7f0b72037aa8428b70fbe03986c",
    };

    const chargeDataGlobal = cardInfo;

    console.log("CARD DATA>>>>", chargeDataGlobal);
    const newdata = {
      PBFPubKey: chargeDataGlobal.PBFPubKey,
      client: cryptico.encrypt(
        JSON.stringify(chargeDataGlobal),
        this.getPublicKey()
      ).cipher,
      alg: "3DES-24",
    };

    this.http
      .post("https://api.ravepay.co/flwv3-pug/getpaidx/api/charge", newdata)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log("ERROR", err);
        }
      );
  }

  // this is the getKey function that generates an encryption Key for you by passing your Secret Key as a parameter.
  getKey(seckey) {
    // const md5 = require("md5");
    const keymd5 = md5(seckey);
    const keymd5last12 = keymd5.substr(-12);

    const seckeyadjusted = seckey.replace("FLWSECK-", "");
    const seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12);

    return seckeyadjustedfirst12 + keymd5last12;
  }

  // This is the encryption function that encrypts your payload by passing the stringified format and your encryption Key.
  encrypt(key, text) {
    // const CryptoJS = require("crypto-js");
    // const forge = require("node-forge");
    // const utf8 = require("utf8");
    const cipher = forge.cipher.createCipher(
      "3DES-ECB",
      forge.util.createBuffer(key)
    );
    cipher.start({ iv: "" });
    cipher.update(forge.util.createBuffer(text, "utf-8"));
    cipher.finish();
    const encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
  }

  /**** THIS ENCRYPTION SECTION IS FOR FRONT END ECRYPTION***/

  // Encryption can also be done at the front end using `RSA Encryption`:
  getPublicKey() {
    // write function to generate Public Key here using RSA Encryption
    // see cryptico docs on how to do that.
    // The passphrase used to repeatably generate this RSA key.
    const PassPhrase = "The Moon is a CRAZY Mistress.";

    // The length of the RSA key, in bits.
    const Bits = 1024;

    return cryptico.generateRSAKey(PassPhrase, Bits);
  }
}

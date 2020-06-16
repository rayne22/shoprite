import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CategoriesService } from "./services/categories.service";
import { CategoryModel } from "./models/categories.model";
import { combineLatest } from "rxjs";
import { ItemModel } from "./models/items.model";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { CartModel } from "./models/cart.model";
import { UserModel } from "./models/user.model";
import { v4 } from "uuid";
import { CartService } from "./services/cart.service";
import { UsersService } from "./services/users.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  backgroundImg: any;
  listOfData: CategoryModel[];
  category: CategoryModel;
  listOfDisplayData: CategoryModel[];
  array = [1, 2, 3, 4];
  newItems: ItemModel[] = [];
  items: any;
  item: ItemModel;
  cart: CartModel;
  carts: CartModel[];
  cartList: CartModel[];
  cartArray: CartModel[];
  id: any;
  cartObj: CartModel;
  quantity: number;
  exitsts = true;
  user: any;
  userData: UserModel;
  isOkLoading = false;

  hotOffer: ItemModel[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private categoryService: CategoriesService,
    private readonly router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private cartService: CartService,
    private usersService: UsersService
  ) {
    this.backgroundImg = sanitizer.bypassSecurityTrustStyle(
      "url(http://www.freephotos.se/images/photos_medium/white-flower-4.jpg)"
    );

    this.items = this.newItems[
      Math.floor(Math.random() * this.newItems.length)
    ];
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.listOfData = res;
      this.listOfDisplayData = this.listOfData;
      for (const cat of res) {
        if (cat.items !== undefined || []) {
          this.newItems = this.newItems.concat(cat.items);
          this.hotOffer = this.newItems.filter(
            (x) => x.promoStatus === "On Promotion"
          );
        }
      }
      this.items = this.newItems[
        Math.floor(Math.random() * this.newItems.length)
      ];
    });
  }

  addItem(value) {
    if (this.cartList.length <= 0) {
      this.cartObj = {
        id: v4(),
        cartNumber: "",
        amount: value.price * 1,
        quantity: 1,
        cartDescription: value.itemName,
        checkoutStatus: "Pending Checkout",
        clientName: this.userData.clientName,
        clientId: this.userData.id,
        clientAddress: this.userData.clientAddress,
        clientPhone: this.userData.clientPhone,
        item: [{ ...value }],
      };

      this.cartService.addCart(this.cartObj);
      this.isOkLoading = true;
      setTimeout(() => {
        this.isOkLoading = false;
      }, 3000);
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };
    } else {
      for (const item of this.cartList) {
        if (item.cartDescription === value.itemName) {
          item.quantity = item.quantity + 1;
          item.amount = item.amount + value.price * item.quantity;
          this.cartService.updateCart(item);
        }

        if (item.cartDescription !== value.itemName) {
          this.cartObj = {
            id: v4(),
            cartNumber: "",
            amount: value.price * 1,
            quantity: 1,
            cartDescription: value.itemName,
            checkoutStatus: "Pending Checkout",
            clientName: this.userData.clientName,
            clientId: this.userData.id,
            clientAddress: this.userData.clientAddress,
            clientPhone: this.userData.clientPhone,
            item: [{ ...value }],
          };

          this.cartService.addCart(this.cartObj);
          this.isOkLoading = true;
          setTimeout(() => {
            this.isOkLoading = false;
          }, 3000);
          this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
          };
        }
        break;
      }
    }
  }

  signIn() {
    this.router.navigateByUrl("/sign-in");
  }
}

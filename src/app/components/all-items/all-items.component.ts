import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "src/app/home/models/categories.model";
import { ItemModel } from "src/app/home/models/items.model";
import { DomSanitizer } from "@angular/platform-browser";
import { CategoriesService } from "src/app/home/services/categories.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CartModel } from "src/app/home/models/cart.model";
import { UserModel } from "src/app/home/models/user.model";
import { v4 } from "uuid";
import { CartService } from "src/app/home/services/cart.service";

@Component({
  selector: "app-all-items",
  templateUrl: "./all-items.component.html",
  styleUrls: ["./all-items.component.css"],
})
export class AllItemsComponent implements OnInit {
  listOfData: CategoryModel[];
  category: CategoryModel;
  listOfDisplayData: CategoryModel[];
  array = [1, 2, 3, 4];
  newItems: ItemModel[] = [];
  items: any;
  viewItem: ItemModel;
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
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((itemId) => {
      console.log(itemId);

      this.categoryService.getCategories().subscribe((res) => {
        this.listOfData = res;
        this.listOfDisplayData = this.listOfData;
        // this.totalNumber = this.listOfData.length;
        for (const cat of res) {
          if (cat.items !== undefined || []) {
            this.id = cat.id;
            this.newItems = this.newItems.concat(cat.items);
            // this.hotOffer = this.newItems.filter(
            //   (x) => x.promoStatus === "On Promotion"
            // );
          }
        }

        this.viewItem = this.newItems.filter(
          (x) => x.itemName === itemId.itemId
        )[0];
        console.log("ITEMS>>>>", this.newItems, this.id);
      });
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
        console.log("Value Single>>>>", item);
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
}

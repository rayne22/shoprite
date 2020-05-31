import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriesService } from "src/app/home/services/categories.service";
import { CategoryModel } from "src/app/home/models/categories.model";
import { AuthService } from "src/app/home/services/auth.service";
import { ItemModel } from "src/app/home/models/items.model";
import { CartModel } from "src/app/home/models/cart.model";
import { UserModel } from "src/app/home/models/user.model";
import { CartService } from "src/app/home/services/cart.service";
import { NzMessageService } from "ng-zorro-antd";
import { UsersService } from "src/app/home/services/users.service";
import { v4 } from "uuid";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  listOfData: CategoryModel[];
  category: CategoryModel;
  id: any;
  item: ItemModel;
  cart: CartModel;
  carts: CartModel[];
  cartList: CartModel[];
  cartArray: CartModel[];
  cartObj: CartModel;
  quantity: number;
  exitsts = true;
  user: any;
  userData: UserModel;
  isSignInVisible = false;
  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private categoryService: CategoriesService,
    private cartService: CartService,
    private msg: NzMessageService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((id) => {
      console.log("Product ID >>>>", id);
      this.id = id.id;
      this.categoryService.getCategories().subscribe((res) => {
        this.category = res.filter((x) => x.categoryNumber === this.id)[0];
        console.log("Product ID >>>>", this.category);
      });

      this.cartService.getOrders().subscribe((res) => {
        this.cartList = res.filter(
          (x) => x.checkoutStatus === "Pending Checkout"
        );
        console.log("Cart >>>>", this.cartList);
      });

      this.user = JSON.parse(localStorage.getItem("user"));

      console.log("USER>>>>>>", this.user);
      this.usersService.getUsers().subscribe((users) => {
        this.userData = users.filter((x) => x.email === this.user.email)[0];
      });
    });
  }

  signIn() {
    this.router.navigateByUrl("/sign-in");
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
        }
        break;
      }
    }
  }
}

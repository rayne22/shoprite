import { Component, OnInit } from "@angular/core";
import { ItemModel } from "src/app/home/models/items.model";
import { CategoryModel } from "src/app/home/models/categories.model";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriesService } from "src/app/home/services/categories.service";
import { CartModel } from "src/app/home/models/cart.model";
import { CartService } from "src/app/home/services/cart.service";
import { NzMessageService } from "ng-zorro-antd";
import { v4 } from "uuid";
import { UsersService } from "src/app/home/services/users.service";
import { UserModel } from "src/app/home/models/user.model";
import { AuthService } from "src/app/home/services/auth.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  listOfData: CategoryModel[];
  category: CategoryModel;
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
      this.id = id.id;
      this.categoryService.getCategories().subscribe((res) => {
        this.category = res.filter((x) => x.categoryNumber === this.id)[0];

        this.item = this.category.items.filter(
          (x) => x.itemNumber === id.itemId
        )[0];
      });

      this.cartService.getOrders().subscribe((res) => {
        this.cartList = res.filter(
          (x) => x.checkoutStatus === "Pending Checkout"
        );
      });

      this.user = JSON.parse(localStorage.getItem("user"));

      this.usersService.getUsers().subscribe((users) => {
        this.userData = users.filter((x) => x.email === this.user.email)[0];
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

  addNewItem(value, category) {
    this.router.navigateByUrl(
      "/product-details/" + this.id + "/" + value.itemNumber
    );
  }

  signIn() {
    this.router.navigateByUrl("/sign-in");
  }
}

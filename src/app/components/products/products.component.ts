import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriesService } from "src/app/home/services/categories.service";
import { CategoryModel } from "src/app/home/models/categories.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  listOfData: CategoryModel[];
  category: CategoryModel;
  id: any;
  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((id) => {
      console.log("Product ID >>>>", id);
      this.id = id.id;
      this.categoryService.getCategories().subscribe((res) => {
        this.category = res.filter((x) => x.categoryNumber === this.id)[0];
        console.log("Product ID >>>>", this.category);
      });
    });
  }

  addNewItem(value, category) {
    this.router.navigateByUrl(
      "/product-details/" + category.categoryNumber + value.itemNumber
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "src/app/home/models/categories.model";
import { ItemModel } from "src/app/home/models/items.model";
import { DomSanitizer } from "@angular/platform-browser";
import { CategoriesService } from "src/app/home/services/categories.service";
import { Router, ActivatedRoute } from "@angular/router";

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

  hotOffer: ItemModel[] = [];
  id: string;

  constructor(
    private sanitizer: DomSanitizer,
    private categoryService: CategoriesService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.listOfData = res;
      this.listOfDisplayData = this.listOfData;
      // this.totalNumber = this.listOfData.length;
      for (const cat of res) {
        if (cat.items !== undefined || []) {
          this.id = cat.id;
          this.newItems = this.newItems.concat(cat.items);
          this.hotOffer = this.newItems.filter(
            (x) => x.promoStatus === "On Promotion"
          );
        }
      }
      console.log("ITEMS>>>>", this.newItems, this.id);
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CategoriesService } from "./services/categories.service";
import { CategoryModel } from "./models/categories.model";
import { combineLatest } from "rxjs";
import { ItemModel } from "./models/items.model";
import { Router, ActivatedRoute } from "@angular/router";

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

  hotOffer: ItemModel[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private categoryService: CategoriesService,
    private readonly router: Router,
    private route: ActivatedRoute
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
}

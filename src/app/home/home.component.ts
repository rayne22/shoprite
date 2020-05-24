import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CategoriesService } from "./services/categories.service";
import { CategoryModel } from "./models/categories.model";

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

  constructor(
    private sanitizer: DomSanitizer,
    private categoryService: CategoriesService
  ) {
    this.backgroundImg = sanitizer.bypassSecurityTrustStyle(
      "url(http://www.freephotos.se/images/photos_medium/white-flower-4.jpg)"
    );
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.listOfData = res;
      this.listOfDisplayData = this.listOfData;
      // this.totalNumber = this.listOfData.length;
      console.log("Categories>>>>", this.listOfDisplayData);
    });
  }
}

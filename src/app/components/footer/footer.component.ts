import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "src/app/home/models/categories.model";
import { CategoriesService } from "src/app/home/services/categories.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  listOfData: CategoryModel[];
  category: CategoryModel;
  listOfDisplayData: CategoryModel[];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.listOfData = res;
      this.listOfDisplayData = this.listOfData;
      // this.totalNumber = this.listOfData.length;
      console.log("Categories>>>>", this.listOfDisplayData);
    });
  }
}

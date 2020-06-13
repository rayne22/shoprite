import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "src/app/home/models/categories.model";
import { CategoriesService } from "src/app/home/services/categories.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  listOfData: CategoryModel[];
  category: CategoryModel;
  listOfDisplayData: CategoryModel[];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.listOfData = res;
      this.listOfDisplayData = this.listOfData;
    });
  }
}

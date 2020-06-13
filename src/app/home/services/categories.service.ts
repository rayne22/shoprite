import { Injectable } from "@angular/core";
import { AngularFirestoreCollection } from "@angular/fire/firestore/public_api";
import { CategoryModel } from "../models/categories.model";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private categoriesCollection: AngularFirestoreCollection<CategoryModel>;
  categories: Observable<CategoryModel[]>;
  itemUrl: any;

  constructor(private firebase: AngularFirestore) {
    this.categoriesCollection = firebase.collection<CategoryModel>(
      "categories"
    );
    this.categories = this.categoriesCollection.valueChanges();
  }

  getCategories() {
    return this.categories;
  }

  updateCategory(category: CategoryModel) {
    this.categoriesCollection
      .doc(category.id)
      .update(category)
      .then((res) => {})
      .catch((err) => {});
  }
}

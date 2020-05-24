import { ItemModel } from "./items.model";

export class CategoryModel {
  id: string;
  categoryNumber: string;
  categoryName: string;
  categoryDescription: string;
  items: ItemModel[];
}

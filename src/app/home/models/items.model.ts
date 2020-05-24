export class ItemModel {
  itemNumber: string;
  itemName: string;
  itemDescription: string;
  price: number;
  units?: string;
  saleStatus: SaleStatus;
  promoStatus: PromoStatus;
  discount?: number;
  imgUrl: string;
}

export type SaleStatus = "Sold" | "Not Sold ";
export type PromoStatus = "On Promotion" | "Not on Promotion";

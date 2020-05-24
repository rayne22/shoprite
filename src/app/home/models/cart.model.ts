import { ItemModel } from "./items.model";

export class CartModel {
  id: string;
  cartNumber: string;
  cartDescription: string;
  quantity: number;
  amount: number;
  checkoutStatus: CheckoutStatus;
  clientName: string;
  clientId: string;
  clientAddress: string;
  item: ItemModel[];
}

export type CheckoutStatus = "Checked Out" | "Pending Checkout";

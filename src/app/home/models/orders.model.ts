import { ItemModel } from "./items.model";

export class OrderModel {
  id: string;
  orderNumber: string;
  quantity: string;
  amount: number;
  deliveryStatus: DeliveryStatus;
  clientName: string;
  clientId: string;
  clientAddress: string;
  item: ItemModel[];
}

export type DeliveryStatus = "Delivered" | "Not Delivered" | "In Transit";

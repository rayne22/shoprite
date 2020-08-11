import { CartModel } from "./cart.model";

export class OrderModel {
  id: string;
  orderNumber: string;
  quantity: number;
  amount: number;
  deliveryStatus: DeliveryStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  clientName: string;
  clientId: string;
  clientAddress: string;
  clientPhone: string;
  cart: CartModel[];
}

export type DeliveryStatus = "Delivered" | "Not Delivered" | "In Transit";
export type  PaymentStatus = "Paid" | "Not Paid"

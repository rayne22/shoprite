export interface UserModel {
  id: string;
  email: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  emailVerified?: boolean;
  defaultCard?: boolean;
  cardDetails?: CardDetails[];
}


export class CardDetails {
  id: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

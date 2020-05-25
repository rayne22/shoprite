export interface UserModel {
  id: string;
  email: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  emailVerified?: boolean;
}

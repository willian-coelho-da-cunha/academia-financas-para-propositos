export interface FinancialPurpose {
  id: string;
  name: string;
  order: number;
  description: string;
  status: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  releasedAt: string;
  [key: string]: string | number;
}

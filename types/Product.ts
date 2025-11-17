export interface Product {
  type: string;
  amount: number;
  createdAt: string;
  transactions: Transaction[];
}
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  description?: string;
}

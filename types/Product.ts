export interface Product {
    id: string; 
  customerId:string;
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

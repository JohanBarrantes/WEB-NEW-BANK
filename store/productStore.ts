// store/productStore.ts
import { create } from "zustand";

// -------------------------------
// TIPOS
// -------------------------------
export interface Transaction {
  type: "income" | "expense";
  amount: number;
  date: string;
}

export interface Product {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  transactions: Transaction[];
}

interface ProductStore {
  products: Product[];

  createProduct: (product: Omit<Product, "id" | "transactions">) => void;

  addTransaction: (productIndex: number, transaction: Transaction) => void;
}

// -------------------------------
// STORE
// -------------------------------
export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  createProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          id: crypto.randomUUID(),
          transactions: [],
          ...product,
        },
      ],
    })),

  addTransaction: (productIndex, transaction) =>
    set((state) => {
      const updated = [...state.products];
      const selected = updated[productIndex];

      if (!selected) return state;

      // agregar transacción
      selected.transactions.push(transaction);

      // actualizar balance
      if (transaction.type === "income") {
        selected.amount = Number(selected.amount) + transaction.amount;
      } else {
        selected.amount = Number(selected.amount) - transaction.amount;
      }

      updated[productIndex] = selected;

      return { products: updated };
    }),
}));

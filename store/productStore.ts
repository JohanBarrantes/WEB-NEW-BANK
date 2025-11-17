import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  createProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, transactions: [] }],
    })),

  addTransaction: (productIndex, transaction) =>
    set((state) => {
      const updated = [...state.products];
      updated[productIndex].transactions.push(transaction);

      // update balance
      if (transaction.type === 'income') {
        updated[productIndex].amount =
          Number(updated[productIndex].amount) + transaction.amount;
      } else {
        updated[productIndex].amount =
          Number(updated[productIndex].amount) - transaction.amount;
      }

      return { products: updated };
    }),
}));

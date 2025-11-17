'use client';

import { useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/productStore';
import { useState } from 'react';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';

export default function ProductDetailPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const { products, addTransaction } = useProductStore();

  const product = products.find((p, index) => String(index) === productId);

  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h1 className="text-xl">El producto no ha sido encontrado </h1>
        </div>
      </div>
    );
  }

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    addTransaction(Number(productId), {
      type,
      amount: Number(amount),
      date: new Date().toLocaleDateString(),
    });

    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex justify-center">
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-6">Product Details</h1>

        {/* PRODUCT INFO */}
        <div className="mb-8 space-y-2">
          <p><strong>Type:</strong> {product.type}</p>
          <p><strong>Created:</strong> {product.createdAt}</p>
          <p><strong>Balance:</strong> ${product.amount}</p>
        </div>

        {/* ADD TRANSACTION */}
        <form className="space-y-4 mb-8" onSubmit={handleAddTransaction}>
          <select
            className="
              w-full px-4 py-2 rounded-lg border 
              bg-gray-700 text-white border-gray-600
              focus:ring-2 focus:ring-blue-500
            "
            value={type}
            onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as 'income' | 'expense')}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          />

          <Button>Add Transaction</Button>
        </form>

        {/* TRANSACTIONS TABLE */}
        <h2 className="text-xl font-bold mb-4">Transactions</h2>

        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {product.transactions?.length ? (
                product.transactions.map((t, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="px-4 py-2 capitalize">
                      {t.type}
                    </td>
                    <td className="px-4 py-2">
                      ${t.amount}
                    </td>
                    <td className="px-4 py-2">
                      {t.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-4 text-center text-gray-400">
                    No transactions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

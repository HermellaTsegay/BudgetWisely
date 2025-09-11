import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddTransaction = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amt = parseFloat(amount);
    if (!description || isNaN(amt)) return;

    const transaction = {
      description,
      amount: Math.abs(amt),
      type: amt >= 0 ? 'income' : 'expense',
      createdAt: serverTimestamp(),
    };

    const user = auth.currentUser;

    if (user) {
      // Save to Firestore
      try {
        await addDoc(collection(db, 'users', user.uid, 'transactions'), transaction);
      } catch (error) {
        console.error('Error saving transaction:', error);
      }
    } else {
      // Guest user fallback
      onAdd(transaction);
    }

    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <input
          type="number"
          className="form-control"
          placeholder="Amount (+/-)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button className="btn btn-primary w-100" type="submit">
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransaction;

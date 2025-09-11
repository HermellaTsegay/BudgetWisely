import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <ul className="list-group mb-4">
      {transactions.map((t) => (
        <li
          key={t.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            t.type === 'income' ? 'list-group-item-success' : 'list-group-item-danger'
          }`}
        >
          <span>{t.description}</span>
          <span>
            ${t.amount.toFixed(2)}
            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={() => onDelete(t.id)}
            >
              &times;
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;

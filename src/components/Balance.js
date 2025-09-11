import React from 'react';

const Balance = ({ balance }) => {
  return (
    <div className="text-center mb-4">
      <h2>Current Balance</h2>
      <h3 className={balance >= 0 ? 'text-success' : 'text-danger'}>
        ${balance.toFixed(2)}
      </h3>
    </div>
  );
};

export default Balance;

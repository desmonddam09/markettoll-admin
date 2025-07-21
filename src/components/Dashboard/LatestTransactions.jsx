import React from "react";
import TransactionListItem from "./TransactionListItem";

const LatestTransactions = () => {
  return (
    <div className="w-full flex flex-col border rounded-xl p-4">
      <h1 className="text-base font-semibold mb-2">Recent Transactions</h1>
      <TransactionListItem />
      <TransactionListItem />
      <TransactionListItem />
      <TransactionListItem />
      <TransactionListItem />
      <TransactionListItem />
    </div>
  );
};

export default LatestTransactions;

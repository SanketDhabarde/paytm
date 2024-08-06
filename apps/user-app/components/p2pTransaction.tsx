import { Card } from "@repo/ui/card";
import React from "react";

enum Status {
  Received,
  Sent,
}

interface p2pTransactionProps {
  id: number;
  amount: number;
  timestamp: Date;
  status: Status;
}

export const P2pTransactions = ({
  transactions,
}: {
  transactions: p2pTransactionProps[];
}) => {
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">
                {t.status === 0 ? "Received INR" : "Sent INR"}
              </div>
              <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {t.status === 0 ? "+" : "-"} Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

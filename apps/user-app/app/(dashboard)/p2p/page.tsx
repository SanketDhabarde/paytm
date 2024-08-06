import { getServerSession } from "next-auth";
import { SendMoney } from "../../../components/SendMoneyCard";
import { authConfig } from "../../../lib/auth";
import { P2pTransactions } from "../../../components/p2pTransaction";
import db from "@repo/db/client";

enum Status {
  Received,
  Sent,
}

async function getp2pTransections() {
  const session = await getServerSession(authConfig);
  const sentTransections = await db.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user.id),
    },
  });
  const receivedTransections = await db.p2pTransfer.findMany({
    where: {
      toUserId: Number(session?.user.id),
    },
  });
  const sent = sentTransections.map((tx) => ({
    id: tx.id,
    amount: tx.amount,
    timestamp: tx.timestamp,
    status: Status.Sent,
  }));
  const received = receivedTransections.map((tx) => ({
    id: tx.id,
    amount: tx.amount,
    timestamp: tx.timestamp,
    status: Status.Received,
  }));

  const transactions = [...sent, ...received];

  return transactions;
}

export default async function () {
  const transections = await getp2pTransections();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="flex items-center justify-center w-full mt-10">
        <SendMoney />
        <div className="ml-2 w-[50%]">
          <P2pTransactions transactions={transections} />
        </div>
      </div>
    </div>
  );
}

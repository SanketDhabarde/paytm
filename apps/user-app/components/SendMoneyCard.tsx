"use client";

import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";
import React, { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransection";
import { Center } from "@repo/ui/center";

export const SendMoney = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              value={number}
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  await p2pTransfer(number, Number(amount) * 100);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};

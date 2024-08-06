"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import { createOnrampTransection } from "../lib/actions/createOnrampTransection";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          value={amount}
          placeholder={"Amount"}
          onChange={(v) => setAmount(v)}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          value={provider}
          onSelect={(value) => {
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnrampTransection(Number(amount), provider);
              // window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};

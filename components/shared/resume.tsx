import React from "react";
import Card from "./cards";
import { Cardholder, CurrencyDollar, Money } from "phosphor-react";

interface ResumeProps {
  income: string;
  expense: string;
  total: string;
}

function Resume({ income, expense, total }: ResumeProps) {

  return (
    <div className="mx-0 my-auto flex gap-5 mt-[-50px] mb-8 justify-around">
      <Card
        styles="text-green-500"
        title="Entrada"
        Icon={<Money size={32} />}
        value={income.replace(/(\d)(\d{2})$/, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g,".")}
      />
      <Card
        styles="text-red-500"
        title="Saídas"
        Icon={<Cardholder size={32} />}
        value={expense.replace(/(\d)(\d{2})$/, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g,".")}
      />
      <Card
        styles="text-gray-600"
        title="Total"
        Icon={<CurrencyDollar size={32} />}
        value={total.replace(/(\d)(\d{2})$/, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g,".")}
      />
    </div>
  );
}

export default Resume;

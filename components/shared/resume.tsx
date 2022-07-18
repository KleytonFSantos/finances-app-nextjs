import React from "react";
import { Card } from "./cards";
import { Cardholder, CurrencyDollar, Money } from "phosphor-react";
import { NextPage } from "next";

interface IProps {
  income: string;
  expense: string;
  total: string;
}

export const Resume: NextPage<IProps> = ({ income, expense, total }) => {
  return (
    <div className="mx-0  my-auto flex gap-5 mt-[-50px] mb-8 justify-around">
      <Card
        titleStyles="font-bold text-gray-600 text-left"
        styles="text-green-500 lg:w-36"
        title="Entrada"
        Icon={<Money size={32} />}
        value={income
          .replace(/(\d)(\d{2})$/, "$1,$2")
          .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      />
      <Card
        titleStyles="font-bold text-gray-600 text-left"
        styles="text-red-500 lg:w-36"
        title="Saídas"
        Icon={<Cardholder size={32} />}
        value={expense
          .replace(/(\d)(\d{2})$/, "$1,$2")
          .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      />
      <Card
        titleStyles="font-bold text-gray-100 text-left"
        styles="text-gray-100 lg:w-36"
        title="Total"
        Icon={<CurrencyDollar size={32} />}
        value={total
          .replace(/(\d)(\d{2})$/, "$1,$2")
          .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      />
    </div>
  );
};

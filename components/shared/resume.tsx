import React, { createRef, useState } from "react";
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
    <>
   <div className="lg:flex flex-col lg:flex-row gap-2 lg:w-full items-center lg:max-w-7xl lg:gap-5 mt-[-50px] lg:mb-8 lg:justify-around">
      <Card
        cardStyle="hidden lg:block bg-white shadow lg:shadow-2xl lg:p-6 rounded-2xl border-2 flex flex-col items-center  border-zinc-100"
        titleStyles="font-bold text-gray-600 text-left"
        styles="text-green-500 lg:w-36"
        title="Entrada"
        Icon={<Money size={32} />}
        value={income
          .replace(/(\d)(\d{2})$/, "$1,$2")
          .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      />
      <Card
        cardStyle="hidden lg:block bg-white shadow lg:shadow-2xl lg:p-6 rounded-2xl border-2 flex flex-col items-center  border-zinc-100"
        titleStyles="font-bold text-gray-600 text-left"
        styles="text-red-500 lg:w-36"
        title="Saídas"
        Icon={<Cardholder size={32} />}
        value={expense
          .replace(/(\d)(\d{2})$/, "$1,$2")
          .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      />
      <Card
        cardStyle="bg-white shadow lg:shadow-2xl lg:p-6 rounded-2xl border-2 flex flex-col items-center  border-zinc-100"
        titleStyles="font-bold text-left"
        styles="p-4 lg:p-0 text-center base w-32 lg:w-36"
        title="Total"
        Icon={<CurrencyDollar size={32} />}
        value={total
          .replace(/(\d)(\d{2})$/, "$1,$2")
          .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      />
    </div>
   </>
  );
};

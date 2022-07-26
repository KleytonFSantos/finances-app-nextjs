import { prisma } from "../lib/prisma";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { Cards } from "../components/shared/cards";
import { Header } from "../components/shared/header";
import { Income, Expense, Finances } from "../types";
import { BsArrowUpCircle } from "react-icons/bs";
import { formatDistance } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import React, { createRef, useState } from "react";
import { Grid } from "../components/shared/grid";

interface IProps {
  incomes: Income[];
  expenses: Expense[];
  finances: Finances[];
}

const Home: NextPage<IProps> = ({ incomes, expenses, finances }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const dates = finances.map((item) => item.createdAt);
  const lastDate = dates[dates.length - 1];
  const lastDateFormatted = formatDistance(new Date(lastDate), new Date(), {
    locale: ptBR,
  });

  const income = incomes.reduce((acc, curr) => acc + curr.value, 0);
  const expense = expenses.reduce((acc, curr) => acc + curr.value, 0);

  const cards = [
    <Cards
      key="1"
      title="Entradas"
      icon={<BsArrowUpCircle size={30} color="green" />}
      value={income
        .toString()
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      lastTransition={`Última transação à ${lastDateFormatted}`}
    />,
    <Cards
      key="2"
      title="Despesas"
      icon={<BsArrowUpCircle size={30} color="green" />}
      value={expense
        .toString()
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      lastTransition={`Última transação à ${lastDateFormatted}`}
    />,
    <Cards
      key="3"
      title="Total"
      icon={<BsArrowUpCircle size={30} color="green" />}
      value={(income - expense)
        .toString()
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      lastTransition={`Última transação à ${lastDateFormatted}`}
    />,
  ];
  const refs = cards.reduce((acc: { [key: number]: any }, _val, i: number) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToImage = (i: number) => {
    setCurrentImage(i);

    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const totalImages = cards.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };
  const arrowStyle =
    "absolute text-zinc-400 ml-[-12px] mr-[-12px] text-base h-9 w-9 rounded-full flex items-center justify-center";

  const sliderControl = (isLeft: boolean) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "left-2" : "right-2"}`}
      style={{ top: "40%" }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
        {isLeft ? "◀" : "▶"}
      </span>
    </button>
  );

  return (
    <div>
      <Head>
        <title>Finances-App</title>
      </Head>

      <Header />
      <div className="fixed w-full justify-around mt-[-70px] flex">
        <div className="carousel">
          {sliderControl(true)}
          {cards.map((card, i) => (
            <div
              className="w-full text- flex-inline flex-shrink-0"
              key={card.key}
              ref={refs[i]}
            >
              <div className="">{card}</div>
            </div>
          ))}
          {sliderControl(false)}
        </div>
      </div>
      <Grid />
    </div>

  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let finances = await prisma.finances.findMany({
    orderBy: {
      date: "asc",
    },
  });
  finances = JSON.parse(JSON.stringify(finances));

  let incomes = await prisma.finances.findMany({
    where: {
      category: "income",
    },
    orderBy: {
      date: "asc",
    },
  });
  incomes = JSON.parse(JSON.stringify(incomes));

  let expenses = await prisma.finances.findMany({
    where: {
      category: "expense",
    },
    orderBy: {
      date: "asc",
    },
  });
  expenses = JSON.parse(JSON.stringify(expenses));

  console.log(finances);
  return {
    props: {
      incomes,
      expenses,
      finances,
    },
  };
};

export default Home;

import React, { createRef } from "react";
import { Card } from "./cards";
import { Cardholder, CurrencyDollar, Money } from "phosphor-react";
import { NextPage } from "next";

interface IProps {
  income: string;
  expense: string;
  total: string;
}


export const Resume: NextPage<IProps> = ({ income, expense, total }) => {
  const [currentImage, setCurrentImage] = React.useState(0);


  const cards = [ <Card
    key="1"
    titleStyles="font-bold p-4 text-gray-600 text-left"
    styles="text-green-500 lg:w-36"
    title="Entrada"
    Icon={<Money size={32} />}
    value={income
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".")}
  />,
  <Card
    key="2"
    titleStyles="font-bold p-4 text-gray-600 text-left"
    styles="text-red-500 lg:w-36"
    title="Saídas"
    Icon={<Cardholder size={32} />}
    value={expense
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".")}
  />,
  <Card
    key="3"
    titleStyles="font-bold text-gray-600 text-left"
    styles="text-gray-600 p-4 lg:p-0 text-center base w-32 lg:w-36"
    title="Total"
    Icon={<CurrencyDollar size={32} />}
    value={total
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".")}
  /> ]

  const refs = cards.reduce((acc, val, i) => {
    acc[i] = createRef();
    return acc;
  });

  const scrollToImage = i => {
    // First let's set the index of the image we want to see next
    setCurrentImage(i);
    // Now, this is where the magic happens. We 'tagged' each one of the images with a ref,
    // we can then use built-in scrollIntoView API to do eaxactly what it says on the box - scroll it into
    // your current view! To do so we pass an index of the image, which is then use to identify our current
    // image's ref in 'refs' array above.
    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: 'smooth',
      //      Defines vertical alignment.
      block: 'nearest',
      //      Defines horizontal alignment.
      inline: 'start',
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
    'absolute text-white text-2xl  bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center';

  const sliderControl = isLeft => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
      style={{ top: '40%' }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? '◀' : '▶'}
      </span>
    </button>
  );

  return (
    <>
   <div className="lg:flex hidden flex-col lg:flex-row gap-2 lg:w-full items-center lg:max-w-7xl lg:gap-5 mt-[-50px] lg:mb-8 lg:justify-around">
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
        styles="text-gray-100 p-4 lg:p-0 text-center base w-32 lg:w-36"
        title="Total"
        Icon={<CurrencyDollar size={32} />}
        value={total
          .replace(/(\d)(\d{2})$/, "$1,$2")
          .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      />
      
    </div>
     <div className="justify-center lg:hidden md:w-1/2 items-center ml-8">
     <div className="relative w-full">
       <div className="carousel">
         {sliderControl(true)}
         {cards.map((card, i) => (
           <div className="w-full flex-shrink-0" key={card} ref={refs[i]}>
             <div  className="w-72 mt-6 ">{card}</div>
           </div>
         ))}
         {sliderControl(false)}
       </div>
     </div>
   </div>
   </>
  );
};

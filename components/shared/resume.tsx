import React from 'react'
import Card from './cards'
import { Cardholder, CurrencyDollar, Money } from 'phosphor-react';

interface ResumeProps {
    income: number;
    expense: number;
    total: number;
}

function Resume( { income, expense, total }: ResumeProps ) {
    return (
      <div className='mx-0 my-auto flex gap-5 mt-[-50px] mb-8 justify-around'>
          <Card
          styles='text-green-500'
          title='Entrada' 
          Icon={<Money size={32}/>} 
          value={income}/>
          <Card
          styles='text-red-500' 
          title="Saídas" 
          Icon={<Cardholder size={32}/>} 
          value={expense}/>
          <Card
          styles='text-gray-600' 
          title="Total" 
          Icon={<CurrencyDollar size={32} />} 
          value={total}/>
      </div>
      )
  }
  
  export default Resume
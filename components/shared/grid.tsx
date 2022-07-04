import React from 'react'
import GridItem from '../shared/gridItems'

interface GridProps {
    item: any[];
    setItem: (item: any[]) => void;
}

function Grid({ item, setItem }: GridProps) {
    
    const onDelete = (ID: any) => {
        confirm('Você deseja mesmo deletar?');
        const newArray = item.filter((transaction) => transaction.id !== ID);
        setItem(newArray);
        localStorage.setItem('transaction', JSON.stringify(newArray));
    }
  
return (
    <table className="w-full bg-slate-100 shadow rounded mt-8">
        <thead>
            <tr>
                <th className="w-[26.6%] text-left inset-y-auto pl-3">Descrição</th>
                <th className="w-[26.6%] text-left inset-y-auto">Valor</th>
                <th className="w-[26.6%] text-left inset-y-auto">Data</th>
                <th className="w-[10%] text-left inset-y-auto" >
                    Tipo
                </th>
                <th className="w-[10%] inset-y-auto text-center"></th>
            </tr>
        </thead>
        <tbody>
            {item?.map((item, index) =>(
                <GridItem onDelete={onDelete} key={index} item={item}></GridItem>
            ))}
        </tbody>
    </table>
    )
}

export default Grid
import React from 'react'
import { 
    FaRegArrowAltCircleUp, 
    FaRegArrowAltCircleDown, 
    FaTrash 
} from 'react-icons/fa'

interface GridItemProps {
    item: any;
    onDelete: (ID: number) => void;
}

function GridItem({ item, onDelete }: GridItemProps) {
  return (
    <tr>
        <td className='pt-4 break-all pl-3'>{item.desc}</td>
        <td className='pt-4 break-all'>R$ {item.amount}</td>
        <td className='pt-4 break-all'>{item.date}</td>
        <td className='pt-4 break-all text-center'>
            {item.expense ? (
                <FaRegArrowAltCircleDown color="red" />
            ) : (
                <FaRegArrowAltCircleUp color="green"/>
            )}
        </td>
        <td>
            <FaTrash onClick={() => onDelete(item.id)} cursor= "pointer"/>
        </td>
    </tr>
    )
}

export default GridItem
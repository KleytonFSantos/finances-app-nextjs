import { MdAttachMoney } from 'react-icons/md';
import Modal from './modal';

export const Header = () => {
    return (
            <div className="w-full h-56 bg-purple-500 font-poppins font-semibold">
                <>
                   <div  className="p-10 flex flex-row gap-2">
                        <MdAttachMoney className="text-white rounded-full p-1 bg-green-500 text-2xl" />
                        <h1 className="text-white text-base">App Finances</h1>
                        <div className='ml-6'>
                            <Modal />
                        </div>
                   </div>
                </>
            </div>
    )
}
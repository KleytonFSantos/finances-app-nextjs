import React from 'react'

interface CardsProps {
    styles: string;
    title: string;
    Icon: any;
    value: string | number;
}

function cards({ title, value, Icon, styles }: CardsProps): JSX.Element {
  return (
            <div className="flex items-center justify-center">
                <div className="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
                    <div className="flex flex-col">
                        <div className='flex gap-8 items-center justify-center'>
                            <h2 className="font-bold text-gray-600 text-left">{title}</h2>
                            <span className={styles}>{Icon}</span>
                        </div>
                        <div className="my-6">
                            <div className="flex flex-row space-x-4 items-center">
                                
                                <div id="temp">
                                    <h4 className="text-4xl font-bold">{value}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default cards
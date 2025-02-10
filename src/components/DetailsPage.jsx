import Image from 'next/image'
import React from 'react'

const DetailsPage = ({ name, subName, mainRole, designation,detailedJob, img, children }) => {
    return (
        <div className='p-5'>

            <div className='flex flex-col md:flex-row flex-wrap gap-5 mb-5'>
                <div className='md:h-[350px] flex-1 max-w-[300px] rounded-3xl  bg-white relative flex flex-col justify-end overflow-hidden '>

                    <div className='h-[300px] bg-[#ff8c2c] rounded-3xl flex flex-col justify-end'>

                        <div className='h-[250px] bg-[#c7c3b8] '>
                            <div className='absolute top-0 -right-20  flex'>


                                <img src={img} className='min-h-[350px] object-cover' />
                            </div>
                            <Image src="/images/orange-icon.webp" alt="icon" width={40} height={35}  className='z-20 h-[35px] w-[40px] absolute left-5 bottom-10' />
                        </div>

                    </div>
                </div>

                <div className='flex-1 flex items-center  md:p-5'>
                    <div className='text-primary flex flex-col gap-3 mt-2'>
                        <p className='font-bold text-3xl lg:text-4xl xl:text-5xl '>{name}, {subName} </p>
                        <p className='text-[#ff8c2c] text-2xl'>{mainRole && <b>{mainRole},</b>} {designation}</p>
                        <p className='text-xl md:text-2xl lg:text-3xl '>{detailedJob}</p>
                    </div>
                </div>
            </div>

            {children}
        </div>
    )
}

export default DetailsPage
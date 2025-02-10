import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MeetExpertBackground = ({route, name, subName, mainRole, designation,isApproved, children }) => {
    return (
        <Link href={`/about-us?details=${route}`} className='max-w-[500px] cursor-pointer'>
            <div className='md:h-[600px] min-w-full bg-white relative flex flex-col justify-end overflow-hidden '>

                <div className='h-[500px] bg-[#ff8c2c] rounded-t-3xl flex flex-col justify-end'>

                    <div className='h-[400px] bg-[#c7c3b8] rounded-t-3xl'>
                        <div className='absolute top-0 -right-20  flex'>

                            
                            {children}
                        </div>
                        <Image src="/images/orange-icon.webp" alt="icon" width={40} height={35}  className='z-20 h-[35px] w-[40px] absolute left-5 bottom-10' />
                    </div>

                </div>


            </div>
            <div className='text-primary text-right mt-2'>
                <p className='font-semibold text-2xl flex items-center justify-end gap-2'>{name}, {subName} {isApproved && <ApproveIcon/>}</p>
                {/* <p className='font-semibold text-2xl'></p> */}
                <p className='text-[#ff8c2c] text-lg'>{mainRole && <b>{mainRole},</b>} {designation}</p>
            </div>
        </Link>
    )
}

export default MeetExpertBackground




const ApproveIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
  )
}

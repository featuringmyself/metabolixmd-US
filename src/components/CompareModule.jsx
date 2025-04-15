import React from 'react'

const CompareModule = ({ img1, img2, desc }) => {
    return (
        <div className='max-w-[1024px] m-auto mt-10'>
            <div className='flex flex-col sm:flex-row gap-5 items-center justify-center'>
                
                {/* Before Image */}
                <div 
                    style={{ backgroundImage: `url(${img1})` }}
                    className='h-[300px] sm:h-[500px] w-[300px] sm:w-[400px] rounded-3xl relative bg-cover bg-no-repeat'
                    role="img" 
                    aria-label="Before Image"
                >
                    <div className='text-white absolute -left-10 bottom-14 font-semibold text-lg sm:text-xl bg-primary rounded-xl max-w-fit text-center p-3 px-5 sm:p-5 sm:px-10'>
                        Before
                    </div>
                </div>

                {/* Divider Image */}
                <div
                    style={{ backgroundImage: `url(/images/27.webp)` }}
                    className='h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] rounded-3xl bg-contain bg-center bg-no-repeat'
                    role="img" 
                    aria-label="Divider Image"
                >
                </div>

                {/* After Image */}
                <div 
                    style={{ backgroundImage: `url(${img2})` }}
                    className='h-[300px] sm:h-[500px] w-[300px] sm:w-[400px] rounded-3xl relative bg-cover bg-no-repeat'
                    role="img" 
                    aria-label="After Image"
                >
                    <div className='text-white absolute -left-10 bottom-14 font-semibold text-lg sm:text-xl bg-orange-400 rounded-xl max-w-fit text-center p-3 px-5 sm:p-5 sm:px-10'>
                        After
                    </div>
                </div>

            </div>
            
            {/* Description */}
            <p className='text-center mt-5 text-sm sm:text-lg px-4'>
                {desc}
            </p>
        </div>
    )
}

export default CompareModule

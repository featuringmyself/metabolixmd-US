import React from 'react'

const LicensedProvider = ({onNext}) => {
    return (
        <div className="w-full p-5 md:p-0 md:max-w-fit mx-auto">
            <div className="w-full  md:w-[500px]">

                <h1 className='text-primary font-semibold text-3xl'>Thank you for reaching out to us.</h1>
                <p className='mt-5 text-lg font-normal'>
                    You are in good hands <br />
                    A licensed provider will assess your health history and will reach out to you with your weight loss treatment plan.
                </p>
              <div className='flex flex-wrap mt-5 justify-between gap-3'>
                <div style={{backgroundImage:`url(/images/dr1.png)`}} className='w-[150px] h-[150px] bg-cover bg-center bg-no-repeat bg-orange-400  rounded-lg overflow-hidden'></div>
                <div style={{backgroundImage:`url(/images/dr2.png)`}} className='w-[150px] h-[150px] bg-cover bg-center bg-no-repeat bg-orange-400  rounded-lg overflow-hidden'></div>
                <div style={{backgroundImage:`url(/images/dr3.png)`}} className='w-[150px] h-[150px] bg-cover bg-center bg-no-repeat bg-orange-400  rounded-lg overflow-hidden'></div>
              </div>

                <div onClick={()=>onNext({},"checkout")} className='mt-6 p-3 text-white w-full text-center py-3 font-semibold rounded-full bg-primary hover:bg-primary'>Continue</div>
            </div>
        </div>
    )
}

export default LicensedProvider
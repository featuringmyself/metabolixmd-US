import Link from 'next/link'
import React from 'react'
import FloatingButton from './FloatingButton'
import { usePathname } from 'next/navigation'

const Footer = () => {
    const pathname = usePathname();
    return (
        <div className='mt-auto' >
            <FloatingButton />
            <section id="bottom-footer" className=' bg-black p-5 py-20 flex items-center '>
                <div className='flex w-full flex-col   gap-10'>
                    <div className=' text-white flex md:flex-row flex-col justify-between'>
                        <div className='flex flex-col justify-center items-center'>
                            <img src="/images/logo-white.webp" className='w-96' />

                            <div className="mt-6 mx-2">

                                <div className="flex  items-center  gap-2">

                                    <p className="text-white f-700"><b>Follow us</b></p>
                                    <Link href="https://www.facebook.com" target='_blank'>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_1043_265)">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M11.9633 0.929199C14.1267 0.953887 16.0811 1.48559 17.8266 2.52432C19.5513 3.54231 20.9859 4.98574 21.9934 6.71657C23.0258 8.47255 23.5543 10.4388 23.5789 12.6155C23.5176 15.5936 22.5783 18.1372 20.7609 20.2463C18.9436 22.3554 16.616 23.6602 14.2065 24.1604V15.8107H16.4845L16.9997 12.5294H13.5503V10.3803C13.5311 9.93475 13.672 9.49707 13.9475 9.14638C14.2233 8.79473 14.7091 8.60991 15.4048 8.59191H17.4878V5.71761C17.4579 5.70799 17.1743 5.66997 16.637 5.60353C16.0276 5.53224 15.4149 5.49415 14.8014 5.48946C13.4128 5.49586 12.3147 5.88754 11.5069 6.66449C10.6992 7.44122 10.2865 8.56499 10.269 10.0358V12.5294H7.64404V15.8107H10.269V24.1604C7.31053 23.6602 4.98295 22.3554 3.1656 20.2463C1.34826 18.1372 0.408978 15.5936 0.347656 12.6155C0.372191 10.4387 0.900684 8.47245 1.93314 6.71657C2.94061 4.98574 4.37527 3.54232 6.09994 2.52432C7.84535 1.48579 9.7998 0.954087 11.9633 0.929199Z"
                                                    fill="white"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1043_265">
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                        transform="translate(0 0.56543)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </Link>

                                    {/* <Link target='_blank' href="https://www.linkedin.com">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="25"
                                        viewBox="0 0 24 25"
                                        fill="none"
                                    >
                                        <g clipPath="url(#clip0_1043_271)">
                                            <path
                                                d="M12 0.56543C5.3736 0.56543 0 5.93903 0 12.5654C0 19.1918 5.3736 24.5654 12 24.5654C18.6264 24.5654 24 19.1918 24 12.5654C24 5.93903 18.6264 0.56543 12 0.56543ZM8.51294 18.7061H5.59039V9.91351H8.51294V18.7061ZM7.05176 8.71289H7.03271C6.052 8.71289 5.41772 8.03778 5.41772 7.19403C5.41772 6.33124 6.07141 5.6748 7.07117 5.6748C8.07092 5.6748 8.68616 6.33124 8.7052 7.19403C8.7052 8.03778 8.07092 8.71289 7.05176 8.71289ZM19.051 18.7061H16.1288V14.0023C16.1288 12.8201 15.7057 12.0139 14.6483 12.0139C13.8409 12.0139 13.3601 12.5577 13.1488 13.0827C13.0715 13.2706 13.0527 13.5331 13.0527 13.7959V18.7061H10.1303C10.1303 18.7061 10.1686 10.7384 10.1303 9.91351H13.0527V11.1584C13.441 10.5593 14.1359 9.70715 15.6865 9.70715C17.6093 9.70715 19.051 10.9638 19.051 13.6644V18.7061Z"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1043_271">
                                                <rect
                                                    width="24"
                                                    height="24"
                                                    fill="white"
                                                    transform="translate(0 0.56543)"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Link> */}
                                    <Link target='_blank' href="https://www.instagram.com/metabolixmd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                        >
                                            <g clipPath="url(#clip0_1043_273)">
                                                <path
                                                    d="M12 15.0264C13.3591 15.0264 14.4609 13.9246 14.4609 12.5654C14.4609 11.2063 13.3591 10.1045 12 10.1045C10.6409 10.1045 9.53906 11.2063 9.53906 12.5654C9.53906 13.9246 10.6409 15.0264 12 15.0264Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M12 0.84668C5.52792 0.84668 0.28125 6.09335 0.28125 12.5654C0.28125 19.0375 5.52792 24.2842 12 24.2842C18.4721 24.2842 23.7188 19.0375 23.7188 12.5654C23.7188 6.09335 18.4721 0.84668 12 0.84668ZM19.2402 15.5439C19.184 16.658 18.8709 17.7566 18.059 18.5599C17.2392 19.3709 16.1353 19.673 15.0105 19.7287H8.98959C7.86459 19.673 6.76087 19.3711 5.94108 18.5599C5.12911 17.7566 4.81608 16.658 4.75983 15.5439V9.58699C4.81608 8.47287 5.12916 7.37421 5.94108 6.57087C6.76087 5.75993 7.86473 5.45777 8.98959 5.40213H15.0104C16.1354 5.45777 17.2391 5.75979 18.0589 6.57087C18.8709 7.37421 19.1839 8.47287 19.2402 9.58699L19.2402 15.5439Z"
                                                    fill="white"
                                                />
                                                <path
                                                    d="M14.9357 6.75941C13.4692 6.71919 10.5339 6.71919 9.06734 6.75941C8.30417 6.78037 7.439 6.97035 6.89525 7.55113C6.33021 8.15483 6.1167 8.88421 6.09504 9.70016C6.05698 11.1323 6.09504 15.4307 6.09504 15.4307C6.11984 16.2466 6.33021 16.9761 6.89525 17.5798C7.439 18.1607 8.30417 18.3505 9.06734 18.3715C10.5339 18.4117 13.4692 18.4117 14.9357 18.3715C15.6989 18.3505 16.5641 18.1605 17.1078 17.5798C17.6728 16.9761 17.8864 16.2467 17.908 15.4307V9.70016C17.8864 8.88421 17.6728 8.15483 17.1078 7.55113C16.5639 6.97016 15.6987 6.78037 14.9357 6.75941ZM12.0013 16.3799C11.2469 16.3799 10.5094 16.1562 9.88214 15.737C9.25486 15.3179 8.76595 14.7222 8.47724 14.0252C8.18854 13.3282 8.113 12.5612 8.26018 11.8213C8.40736 11.0813 8.77065 10.4017 9.30411 9.86822C9.83757 9.33476 10.5172 8.97147 11.2572 8.82428C11.9971 8.6771 12.7641 8.75264 13.4611 9.04135C14.1581 9.33006 14.7538 9.81896 15.1729 10.4462C15.5921 11.0735 15.8158 11.811 15.8158 12.5654C15.8158 13.5771 15.4139 14.5473 14.6986 15.2627C13.9832 15.978 13.013 16.3799 12.0013 16.3799ZM15.832 9.53835C15.6811 9.53831 15.5337 9.49354 15.4082 9.40969C15.2828 9.32584 15.185 9.20668 15.1273 9.06728C15.0696 8.92787 15.0545 8.77449 15.084 8.62651C15.1134 8.47854 15.1861 8.34262 15.2928 8.23595C15.3995 8.12927 15.5355 8.05663 15.6834 8.02721C15.8314 7.99779 15.9848 8.01291 16.1242 8.07066C16.2636 8.1284 16.3827 8.22619 16.4665 8.35164C16.5504 8.47709 16.5951 8.62458 16.5951 8.77546C16.5951 8.87566 16.5753 8.97488 16.537 9.06745C16.4986 9.16002 16.4424 9.24413 16.3716 9.31497C16.3007 9.38581 16.2166 9.442 16.124 9.48033C16.0314 9.51866 15.9322 9.53837 15.832 9.53835Z"
                                                    fill="white"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1043_273">
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                        transform="translate(0 0.56543)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </Link>
                                    <Link className='bg-white rounded-full w-6 h-6 text-2xl flex items-center justify-center  text-black' target='_blank' href="https://x.com/metabolixmd?s=11">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                    </Link>
                                </div>  
                            </div>
                        </div>
                        <div className='gap-2 capitalize flex-col font-bold items-center justify-center text-2xl md:mt-0 mt-12 flex'>
                            <Link
                                href="/"
                                className={`cursor-pointer tracking-widest text-sm hover:font-bold hover:text-[#015c04] uppercase ${
                                pathname === "/" ? "font-bold text-primary text-lg" : ""
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about-us"
                                className={`cursor-pointer text-sm tracking-widest hover:font-bold hover:text-[#015c04] uppercase ${
                                pathname === "/about-us" ? "font-bold text-primary text-lg" : ""
                                }`}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact-us"
                                className="cursor-pointer text-sm tracking-widest hover:font-bold hover:text-[#015c04] uppercase"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/privacy-policy"
                                className="cursor-pointer text-sm tracking-widest hover:font-bold hover:text-[#015c04] uppercase"
                            >
                                Privacy Policy
                            </Link>
                            </div>

                        <div className='flex flex-col items-center justify-center gap-2'>
                            <p className='mt-1 mx-2 '>
                                <Link href="/privacy-policy" className='font-semibold hover:text-[#015c04]'>
                                    Privacy Policy
                                </Link>
                            </p>
                            <p className='md:mt-1 mt-0 mx-2 '>
                                <Link href="/refund-policy" className='font-semibold hover:text-[#015c04]'>
                                Refund Policy
                                </Link>
                            </p>
                            <p className='mt-5 md:mt-1 mx-2'>
                                <Link href="mailto:consultant@metabolixmd.com"><b> Email:</b> consultant@metabolixmd.com</Link>
                            </p>
                        </div>
                       
                    </div>
                    <p className="text-sm text-gray-500 mt-auto text-center">&copy; {new Date().getFullYear()} MetabolixMD. All rights reserved.</p>
                </div>
                
            </section>
        </div>
    )
}

export default Footer
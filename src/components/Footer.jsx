import Link from 'next/link'
import React from 'react'
import FloatingButton from './FloatingButton'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Footer = () => {
    const pathname = usePathname();
    return (
        <div className='mt-auto'>
            <FloatingButton />
            <section id="bottom-footer" className='bg-primary py-10 w-full px-10'>
                <div className='w-full px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
                        {/* Logo Column */}
                        <div className='flex flex-col items-center md:items-start'>
                            <Link href="/" className="cursor-pointer">
                                <Image 
                                        src="/images/footer-logo.webp" 
                                        alt="MetabolixMD Logo" 
                                        width={200} 
                                        height={40} 
                                        className="w-[200px] h-auto"
                                    />
                            </Link>
                        </div>

                        {/* Address & Contact Column */}
                        <div className='text-white text-center md:text-left'>
                            <h3 className='font-semibold text-lg mb-3'>Address:</h3>
                            <p className='mb-4'>Level 1, 12 Sample St, Sydney NSW 2000</p>
                            
                            <h3 className='font-semibold text-lg mb-3'>Contact:</h3>
                            <p className='mb-2'>1800 123 4567</p>
                            <Link href="mailto:info@metabolixmd.com" className='text-white hover:text-tertiary transition-colors'>
                                info@metabolixmd.com
                            </Link>
                        </div>

                        {/* Navigation Column */}
                        <div className='text-white flex flex-col items-center md:items-end'>
                            <Link
                                href="/"
                                className={`mb-3 text-sm tracking-widest hover:text-tertiary transition-colors uppercase ${
                                pathname === "/" ? "text-[#ff8c2c]" : ""
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/how-it-works"
                                className={`mb-3 text-sm tracking-widest hover:text-tertiary transition-colors uppercase ${
                                pathname === "/how-it-works" ? "text-[#ff8c2c]" : ""
                                }`}
                            >
                                How It Works
                            </Link>
                            <Link
                                href="/glp-1-information"
                                className={`mb-3 text-sm tracking-widest hover:text-tertiary transition-colors uppercase ${
                                pathname === "/glp-1-information" ? "text-[#ff8c2c]" : ""
                                }`}
                            >
                                GLP-1 Information
                            </Link>
                            <Link
                                href="/pricing"
                                className={`mb-3 text-sm tracking-widest hover:text-tertiary transition-colors uppercase ${
                                pathname === "/pricing" ? "text-[#ff8c2c]" : ""
                                }`}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/contact-us"
                                className={`mb-3 text-sm tracking-widest hover:text-tertiary transition-colors uppercase ${
                                pathname === "/contact-us" ? "text-[#ff8c2c]" : ""
                                }`}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className='flex justify-center gap-6 mb-8'>
                        <Link href="https://www.facebook.com" target='_blank' className='text-white hover:text-tertiary transition-colors'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12C0 17.988 4.388 22.925 10.125 23.817V15.75H7.078V12.25H10.125V9.562C10.125 6.5 11.917 4.906 14.658 4.906C15.97 4.906 17.344 5.117 17.344 5.117V8.062H15.83C14.34 8.062 13.875 8.988 13.875 9.937V12.25H17.203L16.67 15.75H13.875V23.817C19.612 22.925 24 17.988 24 12C24 5.37 18.63 0 12 0Z" />
                            </svg>
                        </Link>
                        <Link href="https://www.instagram.com/metabolixmd" target='_blank' className='text-white hover:text-tertiary transition-colors'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C18.02 2.286 18.855 2.491 19.577 2.798C20.324 3.113 20.937 3.536 21.55 4.149C22.149 4.747 22.573 5.373 22.888 6.12C23.195 6.842 23.4 7.677 23.453 8.847C23.511 10.113 23.523 10.493 23.523 13.697C23.523 16.901 23.511 17.281 23.453 18.547C23.4 19.717 23.195 20.552 22.888 21.274C22.573 22.021 22.149 22.647 21.55 23.245C20.937 23.858 20.324 24.282 19.577 24.597C18.855 24.904 18.02 25.109 16.85 25.162C15.584 25.22 15.204 25.232 12 25.232C8.796 25.232 8.416 25.22 7.15 25.162C5.98 25.109 5.145 24.904 4.423 24.597C3.676 24.282 3.05 23.858 2.45 23.245C1.851 22.647 1.427 22.021 1.112 21.274C0.805 20.552 0.6 19.717 0.547 18.547C0.489 17.281 0.477 16.901 0.477 13.697C0.477 10.493 0.489 10.113 0.547 8.847C0.6 7.677 0.805 6.842 1.112 6.12C1.427 5.373 1.851 4.747 2.45 4.149C3.05 3.536 3.676 3.113 4.423 2.798C5.145 2.491 5.98 2.286 7.15 2.233C8.416 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C5.775 0.13 4.904 0.333 4.14 0.63C3.351 0.936 2.681 1.347 2.014 2.014C1.347 2.681 0.935 3.35 0.63 4.14C0.333 4.904 0.13 5.775 0.072 7.053C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.667 0.072 16.947C0.13 18.225 0.333 19.096 0.63 19.86C0.935 20.65 1.347 21.319 2.014 21.986C2.681 22.653 3.351 23.065 4.14 23.37C4.904 23.667 5.775 23.87 7.053 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.667 23.986 16.947 23.928C18.225 23.87 19.096 23.667 19.86 23.37C20.65 23.065 21.319 22.653 21.986 21.986C22.653 21.319 23.065 20.65 23.37 19.86C23.667 19.096 23.87 18.225 23.928 16.947C23.986 15.667 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.87 5.775 23.667 4.904 23.37 4.14C23.065 3.35 22.653 2.681 21.986 2.014C21.319 1.347 20.65 0.935 19.86 0.63C19.096 0.333 18.225 0.13 16.947 0.072C15.667 0.014 15.259 0 12 0Z" />
                                <path d="M12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.162 12 18.162C15.403 18.162 18.162 15.403 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16Z" />
                                <path d="M19.846 5.595C19.846 6.39 19.2 7.035 18.406 7.035C17.611 7.035 16.966 6.39 16.966 5.595C16.966 4.8 17.611 4.155 18.406 4.155C19.2 4.155 19.846 4.8 19.846 5.595Z" />
                            </svg>
                        </Link>
                        <Link href="https://x.com/metabolixmd" target='_blank' className='text-white hover:text-tertiary transition-colors'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                            </svg>
                        </Link>
                        <Link href="https://www.youtube.com" target='_blank' className='text-white hover:text-tertiary transition-colors'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </Link>
                    </div>

                    {/* Copyright and Policy Links */}
                    <div className='border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300'>
                        <p>&copy; {new Date().getFullYear()} MetabolixMD. All rights reserved.</p>
                        <div className='flex gap-4 mt-4 md:mt-0'>
                            <Link href="/privacy-policy" className='hover:text-white transition-colors'>Privacy Policy</Link>
                            <span>|</span>
                            <Link href="/terms-policy" className='hover:text-white transition-colors'>Terms of Service</Link>
                            <span>|</span>
                            <Link href="/hipaa-policy" className='hover:text-white transition-colors'>HIPAA Policy</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer
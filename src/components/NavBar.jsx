import { getAuthToken } from '@/services/API/apiHelper'
import { getUser } from '@/services/Auth/cookies'
import useFirebaseAuth from '@/services/Auth/useFirebaseAuth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import ScrollProgressBar from './ProgressBar'

const NavBar = () => {
  let user = getUser()
 

  const [isClient, setIsClient] = useState(false);
  const { logOut } = useFirebaseAuth()
  const router = useRouter()
  const [token, setToken] = useState("")

  const handleLogout = () => {
    logOut()
    router.push("/login")
  }

  const handleMobileMenuToggle = () => {
    document.getElementById("mobile-menu").classList.toggle("hidden")
  }

  useEffect(() => {
    setIsClient(true); // Ensures rendering only on client-side
    let token = getAuthToken()
    setToken(token)
  }, []);

  if (!isClient) {
    return null; // Prevents hydration error by not rendering on the server
  }

  return (
    <div className='flex flex-col'>
      <div className='p-5 z-50 shadow-lg top-0 left-0 bg-white w-full fixed flex items-center justify-between gap-10'>
        {/* Logo */}
        <Link href="/">
          <Image src="/images/logo.webp" width={200} height={50} quality={100} alt="Logo" className="w-[150px] md:w-[200px] " />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className='flex md:hidden'>
          <button
            id="mobile-menu-toggle"
            className="cursor-pointer focus:outline-none "
            onClick={handleMobileMenuToggle}
            aria-label='Menu Toggle'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
          </button>

        </div>
        <div className=' gap-5 capitalize text-lg hidden md:flex'>
          <Link href="/" className={`cursor-pointer    tracking-widest   text-sm hover:font-bold uppercase ${router.pathname == "/" ? "font-bold text-primary text-lg" : ''}`}>Home</Link>
          <Link href="/about-us" className={`cursor-pointer text-sm tracking-widest   hover:font-bold uppercase ${router.pathname == "/about-us" ? "font-bold text-primary text-lg" : ''}`}>About</Link>
          <Link href="/contact-us" className={`cursor-pointer text-sm tracking-widest   hover:font-bold uppercase `}>Contact Us</Link>
          <Link href="/privacy-policy" className={`cursor-pointer text-sm tracking-widest   hover:font-bold uppercase `}>Privacy Policy</Link>
          {
            user?.__t =="Admin" && <Link href="/admin/users" className={`cursor-pointer text-sm tracking-widest hidden lg:block   hover:font-bold uppercase `}>Admin</Link>
          }

          {/* <Link href="contact-us" className='cursor-pointer hover:text-primary hover:font-bold'>Contact</Link> */}
        </div>
        {/* Navigation Links - Hidden on Mobile */}
        <div className='hidden md:flex items-center gap-5'>


          {/* User Section */}
          {(token) ? (
            <div className="flex items-center gap-4">
              <Link href="/profile-details" className="flex items-center gap-2">
                <span className="text-white capitalize size-7 text-xs rounded-full bg-orange-500 flex items-center justify-center ">
                  {user?.email[0]}
                </span>
                {
                  user?.name ?
                    user.name
                    :
                    user?.email.split('@')[0]
                }
              </Link>
              
            </div>
          ) : (
            <Link
              href="/login"
              className='text-lg px-8 p-2 rounded-full font-semibold border w-fit cursor-pointer hover:border-orange-400 hover:text-orange-400'
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu (Hidden by Default) */}
        <div id="mobile-menu" className="fixed top-0 z-50 left-0 w-full h-full bg-gray-800 bg-opacity-75 hidden flex-col md:hidden ">
          <div className="flex flex-col items-center justify-center gap-5 text-white py-10">
            <div onClick={handleMobileMenuToggle} className='flex min-w-full px-5 justify-end text-white cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </div>
            <Link href="/" className='cursor-pointer hover:text-primary hover:font-bold'>Home</Link>
            {
              (token) &&
              <Link href="/profile-details" className='text-lg' onClick={handleMobileMenuToggle}>Profile</Link>
            }

            <Link href="/about-us" className='text-lg' onClick={handleMobileMenuToggle}>About</Link>

            <Link href="/contact-us" className='text-lg' onClick={handleMobileMenuToggle}>Contact</Link>
            {(token) ? (
              <button
                onClick={() => {
                  handleLogout()
                  handleMobileMenuToggle()
                }}
                className="text-lg text-red-500"
                aria-label='Logout'
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className='text-lg px-8 py-2 rounded-full font-semibold border'
                onClick={handleMobileMenuToggle}
              >
                Login
              </Link>
            )}
          </div>
        </div>


      </div>
      <ScrollProgressBar />
    </div>
  )
}

export default NavBar

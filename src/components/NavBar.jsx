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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { logOut } = useFirebaseAuth()
  const router = useRouter()
  const [token, setToken] = useState("")

  const handleLogout = () => {
    logOut()
    router.push("/login")
  }

  const handleMobileMenuToggle = () => {
    document.getElementById("mobile-menu").classList.toggle("hidden");
    // Prevent body scroll when menu is open
    document.body.style.overflow = document.getElementById("mobile-menu").classList.contains("hidden") ? "auto" : "hidden";
  }

  useEffect(() => {
    setIsClient(true);
    let token = getAuthToken()
    setToken(token)

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if scrolled past 50px to add transparency
      setIsScrolled(currentScrollY > 50);
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!isClient) {
    return null;
  }

  return (
    <div className='flex flex-col'>
      <div className={`p-3 z-50 shadow-lg top-0 left-0 w-full fixed flex items-center justify-between gap-10 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-sm' : 'bg-white'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Logo */}
        <Link href="/">
          <Image 
            src="/images/logo.webp" 
            width={200}
            height={50}
            alt="MetabolixMD Logo"
            className="w-[150px] md:w-[200px] h-auto"
            priority
          />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className='flex md:hidden'>
          <button
            id="mobile-menu-toggle"
            className="cursor-pointer focus:outline-none"
            onClick={handleMobileMenuToggle}
            aria-label='Menu Toggle'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className='gap-5 capitalize hidden md:flex'>
          <Link 
            href="/" 
            className={`cursor-pointer tracking-wider font-poppins hover:text-[#015c04] text-sm hover:font-semibold uppercase ${
              router.pathname == "/" ? "font-semibold text-primary text-base" : ''
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about-us" 
            className={`cursor-pointer text-sm font-poppins tracking-wider hover:text-[#015c04] hover:font-semibold uppercase ${
              router.pathname == "/about-us" ? "font-semibold text-primary text-base" : ''
            }`}
          >
            About
          </Link>
          <Link 
            href="/contact-us" 
            className='cursor-pointer text-sm font-poppins tracking-wider hover:text-[#015c04] hover:font-semibold uppercase'
          >
            Contact Us
          </Link>
          <Link 
            href="/privacy-policy" 
            className='cursor-pointer text-sm font-poppins tracking-wider hover:text-[#015c04] hover:font-semibold uppercase'
          >
            Privacy Policy
          </Link>
          {
            user?.__t =="Admin" && 
            <Link 
              href="/admin/users" 
              className='cursor-pointer text-sm font-poppins tracking-wider hidden lg:block hover:font-semibold uppercase'
            >
              Admin
            </Link>
          }
        </div>

        {/* Mobile Menu (Hidden by Default) */}
        <div id="mobile-menu" className="fixed top-0 z-50 left-0 w-full h-full bg-gray-800 bg-opacity-75 hidden flex-col md:hidden">
          <div className="flex flex-col items-center justify-center gap-5 text-white py-10">
            <div onClick={handleMobileMenuToggle} className='flex min-w-full px-5 justify-end text-white cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
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

        {/* User Section */}
        <div className='hidden md:flex items-center gap-5'>
          {(token) ? (
            <div className="flex items-center gap-4">
              <Link href="/profile-details" className="flex items-center gap-2 font-montserrat">
                <span className="text-white capitalize size-7 text-xs rounded-full bg-orange-500 flex items-center justify-center font-medium">
                  {user?.email[0]}
                </span>
                <span className="font-medium">
                  {user?.name ? user.name : user?.email.split('@')[0]}
                </span>
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className='text-lg px-8 p-2 rounded-full font-montserrat font-medium border w-fit cursor-pointer hover:border-orange-400 hover:text-orange-400 transition-colors'
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <ScrollProgressBar />
    </div>
  )
}

export default NavBar

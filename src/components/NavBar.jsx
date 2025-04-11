import { getAuthToken } from '@/services/API/apiHelper'
import { getUser } from '@/services/Auth/cookies'
import useFirebaseAuth from '@/services/Auth/useFirebaseAuth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import ScrollProgressBar from './ProgressBar'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


const NavBar = () => {
  let user = getUser()
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { logOut } = useFirebaseAuth()
  const router = useRouter()
  const [token, setToken] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);

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

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isClient) {
    return null;
  }

  return (
    <div className='flex flex-col'>
      <nav className={`fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-md border-b border-gray-200/20 transition-all duration-300 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <Image 
                src="/images/logo.webp" 
                alt="MetabolixMD Logo" 
                width={200} 
                height={50} 
                className="w-[150px] md:w-[200px] h-auto"
                priority
              />
            </Link>

            {/* Spacer to push navigation to right */}
            <div className="flex-grow"></div>

            {/* Navigation Links - Desktop - Now positioned to the right */}
            <div className="hidden md:flex items-center gap-8 relative z-10 mr-8">
              <Link 
                href="/about-us" 
                className={`cursor-pointer text-sm font-poppins tracking-wider hover:text-[#015c04] hover:font-semibold ${
                  router.pathname == "/about-us" ? "font-semibold text-primary text-base" : ''
                }`}
              >
                About Us
              </Link>
              <Link 
                href="/services" 
                className={`cursor-pointer text-sm font-poppins tracking-wider hover:text-[#015c04] hover:font-semibold ${
                  router.pathname == "/services" ? "font-semibold text-primary text-base" : ''
                }`}
              >
                Services
              </Link>
              <div className="relative">
                <button 
                  className="cursor-pointer text-sm font-poppins tracking-wider hover:text-[#015c04] hover:font-semibold flex items-center gap-1"
                  onClick={() => setResourcesDropdown(!resourcesDropdown)}
                >
                  Resources
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {resourcesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-20">
                    <Link href="/resources/blog" className="block px-4 py-2 text-sm hover:bg-gray-100">Blog</Link>
                    <Link href="/resources/faq" className="block px-4 py-2 text-sm hover:bg-gray-100">FAQ</Link>
                    <Link href="/resources/guides" className="block px-4 py-2 text-sm hover:bg-gray-100">Guides</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative z-10">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-primary hover:text-primary/80 transition-colors"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </motion.svg>
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Dark overlay backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 z-40"
                    onClick={() => setIsOpen(false)}
                    style={{ top: 0 }}
                  />

                  {/* Menu Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black !important z-50 mt-[72px]"
                  >
                    {/* Close Button */}
                    <motion.button
                      initial={{ opacity: 0, rotate: -45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 45 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setIsOpen(false)}
                      className="absolute top-4 right-4 text-primary p-2 hover:text-primary/80 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>

                    {/* Centered Navigation Links */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] gap-8 p-4 bg-black "
                    >
                      {/* Navigation Links */}
                      {[
                        { href: "/about-us", label: "About Us" },
                        { href: "/services", label: "Services" },
                        { href: "/resources", label: "Resources" }
                      ].map((link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`text-white text-2xl font-montserrat tracking-wider hover:text-primary transition-colors ${
                              router.pathname === link.href ? "text-primary font-bold" : ""
                            }`}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      ))}

                      {/* Logo below navigation */}
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8"
                      >
                        <Image 
                          src="/images/logo-white.webp" 
                          alt="MetabolixMD Logo" 
                          width={150} 
                          height={40}
                          className="h-auto"
                        />
                      </motion.div>

                      
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className='hidden md:flex items-center gap-4'>
            <SignedOut>
              <SignInButton 
                mode='modal' 
                afterSignInUrl={typeof window !== 'undefined' ? window.location.href : '/'}
                className='py-2 px-4 ring-1 text-sm ring-[#365e65] rounded-full' 
              />
              <SignUpButton 
                mode='modal' 
                afterSignUpUrl={typeof window !== 'undefined' ? window.location.href : '/'}
                className='py-2 px-4 text-sm bg-[#365e65] rounded-full text-white'
              >
                Get Started
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
          </div>
        </div>
      </nav>
      <ScrollProgressBar />
    </div>
  )
}

export default NavBar

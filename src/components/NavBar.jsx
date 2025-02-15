import { getAuthToken } from '@/services/API/apiHelper'
import { getUser } from '@/services/Auth/cookies'
import useFirebaseAuth from '@/services/Auth/useFirebaseAuth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import ScrollProgressBar from './ProgressBar'
import { motion, AnimatePresence } from 'framer-motion'

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/20">
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

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-8 relative z-10">
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
                      {/* Logo at the top */}
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                      >
                        <Image 
                          src="/images/logo-white.webp" 
                          alt="MetabolixMD Logo" 
                          width={150} 
                          height={40}
                          className="h-auto"
                        />
                      </motion.div>

                      {/* Navigation Links */}
                      {[
                        { href: "/", label: "Home" },
                        { href: "/about-us", label: "About" },
                        { href: "/contact-us", label: "Contact" }
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

                      {/* Login Button */}
                      {!token && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="mt-4"
                        >
                          <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors"
                          >
                            Login
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

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
        </div>
      </nav>
      <ScrollProgressBar />
    </div>
  )
}

export default NavBar

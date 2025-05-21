import { getAuthToken } from '@/services/API/apiHelper'
import { getUser } from '@/services/Auth/cookies'
import useFirebaseAuth from '@/services/Auth/useFirebaseAuth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
// import ScrollProgressBar from './ProgressBar'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthModalContext } from '@/contexts/AuthModalContext'
import { toast } from 'react-toastify'
// Firebase authentication is used instead of Clerk

const NavBar = () => {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null); // Initialize as null instead of calling getUser()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { logOut } = useFirebaseAuth()
  const router = useRouter()
  const [token, setToken] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { openSignIn, openSignUp } = useAuthModalContext();

  const getUserInitial = (name) => {
    return name && typeof name === 'string' ? name.charAt(0).toUpperCase() : 'U';
  };

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = "/";
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    }
  }

  const handleMobileMenuToggle = () => {
    document.getElementById("mobile-menu").classList.toggle("hidden");
    // Prevent body scroll when menu is open
    document.body.style.overflow = document.getElementById("mobile-menu").classList.contains("hidden") ? "auto" : "hidden";
  }

  useEffect(() => {
    setIsClient(true);
    const currentUser = getUser();
    setUser(currentUser);
    let token = getAuthToken()
    setToken(token);
  }, []);

  useEffect(() => {
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

  // Update user state when auth modal closes
  useEffect(() => {
    const updateUserState = () => {
      const currentUser = getUser();
      setUser(currentUser);
    };

    // Listen for auth state changes
    const handleAuthChange = () => {
      updateUserState();
    };

    window.addEventListener('storage', updateUserState);
    document.addEventListener('visibilitychange', updateUserState);
    window.addEventListener('auth-state-changed', handleAuthChange);

    // Initial check
    updateUserState();

    return () => {
      window.removeEventListener('storage', updateUserState);
      document.removeEventListener('visibilitychange', updateUserState);
      window.removeEventListener('auth-state-changed', handleAuthChange);
    };
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Don't render anything user-specific during SSR
  if (!isClient) {
    return (
      <div className='flex flex-col'>
        <nav className={`fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-md border-b border-gray-200/20 transition-all duration-300`}>
          <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4">
            <div className="flex items-center justify-between relative">
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
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      <nav className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-3xl border-b border-gray-200/20 transition-all duration-300 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'shadow-md' : ''}`}>
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
              {user?.__t === "Admin" && (
                <Link 
                  href="/admin" 
                  className={`cursor-pointer text-sm font-poppins tracking-wider text-red-500 font-bold hover:text-red-700 hover:font-bold ${
                    router.pathname.startsWith("/admin") ? "font-semibold underline underline-offset-8" : ''
                  }`}
                >
                  Admin
                </Link>
              )}
              <Link 
                href="/" 
                className={`cursor-pointer text-base font-poppins tracking-wider hover:text-[#015c04] hover:font-semibold relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#015c04] after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                  router.pathname == "/" ? "font-semibold text-primary text-base after:scale-x-100 underline underline-offset-8" : ''
                }`}
              >
                Home
              </Link>
              <Link 
                href="/about-us" 
                className={`cursor-pointer text-base font-poppins tracking-wider hover:text-[#015c04] hover:font-semibold relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#015c04] after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                  router.pathname == "/about-us" ? "font-semibold text-primary text-base after:scale-x-100 underline underline-offset-8" : ''
                }`}
              >
                About Us
              </Link>
              <Link 
                href={"/contact-us" }
                className={`cursor-pointer text-base font-poppins tracking-wider hover:text-[#015c04] hover:font-semibold relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#015c04] after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                  router.pathname == "/contact-us" ? "font-semibold text-primary text-base after:scale-x-100 underline underline-offset-8" : ''
                }`}
              >
                Contact
              </Link>
              <Link 
                href="/#faq" 
                className={`cursor-pointer text-base font-poppins tracking-wider hover:text-[#015c04] hover:font-semibold relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-[#015c04] after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                  router.pathname == "/#faq" ? "font-semibold text-primary text-base after:scale-x-100" : ''
                }`}
              >
                FAQ
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative z-10 flex items-center gap-3">
              {!user && (
                <Link
                  href="/get-started"
                  className="text-sm font-medium  bg-white text-black px-3 py-1.5 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </Link>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-primary hover:text-primary/80 transition-colors"
              >
                <motion.div
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                  className="w-6 h-6 relative"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 8 }
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute w-6 h-0.5 bg-current block"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute w-6 h-0.5 bg-current block top-2"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -8 }
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute w-6 h-0.5 bg-current block top-4"
                  />
                </motion.div>
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
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                    style={{ top: 0 }}
                  />

                  {/* Menu Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0  !important z-50 mt-[72px]"
                  >
                    {/* Close Button */}
                    {/* <motion.button
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
                    </motion.button> */}

                    {/* Centered Navigation Links */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] gap-8 p-4 bg-[#365D56] "
                    >
                      {/* Navigation Links */}
                      {[
                        { href: "/", label: "Home" },
                        { href: "/about-us", label: "About Us" },
                        { href: "/contact", label: "Contact" },
                        { href: "/#faq", label: "FAQ" },
                        ...(user?.__t === "Admin" ? [{ href: "/admin/users", label: "Admin" }] : [])
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

                      {/* Logo below navigation
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
                      </motion.div> */}

                      {/* Authentication Buttons */}
                      <div className="mt-2 flex flex-col items-center gap-4">
                        {!user ? (
                          <>
                            <button 
                              onClick={() => {
                                openSignIn();
                                setIsOpen(false);
                              }}
                              className='w-full py-1 text-white px-4 text-lg'
                            >
                              Sign In
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full gap-4">
                            <div className="flex items-center gap-2 text-primary font-medium">
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white font-medium">
                                {getUserInitial(user?.name)}
                              </div>
                              <span className='text-white'>{user?.name || 'User'}</span>
                            </div>
                            <div className="flex flex-col w-full gap-2 mt-2">
                              <Link 
                                href="/profile-details" 
                                className="flex items-center gap-2 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profile & Orders
                              </Link>
                              <button 
                                onClick={() => {
                                  handleLogout();
                                  setIsOpen(false);
                                }} 
                                className="flex items-center gap-2 text-red-500 font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Sign Out
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className='hidden md:flex items-center gap-4'>
              {!user ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={openSignIn}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors ring-1 ring-[#365e65] px-4 py-2 rounded-full"
                  >
                    Sign In
                  </button>
                  <Link
                    href="/get-started"
                    className="text-base font-medium bg-primary text-white px-4 py-2   rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setProfileDropdown(!profileDropdown)} 
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium cursor-pointer">
                      {getUserInitial(user?.name)}
                    </div>
                  </button>
                  
                  {profileDropdown && (
                    <div 
                      className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-20"
                    >
                      <Link 
                        href="/profile-details" 
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile & Orders
                      </Link>
                      <button 
                        onClick={handleLogout} 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* <ScrollProgressBar /> */}
    </div>
  )
}

export default NavBar

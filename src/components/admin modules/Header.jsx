import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminNavBar = ({ title }) => {
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.notification-wrapper') && !e.target.closest('.bell-icon')) {
                setShowNotifications(false);
            }
        };
        if (showNotifications) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showNotifications]);

    return (
        <header className="bg-white/95 backdrop-blur-sm shadow-lg py-5 px-6 w-full flex items-center justify-between sticky top-0 z-40 border-b border-gray-100/80">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent capitalize tracking-tight">{title}</h1>
                <div className="h-6 w-[1px] bg-gray-300/70 mx-6"></div>
                <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                    {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Link 
                    href="/" 
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-200 rounded-md hover:bg-gray-50/80 border border-transparent hover:border-gray-200/80 hover:shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Website</span>
                </Link>

                <div className="h-6 w-[1px] bg-gray-300/70"></div>

                <motion.button 
                    className="bell-icon relative p-2 text-gray-600 hover:text-primary transition-all duration-200 rounded-full hover:bg-gray-100/80 hover:shadow-sm"
                    onClick={() => setShowNotifications(!showNotifications)}
                    aria-label="Notifications"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-sm shadow-red-500/30 animate-pulse"></span>
                </motion.button>

                <AnimatePresence>
                    {showNotifications && (
                    <motion.div 
                        className="notification-wrapper absolute right-6 top-16 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200/80 z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-4 border-b border-gray-200/80 flex items-center justify-between">
                            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                Notifications
                            </h2>
                            <span className="text-xs font-medium text-primary px-2 py-1 bg-primary/10 rounded-full shadow-sm shadow-primary/5">0 new</span>
                        </div>
                        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50/50">
                            <div className="p-6 text-sm text-gray-600 flex items-center justify-center h-28">
                                <span className="flex flex-col items-center gap-3 text-center">
                                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p>No new notifications</p>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default AdminNavBar;



import Link from 'next/link';
import { useEffect, useState } from 'react';

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
        <header className="bg-white shadow-xl py-4 w-full flex items-center justify-between px-5">
            <h1 className="font-bold text-2xl text-primary capitalize">{title}</h1>
            <span className="flex gap-4 items-center relative">

                <Link href="/" className='font-medium text-lg flex items-center gap-2'>
                    <span className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg>
                    </span>
                    Back to Website
                </Link>
            </span>
        </header>
    );
};

export default AdminNavBar;

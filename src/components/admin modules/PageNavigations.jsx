import { usePathname } from 'next/navigation';
import { mainRoutes } from '@/constants/paths';
import useFirebaseAuth from '@/services/Auth/useFirebaseAuth';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';


const PageNavigations = () => {
    const pathname = usePathname();
    const isActive = (route) => pathname.startsWith(route);
    const { logOut } = useFirebaseAuth()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logOut();
            window.location.href = "/";
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout. Please try again.');
        }
    }

    return (
        <>
            <nav className={`flex-grow overflow-y-auto pt-3 pb-3  custom-scrollbar`}>
                <ul className='flex flex-col gap-5'>
                    {mainRoutes.map((route) => (
                        <li key={route.path}>
                            <a
                                href={route.path}
                                className={`block border text-primary min-w-40  py-4 px-5 rounded-r-full hover:bg-liteBlue  hover:font-medium ${isActive(route.path) ? 'bg-primary text-white font-medium hover:bg-primary': "" }`
                                    
                                }
                            >
                                {route.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-6 pt-1">
                <button
                    onClick={() => handleLogout()}
                    className={`w-full block text-sm py-3 px-5 rounded-full  bg-primary  font-medium text-white`}
                    aria-label='Logout'
                >
                    Logout
                </button>
            </div>
        </>
    )
}

export default PageNavigations
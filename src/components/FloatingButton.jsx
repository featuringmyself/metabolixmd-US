import Link from 'next/link'; // Adjust based on your routing setup

const FloatingButton = () => {
    return (
        <Link 
            href="https://oneai.com/~metabolixmd" 
            target="_blank" 
            className="bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary cursor-pointer rounded-full fixed bottom-10 z-30 right-10 w-[50px] h-[50px] transition-transform duration-300 transform hover:scale-110 hover:shadow-lg"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
        </Link>
    );
};

export default FloatingButton;

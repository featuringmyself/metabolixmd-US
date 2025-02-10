import React, { useEffect, useState } from 'react';

const ScrollProgressBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressHeight = window.scrollY;
        const progress = (progressHeight / totalHeight) * 100;
        setScrollProgress(progress);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className="fixed z-50 top-0 left-0 h-[5px] rounded-r-full transition-all duration-200"
            style={{
                width: `${scrollProgress}%`,
                background: 'linear-gradient(to right,#2cbc9f, #365d56)', // Change colors as needed
            }}
        />
    );
};

export default ScrollProgressBar;

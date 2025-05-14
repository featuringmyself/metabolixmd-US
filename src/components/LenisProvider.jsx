import React from 'react'
import ScrollToTop from './ScrollToTop'

export default function LenisProvider({ children }) {
    return (
        <>
            {children}
            <ScrollToTop />
        </>
    )
}
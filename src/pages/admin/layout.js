// /admin/layout.js

import PageNavigations from "@/components/admin modules/PageNavigations";


import { getUser } from "@/services/Auth/cookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function AdminLayout({ children }) {
    const loggedinUserDetail = getUser()
    const router = useRouter()

    useEffect(() => {
        if (loggedinUserDetail) {
            if (loggedinUserDetail?.__t !== "Admin") {
                router.push("/")
            }
        }
        else {
            router.push("/login")
        }

    }, [])
    return (
        <div className="flex h-screen max-h-screen overflow-hidden">

            <aside className="bg-white hidden shadow-xl h-full z-10 lg:flex flex-col ">
                <div className="  pt-3 pb-3 px-5">
                    <img src="/images/logo.png" alt="Logo" className="w-[150px] md:w-[200px] " />
                </div>
                <PageNavigations />
            </aside>
            <div className="flex-1 hidden lg:block overflow-x-auto ">
                <main className="max-h-screen h-screen bg-[#d3d2cc]">
                    {children}
                </main>
            </div>
            <div className="flex-1 lg:hidden h-screen flex justify-center items-center  overflow-x-auto ">
                <h1 className="text-3xl capitalize">Switch to bigger screen for admin features!</h1>
            </div>
        </div>
    );
}

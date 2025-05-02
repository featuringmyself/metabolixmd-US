// /admin/layout.js
import PageNavigations from "@/components/admin modules/PageNavigations";
import { getUser } from "@/services/Auth/cookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        const currentUser = getUser();
        setUser(currentUser);

        if (currentUser) {
            if (currentUser.__t !== "Admin") {
                router.push("/");
            }
        } else {
            router.push("/login");
        }
    }, []);

    // Don't render anything during SSR
    if (!isClient) {
        return null;
    }

    // Don't render for non-admin users
    if (!user || user.__t !== "Admin") {
        return null;
    }

    return (
        <div className="flex h-screen max-h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <aside className="bg-white w-64 hidden shadow-lg h-full z-10 lg:flex flex-col border-r border-gray-200">
                <div className="py-6 px-5 border-b border-gray-100">
                    <img src="/images/logo.webp" alt="Logo" className="w-[150px] md:w-[180px] mx-auto" />
                </div>
                <PageNavigations />
            </aside>

            {/* Main Content */}
            <div className="flex-1 hidden lg:block overflow-x-auto">
                <main className="bg-gray-50 relative">
                    {children}
                </main>
            </div>

            {/* Mobile View */}
            <div className="flex-1 lg:hidden overflow-x-auto">
                <main className="bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}

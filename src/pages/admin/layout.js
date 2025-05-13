// /admin/layout.js
import PageNavigations from "@/components/admin modules/PageNavigations";
import { getUser } from "@/services/Auth/cookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function AdminLayout({ children }) {
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [router.pathname]);

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
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg bg-white shadow-lg hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Sidebar - Desktop */}
            <aside className="bg-white w-64 hidden shadow-lg h-full z-10 lg:flex flex-col border-r border-gray-200">
                <div className="py-6 px-5 border-b border-gray-100">
                    <img src="/images/logo.webp" alt="Logo" className="w-[150px] md:w-[180px] mx-auto" />
                </div>
                <PageNavigations />
            </aside>

            {/* Mobile Sidebar */}
            <aside
                className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Mobile Header */}
                <div className="sticky top-0 bg-white z-10 border-b border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <img src="/images/logo.webp" alt="Logo" className="w-[120px]" />
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
                            aria-label="Close menu"
                        >
                            <X size={28} />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="overflow-y-auto h-[calc(100vh-80px)] pb-safe">
                    <div className="px-4 py-2">
                        <PageNavigations />
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 w-full overflow-x-auto">
                <main className="bg-gray-50 relative p-4 lg:p-6 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="mt-16 lg:mt-0">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

import { usePathname } from "next/navigation";
import { mainRoutes } from "@/constants/paths";
import useFirebaseAuth from "@/services/Auth/useFirebaseAuth";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const PageNavigations = () => {
  const pathname = usePathname();
  const isActive = (route) => pathname.startsWith(route);
  const { logOut } = useFirebaseAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <>
      <nav className="flex-grow overflow-y-auto pt-6 pb-3 custom-scrollbar">
        <div className="px-3">
          <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Navigation
          </h2>
          <ul className="space-y-1">
            {mainRoutes.map((route) => (
              <li key={route.path}>
                <a
                  href={route.path}
                  className={`
                                        flex items-center px-4 py-3 text-sm rounded-lg transition-colors
                                        ${
                                          isActive(route.path)
                                            ? "bg-primary text-white font-medium shadow-md"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }
                                    `}
                >
                  <span className="flex-1">{route.label}</span>
                  {isActive(route.path) && (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="p-4 mt-auto border-t border-gray-20">
        <button
          onClick={handleLogout}
          className="
                        w-full flex items-center justify-center gap-2 px-4 py-3 
                        text-sm font-medium text-white bg-primary 
                        rounded-lg hover:bg-primary/90 transition-colors
                        focus:outline-none focus:ring-2 focus:ring-primary/20
                    "
          aria-label="Logout"
        >
          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 5.5V3C8 1.89543 8.89543 1 10 1H16C17.1046 1 18 1.89543 18 3V17C18 18.1046 17.1046 19 16 19H10C8.89543 19 8 18.1046 8 17V14.5"
              stroke="#ffffff"
              stroke-width="1.5"
              strokeLinecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1 10.1349L3.96985 7.16504M1 10.1349L3.96985 13.1047M1 10.1349H11.4698"
              stroke="#ffffff"
              stroke-width="1.5"
              strokeLinecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Logout
        </button>
      </div>
    </>
  );
};

export default PageNavigations;

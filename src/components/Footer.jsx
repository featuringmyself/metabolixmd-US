import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Footer = ({ paddingTop = "pt-0", address = true }) => {
  const pathname = usePathname();
  return (
    <div className="-mt-24 ">
      <section
        id="bottom-footer"
        className={`bg-[#223C37] ${paddingTop} pb-20 w-full`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Mobile and Desktop Layout */}
          <div className="flex justify-between md:flex-row flex-col gap-8 mb-12">
            {/* Logo Column with Address, Contact and Social Icons */}
            <div className="flex flex-col items-center md:items-start order-2 md:order-1">
              {/* SVG Logo */}
              <Link href="/" className="cursor-pointer mb-6 md:mb-10">
                <svg
                  width="190"
                  height="27"
                  viewBox="0 0 190 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M98.1885 9.25378C100.799 6.5586 105.092 5.1853 106.858 9.56973C107.01 9.94691 107.335 11.5333 107.645 11.5314C107.791 11.5306 109.088 9.55207 109.409 9.21336C114.347 3.99999 121.922 7.18657 120.69 14.683C119.932 19.3002 115.28 23.8039 110.456 21.7375C108.013 20.6908 107.173 18.7095 106.702 16.2345C106.498 16.1752 105.458 18.5156 105.237 18.8469C103.209 21.8922 99.4495 23.6776 96.4223 20.7803L95.5204 21.8419L92.7891 21.9848L95.3771 0.131279L99.1975 0.125L98.1889 9.25418L98.1885 9.25378ZM114.181 9.66825C110.23 10.091 109.101 20.8564 114.141 19.1173C116.983 18.1365 118.735 9.18078 114.181 9.66825ZM101.072 9.74439C98.4385 10.1275 96.8199 15.877 96.9255 18.0776C96.9745 19.1012 98.7034 19.3583 99.4817 19.2908C102.583 19.0223 103.868 13.6378 103.11 11.1978C102.788 10.1585 102.22 9.57719 101.072 9.74439Z"
                    fill="white"
                  />
                  <path
                    d="M146.77 22.0365L149.55 0.778365C150.457 0.759526 152.851 0.4424 153.514 0.984812C155.435 5.25661 156.625 9.91343 158.302 14.3155L158.58 14.5871L166.664 1.17517C166.855 0.962049 167.084 0.763451 167.377 0.710858C168.001 0.599 169.965 0.603318 170.667 0.620587C170.812 0.62412 170.958 0.650808 171.086 0.717138C170.913 2.97824 170.434 5.23463 170.158 7.49063C169.647 11.6729 169.365 16.024 168.731 20.1804C168.64 20.7813 168.587 21.4897 168.312 22.0361H164.977L166.238 8.42474L165.955 8.38588C165.602 8.87492 165.274 9.3824 164.944 9.88674C163.884 11.5101 160.247 18.4135 159.209 19.1341C158.545 19.5944 157.458 19.7448 156.798 19.2137C155.878 18.4735 153.48 10.1352 152.716 8.37018C152.663 8.24969 152.378 7.60876 152.303 7.60837L150.301 22.0361H146.77L146.77 22.0365Z"
                    fill="white"
                  />
                  <path
                    d="M55.9471 21.9396L52.6702 21.9593L54.3967 7.29411L54.0478 7.45424C52.3272 9.37977 48.3796 18.2939 46.6389 19.2645C43.6808 20.9141 43.0234 15.5924 42.3907 13.8407C41.822 12.2669 40.7528 8.83264 40.0515 7.55158C40.0044 7.46523 39.8792 7.26114 39.7614 7.29254L38.0141 21.9381L37.8061 22.1096L34.5469 21.9534L37.1522 0.882489C37.3559 0.651708 40.1158 0.638757 40.5468 0.704301C41.4931 0.848343 41.9252 2.67614 42.2341 3.48858C43.5819 7.03311 44.5156 10.819 46.016 14.296C46.0627 14.4047 46.1134 14.5955 46.2735 14.5876L54.3206 1.13878C55.197 0.314958 57.5131 0.856193 58.6756 0.703124C58.7828 0.834999 58.7843 0.963341 58.7855 1.12347C58.7985 2.65691 58.1257 5.27242 57.9303 6.94205C57.5657 10.0552 57.1995 13.1056 56.7642 16.207C56.4965 18.1157 56.5417 20.0887 55.9471 21.9393V21.9396Z"
                    fill="white"
                  />
                  <path
                    d="M76.4555 9.72936C76.1812 12.1227 75.5964 14.4788 75.5061 16.8969C75.4896 17.342 75.4103 18.6317 75.7243 18.9029C76.4712 19.5481 77.5753 18.5563 78.0192 18.7832L78.9505 20.7625C78.9764 21.3104 76.3491 22.2072 75.8554 22.2641C73.6339 22.5196 71.4486 21.1832 71.5004 18.7824L72.5279 9.9205L72.3984 9.73446L70.6428 9.60494C71.5534 13.6216 66.5826 14.9337 63.5977 15.5044C63.1727 15.5856 61.6914 15.5534 61.6177 15.9636C61.5584 16.294 61.8394 17.5076 61.996 17.855C62.6644 19.3385 64.2261 19.3939 65.6379 19.1113C66.5869 18.9213 68.3774 17.6834 69.1078 17.8047L70.2535 19.1804C70.2707 19.7809 68.231 20.9242 67.7145 21.186C59.165 25.5194 54.7786 15.8223 60.052 9.45148C62.6307 6.33634 68.1156 5.47287 70.5647 9.174C70.4273 6.98394 71.5863 7.51143 73.0817 6.84303C73.6579 6.02274 74.0523 3.19136 74.612 2.59165C74.979 2.19838 77.0144 2.11125 77.2417 2.4633L76.8782 6.90544C79.0734 7.17311 81.2281 6.50197 79.8517 9.63163L76.4559 9.72858L76.4555 9.72936ZM65.1308 9.43107C63.4427 9.66028 62.3072 11.5921 61.8716 13.0733L61.9662 13.2609C63.3728 13.0419 67.0057 12.6871 67.1894 10.8609C67.3248 9.51389 66.2348 9.28075 65.1308 9.43068V9.43107Z"
                    fill="white"
                  />
                  <path
                    d="M174.141 0.648106C175.398 0.411046 180.669 0.589626 182.128 0.703054C190.684 1.36753 191.947 12.0011 187.455 17.7949C183.316 23.1327 177.188 21.8387 171.211 21.9635C171.144 21.8717 171.164 20.5098 171.179 20.2747C171.449 15.9334 172.404 11.0619 172.971 6.69471C173.223 4.75584 173.311 2.78832 173.649 0.863187C173.734 0.713258 173.984 0.678328 174.141 0.648891V0.648106ZM177.589 3.93673C177.327 4.02582 177.196 5.08631 177.151 5.38186C176.634 8.76153 176.247 12.5525 175.897 15.9703C175.854 16.3914 175.494 18.7891 175.854 18.8845C178.335 18.9163 180.71 19.0792 182.818 17.5532C185.861 15.3498 186.672 9.37656 184.952 6.19351C183.377 3.27853 180.388 3.99128 177.589 3.93673H177.589Z"
                    fill="white"
                  />
                  <path
                    d="M28.6208 2.30694C33.2993 5.10652 33.8523 11.6229 30.3776 15.642C28.5278 17.7818 22.088 24.5251 19.9316 25.4368C16.7325 26.7897 13.3454 26.3281 10.6039 24.2303L10.7216 24.0725C15.276 25.0243 18.3409 22.1246 21.2787 19.2544C23.0107 17.5624 28.4226 12.2941 28.8532 10.3544C29.5067 7.4104 26.6058 4.42596 23.6701 4.78312C20.7343 5.14028 15.5778 12.4134 12.9584 14.3907C12.162 14.992 11.434 15.1934 10.5065 14.6615C10.2306 14.5034 7.1245 11.4652 6.88234 11.1284C5.33831 8.98191 7.73599 6.79107 9.85462 8.39358C10.3962 8.80333 11.1573 10.1287 11.8818 9.78572C16.2246 5.85421 19.4536 -0.445947 26.439 1.38892C27.1098 1.56514 28.0258 1.95056 28.6205 2.30654L28.6208 2.30694Z"
                    fill="white"
                  />
                  <path
                    d="M14.4934 3.40567C14.7313 3.62114 15.2623 3.96496 15.119 4.31388C14.9746 4.66593 12.9411 6.22998 12.6672 6.73511L12.4431 6.67231C9.02808 2.29258 1.95827 6.89328 4.74844 11.7726C5.25906 12.6655 9.03005 16.4385 9.92295 16.9538C11.8524 18.0681 13.5126 17.4444 15.1234 16.1983C16.8122 14.8917 22.4181 8.23558 23.552 7.9573C25.1902 7.5554 26.7303 9.0174 25.9771 10.6764C25.5654 11.5835 19.2566 17.7105 18.1003 18.7455C15.07 21.4584 11.1973 22.2626 7.53311 20.1447C6.53346 19.567 2.59802 15.7756 1.82012 14.7591C-4.44628 6.57419 6.87413 -3.49263 14.4934 3.40567Z"
                    fill="white"
                  />
                  <path
                    d="M87.5954 19.7628C86.0832 21.2072 84.3108 22.7378 82.0838 22.095C77.2319 20.6942 78.9223 12.9972 81.3989 10.0806C84.2201 6.75825 89.03 5.8728 92.9976 7.42469L91.1682 21.9599C90.9696 22.1664 88.6175 22.0345 88.2305 21.7562C87.7795 21.2036 87.5935 20.465 87.5954 19.7628ZM88.8526 9.41026C84.9678 9.16378 82.8197 12.6777 82.8849 16.1975C82.9547 19.9626 85.5922 19.7852 87.1661 17.0193C88.4562 14.7528 88.6057 11.9543 88.8522 9.41026H88.8526Z"
                    fill="white"
                  />
                  <path
                    d="M146.848 6.58823L141.518 13.9979L145.671 22.0364L144.804 21.9783L140.842 14.8163C140.525 14.7782 139.694 15.9478 139.721 16.2539L142.692 22.0788L141.635 21.8751L138.883 17.0205L135.024 21.7891C134.235 22.2892 132.065 21.9705 131.074 22.1153L137.26 13.9014L133.618 6.58391C133.708 6.47009 134.099 6.4854 134.235 6.5274C134.866 6.72128 137.18 12.3495 138.029 13.0933L139.126 11.6042L136.41 6.43163C138.578 6.48226 138.749 9.49143 139.912 10.8184C140.43 10.8926 142.374 6.98111 143.197 6.58588C144.063 6.16945 145.863 6.58352 146.849 6.58902L146.848 6.58823Z"
                    fill="white"
                  />
                  <path
                    d="M120.559 22.0368L123.168 0.294363L123.352 0.0156991L126.993 0L124.382 21.7405L124.208 22.0368H120.559Z"
                    fill="white"
                  />
                  <path
                    d="M126.129 22.0369L127.864 6.91101L131.666 6.89648L129.876 21.9373L129.7 22.0369H126.129Z"
                    fill="white"
                  />
                  <path
                    d="M130.23 4.87223C131.55 4.87223 132.62 3.80297 132.62 2.48397C132.62 1.16497 131.55 0.0957031 130.23 0.0957031C128.91 0.0957031 127.84 1.16497 127.84 2.48397C127.84 3.80297 128.91 4.87223 130.23 4.87223Z"
                    fill="white"
                  />
                </svg>
              </Link>

              {/* Address & Contact */}
              <div className="text-white md:text-left mb-4 md:mb-6">
                {address && (
                  <>     
                    <h3 className="font-light text-md mb-1">Address:</h3>
                    <p className="mb-6 md:mb-12 text-sm">
                      4414 82nd St, Suite 212, Lubbock, TX 79424
                    </p>
                  </>
                )}
                <h3 className="font-light text-md mb-2 md:mb-3">Contact:</h3>
                <p className="mb-2 text-sm">1-858-4MBLXMD</p>
                <Link
                  href="mailto:consultant@metabolixmd.com"
                  className="text-white hover:text-tertiary transition-colors underline"
                >
                  consultant@metabolixmd.com
                </Link>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center md:justify-start gap-4 md:gap-6 mb-4 md:mb-6">
                <Link
                  href="https://www.facebook.com/metabolixmd"
                  target="_blank"
                  className="text-white hover:text-tertiary transition-colors"
                >
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 12.5064C22 6.94982 17.5229 2.44531 12 2.44531C6.47715 2.44531 2 6.94982 2 12.5064C2 17.5281 5.65684 21.6905 10.4375 22.4453V15.4147H7.89844V12.5064H10.4375V10.2898C10.4375 7.76827 11.9305 6.37543 14.2146 6.37543C15.3088 6.37543 16.4531 6.57194 16.4531 6.57194V9.04792H15.1922C13.95 9.04792 13.5625 9.82353 13.5625 10.6192V12.5064H16.3359L15.8926 15.4147H13.5625V22.4453C18.3432 21.6905 22 17.5283 22 12.5064Z"
                      fill="white"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/metabolixmd"
                  target="_blank"
                  className="text-white hover:text-tertiary transition-colors"
                >
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 3.44531H8C5.23858 3.44531 3 5.68389 3 8.44531V16.4453C3 19.2067 5.23858 21.4453 8 21.4453H16C18.7614 21.4453 21 19.2067 21 16.4453V8.44531C21 5.68389 18.7614 3.44531 16 3.44531ZM19.25 16.4453C19.2445 18.2379 17.7926 19.6898 16 19.6953H8C6.20735 19.6898 4.75549 18.2379 4.75 16.4453V8.44531C4.75549 6.65266 6.20735 5.2008 8 5.19531H16C17.7926 5.2008 19.2445 6.65266 19.25 8.44531V16.4453ZM16.75 8.69531C17.3023 8.69531 17.75 8.24759 17.75 7.69531C17.75 7.14303 17.3023 6.69531 16.75 6.69531C16.1977 6.69531 15.75 7.14303 15.75 7.69531C15.75 8.24759 16.1977 8.69531 16.75 8.69531ZM12 7.94531C9.51472 7.94531 7.5 9.96003 7.5 12.4453C7.5 14.9306 9.51472 16.9453 12 16.9453C14.4853 16.9453 16.5 14.9306 16.5 12.4453C16.5027 11.251 16.0294 10.1049 15.1849 9.26039C14.3404 8.4159 13.1943 7.94265 12 7.94531ZM9.25 12.4453C9.25 13.9641 10.4812 15.1953 12 15.1953C13.5188 15.1953 14.75 13.9641 14.75 12.4453C14.75 10.9265 13.5188 9.69531 12 9.69531C10.4812 9.69531 9.25 10.9265 9.25 12.4453Z"
                      fill="white"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://x.com/metabolixmd"
                  target="_blank"
                  className="text-white hover:text-tertiary transition-colors"
                >
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.1761 4.44531H19.9362L13.9061 11.2227L21 20.4453H15.4456L11.0951 14.8519L6.11723 20.4453H3.35544L9.80517 13.1961L3 4.44531H8.69545L12.6279 9.55793L17.1761 4.44531ZM16.2073 18.8207H17.7368L7.86441 5.98459H6.2232L16.2073 18.8207Z"
                      fill="white"
                    />
                  </svg>
                </Link>
                {/* <Link
                  href="https://www.youtube.com"
                  target="_blank"
                  className="text-white hover:text-tertiary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </Link> */}
              </div>
            </div>

            {/* Navigation Column - Right column for desktop, top for mobile */}
            <div className="text-white flex flex-col items-center md:items-end h-full order-1 md:order-3">
              <div className="flex flex-col h-full justify-between md:justify-start md:space-y-6 md:mt-10 w-full px-4 md:px-0">
                <Link
                  href="/"
                  className={`text-sm tracking-widest hover:text-tertiary transition-colors uppercase mb-3 md:mb-0 ${
                    pathname === "/" ? "text-[#ff8c2c]" : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/about-us"
                  className={`text-sm tracking-widest hover:text-tertiary transition-colors uppercase mb-3 md:mb-0 ${
                    pathname === "/about-us" ? "text-[#ff8c2c]" : ""
                  }`}
                >
                  About Us
                </Link>

                <Link
                  href="/contact-us"
                  className={`text-sm tracking-widest hover:text-tertiary transition-colors uppercase mb-3 md:mb-0 ${
                    pathname === "/contact-us" ? "text-[#ff8c2c]" : ""
                  }`}
                >
                  Contact Us
                </Link>
                <Link
                  href="/safety-information"
                  className={`text-sm tracking-widest hover:text-tertiary transition-colors uppercase mb-3 md:mb-0 ${
                    pathname === "/safety-information" ? "text-[#ff8c2c]" : ""
                  }`}
                >
                  Safety Information
                </Link>

                <div className="flex items-center justify-center gap-2 my-6 md:my-12">
                  <div className="flex flex-col items-center justify-start">
                    <img src="/images/ATA logo_R_CMYK.png" alt="ATA Logo" className="md:w-16 md:h-16 w-8 h-8 object-contain" />
                    <p className="text-[10px] md:text-xs text-center mt-1 md:mt-2 text-zinc-300 max-w-[120px] md:max-w-[150px] leading-[0.9rem]">American Telemedicine Association</p>
                  </div>
                  <img src="/images/Quest-Diagnostics-RGB-gradient-removebg-preview.png" alt="Quest Diagnostics Logo" className="md:w-28 md:h-16 w-12 h-8 object-cover" />
                  <a
                    href="https://www.legitscript.com/websites/?checker_keywords=metabolixmd.com"
                    target="_blank"
                    title="Verify LegitScript Approval for www.metabolixmd.com"
                    className="flex items-center justify-center"
                  >
                    <img
                      src="https://static.legitscript.com/seals/38388756.png"
                      alt="Verify Approval for www.metabolixmd.com"
                      className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright and Policy Links */}
          <div className="border-t border-gray-700 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-300">
            <p className="mb-3 md:mb-0">
              &copy; {new Date().getFullYear()} MetabolixMD. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-2 md:mt-0 underline">
              <Link
                href={"/privacy-policy"}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/consumer-health-data-privacy"
                className="hover:text-white transition-colors"
              >
                Consumer Health Data Privacy
              </Link>
              <Link
                href="/terms-policy"
                className="hover:text-white transition-colors"
              >
                Terms Policy
              </Link>
              <Link
                href="/refund-policy"
                className="hover:text-white transition-colors"
              >
                Return & Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;

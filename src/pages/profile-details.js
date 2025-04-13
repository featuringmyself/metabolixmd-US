import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { getMethod, postMethod } from "@/services/API/ApiMethod";
import { toast } from "react-toastify";
import { getUser, setUser } from "@/services/Auth/cookies";
import useFirebaseAuth from "@/services/Auth/useFirebaseAuth";
import { useRouter } from "next/router";
import ProfileCheckOutForm from "@/components/profilecheckout";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

const ProfileDetails = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [userPres, setUserPres] = useState([])
  const [selectedPres, setselectedPres] = useState(null)
  const [isOpencheckout, setIsOpencheckout] = useState(false)
  const [isclient, setisclient] = useState(false)
  const [loading, setLoading] = useState({})
  let user = getUser()
  const router = useRouter()
  const { logOut } = useFirebaseAuth()
  const loggedinUserDetail =getUser()

  const getOrderDetails = async () => {
    try {
      const res = await getMethod("/order/user");
      if (res) {
        setUserOrders(res.data);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const getPresDetails = async () => {
    try {
      const res = await getMethod("/prescription/user");
      console.log(res)
      if (res?.data?.results) {
        setUserPres(res.data.results)
      } else {
        setUserPres([])
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleLogout = () => {
    logOut()
    router.push("/login")
  }

  useEffect(() => {
    getOrderDetails();
    getPresDetails()
    setisclient(true)

  }, []);

  const onSubmit = async (id) => {


    try {
      // Update loading state for this specific order ID
      setLoading(prev => ({ ...prev, [id]: true }));
      
      let res = await postMethod("/order/checkout/" + id);
      
      // Reset loading state for this order ID
      setLoading(prev => ({ ...prev, [id]: false }));
      
      if (res?.data?.url) window.open(res?.data?.url);
      toast.success(res.message);
    } catch (err) {
      // Reset loading state on error
      setLoading(prev => ({ ...prev, [id]: false }));
      toast.error(err.message);
    }
  };
  
  
  

  useEffect(() => {
      if (!loggedinUserDetail) {
        router.push("/login")
      }
    
  }, [])
  

  if (!isclient) {
    return <></>
  }

  return (
    <div className="flex flex-col min-h-screen mt-20">
      <Head><title>Profile Details - MetabolixMD</title></Head>
      <NavBar />
      <div className="w-full mx-auto mt-10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>

        <div className="flex items-center justify-between gap-5">
          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Name:</span> {user?.name}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
          </div>
          <div onClick={handleLogout}>
            <button

              className="text-lg border rounded-full py-2 px-5 text-red-500 font-semibold flex items-center gap-3 cursor-pointer"
              aria-label="Logout" 
            >
              <p>Logout</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg> 
            </button>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Order Details</h3>
        <ul className="space-y-2">
          {
            userOrders?.length<=0 &&
            <p className="text-zinc-400">No Order History</p>
          }
          {userOrders?.toReversed()?.map((order) => (
            <li key={order._id} className="p-4 bg-gray-100 rounded-lg">
              <div className="mb-2">
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="font-semibold text-gray-600">
                  Status:{" "}
                  <span
                    className={` capitalize ${order.status === "placed" || order.status === "scheduleMeet"
                      ? "text-green-500"
                      : "text-yellow-500"
                      }`}
                  >
                    {order.status === "scheduleMeet" ? "Meet Scheduled" : order.status}

                  </span>

                </p>
              </div>
              {order?.meetLink &&
                <div className="border rounded-xl p-2 w-fit">
                  <Link href={order?.meetLink} target='_blank' className='text-blue-600 font-semibold'>Join</Link>
                  <p className='text-xs'>Sch. Date: {new Date(order?.meetTime).toLocaleString()}</p>
                </div>
              }
              {
                order?.orderItems.length > 0 &&
                <div className="border rounded-xl p-2 ">
                  {
                    order?.orderItems?.[0]?.productImage &&
                    <div style={{ backgroundImage: `url(${order?.orderItems?.[0].productImage})` }} className="bg-cover bg-center bg-no-repeat h-[100px] w-[100px] rounded-lg">

                    </div>
                  }
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                    <p className='text-primary font-bold'>{order?.orderItems?.[0].productName}</p>
                    <p className='text-zinc-500 font-bold'>${order?.orderItems?.[0].totalPrice}</p>
                  </div>
                  {
                    order.status === "pending" &&

                    <div onClick={() => {
                      onSubmit(order._id)
                    }} className="bg-primary min-w-[150px] text-center w-fit text-white rounded-full px-5 py-2 text-sm cursor-pointer mt-2">
                      {
                        loading[order._id] ?
                          <ClipLoader size={12} color="white" />
                          :
                          "Checkout"
                      }
                    </div>
                  }
                </div>
              }
              <div className="text-gray-600">
                <p>
                  <span className="font-semibold">Address:</span> {order?.deliveryAddress?.street},{" "}
                  {order?.deliveryAddress?.city}, {order?.deliveryAddress?.state},{" "}
                  {order?.deliveryAddress?.country}, {order?.deliveryAddress?.postalCode}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {/* <h3 className="text-xl font-semibold mb-2 mt-5">Prescriptions Details</h3>
        <ul className="space-y-2">
          {userPres?.map((order) => (
            <li key={order._id} className="p-4 bg-gray-100 rounded-lg">
              <div className="mb-2">
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="font-semibold text-gray-600">
                  Status:{" "}
                  <span
                    className={` capitalize ${order.status === "approved"
                      ? "text-green-500"
                      : order.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                      }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
              

            </li>
          ))}
        </ul> */}
      </div>
      {isOpencheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-md">
            <div onClick={() => {
              setselectedPres(null)
              setIsOpencheckout(false)
            }} className="flex justify-end cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </div>
            <ProfileCheckOutForm prescription={selectedPres} />

          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProfileDetails;

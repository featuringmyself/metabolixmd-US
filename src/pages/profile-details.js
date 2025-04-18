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
import { motion } from "framer-motion";

const ProfileDetails = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [userPres, setUserPres] = useState([]);
  const [selectedPres, setselectedPres] = useState(null);
  const [isOpencheckout, setIsOpencheckout] = useState(false);
  const [isclient, setisclient] = useState(false);
  const [loading, setLoading] = useState({});
  let user = getUser();
  const router = useRouter();
  const { logOut } = useFirebaseAuth();
  const loggedinUserDetail = getUser();

  const getOrderDetails = async () => {
    try {
      const res = await getMethod("/v1/order/user");
      if (res) {
        setUserOrders(res.data);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const getPresDetails = async () => {
    try {
      const res = await getMethod("/v1/prescription/user");
      if (res?.data?.results) {
        setUserPres(res.data.results);
      } else {
        setUserPres([]);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = "/";
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  useEffect(() => {
    getOrderDetails();
    getPresDetails();
    setisclient(true);
  }, []);

  const onSubmit = async (id) => {
    try {
      setLoading(prev => ({ ...prev, [id]: true }));
      let res = await postMethod("/v1/order/checkout/" + id);
      setLoading(prev => ({ ...prev, [id]: false }));
      if (res?.data?.url) window.open(res?.data?.url);
      toast.success(res.message);
    } catch (err) {
      setLoading(prev => ({ ...prev, [id]: false }));
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (!loggedinUserDetail) {
      router.push("/login");
    }
  }, []);

  if (!isclient) {
    return <></>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Head>
        <title>Profile Details - MetabolixMD</title>
      </Head>
      <NavBar />
      
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-12 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-soft p-6 md:p-8"
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-montserrat font-bold text-primary">Profile Details</h1>
              <div className="space-y-1">
                <p className="text-gray-600 font-poppins">
                  <span className="font-semibold text-primary">Name:</span> {user?.name}
                </p>
                <p className="text-gray-600 font-poppins">
                  <span className="font-semibold text-primary">Email:</span> {user?.email}
                </p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2.5 bg-white border border-red-500 text-red-500 rounded-full font-poppins font-medium hover:bg-red-50 transition-colors duration-200"
            >
              <span>Logout</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
            </motion.button>
          </div>

          {/* Orders Section */}
          <section className="mt-10">
            <h2 className="text-2xl font-montserrat font-bold text-primary mb-6">Order History</h2>
            
            {userOrders?.length <= 0 ? (
              <div className="text-center py-12 bg-accent rounded-xl">
                <p className="text-gray-500 font-poppins">No Order History</p>
              </div>
            ) : (
              <div className="space-y-6">
                {userOrders?.toReversed()?.map((order) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-100 rounded-xl p-6 shadow-card hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="font-poppins font-semibold text-primary">Order ID: {order._id}</p>
                        <p className="font-poppins text-gray-600">
                          Status:{" "}
                          <span
                            className={`capitalize font-medium ${
                              order.status === "placed" || order.status === "scheduleMeet"
                                ? "text-green-500"
                                : "text-yellow-500"
                            }`}
                          >
                            {order.status === "scheduleMeet" ? "Meet Scheduled" : order.status}
                          </span>
                        </p>
                      </div>
                      
                      {order?.meetLink && (
                        <div className="bg-accent rounded-xl p-3 w-fit">
                          <Link 
                            href={order?.meetLink} 
                            target='_blank' 
                            className="text-primary font-poppins font-medium hover:text-primary/80 transition-colors"
                          >
                            Join Meeting
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">
                            Scheduled: {new Date(order?.meetTime).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>

                    {order?.orderItems?.length > 0 && (
                      <div className="border border-gray-100 rounded-xl p-4 bg-accent/30">
                        {order?.orderItems?.[0]?.productImage && (
                          <div 
                            style={{ backgroundImage: `url(${order?.orderItems?.[0].productImage})` }} 
                            className="bg-cover bg-center bg-no-repeat h-[120px] w-[120px] rounded-lg mb-4"
                          />
                        )}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <p className="font-poppins font-bold text-primary">{order?.orderItems?.[0].productName}</p>
                            <p className="font-poppins text-gray-600">${order?.orderItems?.[0].totalPrice}</p>
                          </div>
                          {order.status === "pending" && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => onSubmit(order._id)}
                              className="bg-primary text-white rounded-full px-6 py-2 font-poppins font-medium hover:bg-primary/90 transition-colors duration-200"
                            >
                              {loading[order._id] ? (
                                <ClipLoader size={16} color="white" />
                              ) : (
                                "Checkout"
                              )}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <p className="text-gray-600 font-poppins">
                        <span className="font-semibold text-primary">Delivery Address:</span>{" "}
                        {order?.deliveryAddress?.street}, {order?.deliveryAddress?.city},{" "}
                        {order?.deliveryAddress?.state}, {order?.deliveryAddress?.country},{" "}
                        {order?.deliveryAddress?.postalCode}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </motion.div>
      </main>

      {isOpencheckout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4"
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  setselectedPres(null);
                  setIsOpencheckout(false);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <ProfileCheckOutForm prescription={selectedPres} />
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfileDetails;

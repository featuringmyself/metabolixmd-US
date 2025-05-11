import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { getMethod, postMethod } from "@/services/API/ApiMethod";
import { toast } from "react-toastify";
import { getUser } from "@/services/Auth/cookies";
import useFirebaseAuth from "@/services/Auth/useFirebaseAuth";
import { useRouter } from "next/router";
import ProfileCheckOutForm from "@/components/profilecheckout";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";

const ProfileDetails = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [userPres, setUserPres] = useState([]);
  const [selectedPres, setSelectedPres] = useState(null);
  const [isOpencheckout, setIsOpencheckout] = useState(false);
  const [loading, setLoading] = useState({});
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { logOut } = useFirebaseAuth();

  useEffect(() => {
    setIsClient(true);
    const currentUser = getUser();
    setUser(currentUser);

    if (!currentUser) {
      router.push("/login");
      return;
    }

    // Handle payment status messages
    const { payment, session_id } = router.query;
    if (payment === 'success' && session_id) {
      console.log('Payment successful with session:', session_id);
      // Add small delay to allow webhook to process
      setTimeout(() => {
        getOrderDetails();
        toast.success('Payment completed successfully!');
      }, 2000);
      router.replace('/profile-details', undefined, { shallow: true });
    } else if (payment === 'cancelled') {
      toast.info('Payment was cancelled');
      router.replace('/profile-details', undefined, { shallow: true });
    } else if (payment) {
      toast.error('An unexpected error occurred with the payment');
      router.replace('/profile-details', undefined, { shallow: true });
    } else {
      // Initial load - get orders
      getOrderDetails();
      getPresDetails();
    }
  }, [router.query]);

  const getOrderDetails = async () => {
    try {
      console.log('Fetching orders...');
      const res = await getMethod("/v1/order/user");
      console.log('Orders API response:', res);
      
      if (res?.data) {
        // Process orders to ensure payment information is properly mapped
        const processedOrders = res.data.map(order => ({
          ...order,
          paymentStatus: order.paymentStatus || 'pending',
          paymentDate: order.paymentDate || null
        }));
        setUserOrders(processedOrders);
        console.log('Processed orders:', processedOrders);
      } else {
        console.log('No orders found in response');
        setUserOrders([]);
      }
    } catch (e) {
      console.error('Error fetching orders:', e);
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
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const onSubmit = async (id) => {
    try {
      setLoading((prev) => ({ ...prev, [id]: true }));
      let res = await postMethod("/v1/order/checkout/" + id);
      setLoading((prev) => ({ ...prev, [id]: false }));
      if (res?.data?.url) window.open(res?.data?.url);
      toast.success(res.message);
    } catch (err) {
      setLoading((prev) => ({ ...prev, [id]: false }));
      toast.error(err.message);
    }
  };

  const shimmer = {
    hidden: { backgroundPosition: "200% 0" },
    animate: { 
      backgroundPosition: ["-200% 0", "200% 0"],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear"
      }
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const listItemVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const getUserInitial = (name) => {
    return name && typeof name === 'string' ? name.charAt(0).toUpperCase() : 'U';
  };

  if (!isClient) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Profile Details | MetabolixMD</title>
        <meta name="description" content="View and manage your profile details" />
      </Head>
      <NavBar />
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="max-w-7xl mx-auto mt-10">
          {/* Profile Header */}
          <motion.div 
            className="bg-white backdrop-blur-lg bg-opacity-80 rounded-3xl shadow-xl p-8 mb-10 border border-gray-100/50"
            variants={cardVariants}
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
              <motion.div 
                className="relative group cursor-pointer mx-auto md:mx-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-36 h-36 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center text-5xl font-semibold text-white shadow-xl ring-4 ring-white"
                  animate={{
                    boxShadow: ["0px 0px 20px rgba(0,0,0,0.1)", "0px 0px 30px rgba(0,0,0,0.2)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {getUserInitial(user?.name)}
                </motion.div>
                <motion.div 
                  className="absolute -inset-4 rounded-full bg-primary/5 z-0"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <div className="mt-6 md:mt-0">
                <motion.h1 
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {user?.name}
                </motion.h1>
                <motion.p 
                  className="text-lg text-gray-600 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {user?.email}
                </motion.p>
                <motion.p 
                  className="text-lg text-gray-600 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {user?.phone }
                </motion.p>
                <motion.button
                  onClick={handleLogout}
                  className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Out
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Orders Section */}
          <motion.div 
            className="bg-white backdrop-blur-lg bg-opacity-80 rounded-3xl shadow-xl p-8 mb-10 border border-gray-100/50"
            variants={cardVariants}
          >
            <motion.h2 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Your Orders
            </motion.h2>
            <AnimatePresence>
              <div className="space-y-6">
                {userOrders.map((order, index) => (
                  <motion.div
                    key={order._id}
                    variants={listItemVariants}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          Order ID: {order._id}
                        </p>
                        <div className="space-y-1">
                          <p className="text-gray-600">
                            Status: <span className="font-medium capitalize">{order.status}</span>
                          </p>
                          <p className="text-gray-600">
                            Payment: {" "}
                            <span className={`font-medium capitalize ${
                              order.paymentStatus === "paid" ? "text-green-600" : 
                              order.paymentStatus === "failed" ? "text-red-600" : 
                              "text-yellow-600"
                            }`}>
                              {order.paymentStatus || "pending"}
                            </span>
                            {order.paymentDate && (
                              <span className="text-xs text-gray-500 ml-2">
                                ({new Date(order.paymentDate).toLocaleDateString()})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        {order.orderItems && order.orderItems.length > 0 && order.paymentStatus !== "paid" && (
                          <motion.button
                            onClick={() => onSubmit(order._id)}
                            disabled={loading[order._id]}
                            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {loading[order._id] ? (
                              <ClipLoader size={20} color="#ffffff" />
                            ) : (
                              "Pay Now"
                            )}
                          </motion.button>
                        )}
                        {(!order.orderItems || order.orderItems.length === 0) && (
                          <span className="text-sm text-gray-500 italic">
                            Awaiting medication assignment
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {userOrders.length === 0 && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 py-8"
                  >
                    No orders found
                  </motion.p>
                )}
              </div>
            </AnimatePresence>
          </motion.div>

          {/* Prescriptions Section */}
          <motion.div 
            className="bg-white backdrop-blur-lg bg-opacity-80 rounded-3xl shadow-xl p-8 border border-gray-100/50"
            variants={cardVariants}
          >
            <motion.h2 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Your Prescriptions
            </motion.h2>
            <AnimatePresence>
              <div className="space-y-6">
                {userPres.map((pres, index) => (
                  <motion.div
                    key={pres._id}
                    variants={listItemVariants}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          Prescription ID: {pres._id}
                        </p>
                        <p className="text-gray-600">
                          Status: <span className="font-medium capitalize">{pres.status}</span>
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <motion.button
                          onClick={() => {
                            setSelectedPres(pres);
                            setIsOpencheckout(true);
                          }}
                          className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:-translate-y-0.5"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {userPres.length === 0 && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 py-8"
                  >
                    No prescriptions found
                  </motion.p>
                )}
              </div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
      <Footer paddingTop="md:mt-10 mt-5 p-10 p-5"/>
    </>
  );
};

export default ProfileDetails;

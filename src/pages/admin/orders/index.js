import React, { useState, useEffect, useMemo } from 'react';
import AdminLayout from '../layout';
import AdminNavBar from '@/components/admin modules/Header';
import Pagination from '@/components/admin modules/Pagination';
import { getMethod, postMethod, putMethod } from '@/services/API/ApiMethod';
import { useRouter } from 'next/router';
import { parseISO, formatISO } from "date-fns";
import Link from 'next/link';

const OrdersList = () => {
  const [containerHeight, setContainerHeight] = useState(400);
  const [orderData, setOrderData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [status, setStatus] = useState("all");
  const [totalPages, setTotalPages] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { page = 1 } = router.query;
  const [isView, setIsView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [data, setData] = useState({});
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
  const [isMeetPopupOpen, setIsMeetPopupOpen] = useState(false);
  const [isDosePopupOpen, setIsDosePopupOpen] = useState(false);
  const [selectedDose, setSelectedDose] = useState("");
  const [doses, setDoses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [schMeet, setSchMeet] = useState({
    meetLink: "",
    time: ""
  });
  const isConfirmDisabled = !schMeet.meetLink || !schMeet.time;
  const minDateTime = new Date().toISOString().slice(0, 16);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        if (isView) {
          setIsView(false);
        }
        if (isStatusPopupOpen) {
          setIsStatusPopupOpen(false);
          setSelectedOrder(null);
          setNewStatus("");
        }
        if (isMeetPopupOpen) {
          setIsMeetPopupOpen(false);
          setSelectedOrder(null);
          setSchMeet({ meetLink: "", time: "" });
        }
        if (isDosePopupOpen) {
          setIsDosePopupOpen(false);
          setSelectedOrder(null);
          setSelectedDose("");
        }
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isView, isStatusPopupOpen, isMeetPopupOpen, isDosePopupOpen]);

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = window.innerHeight * 0.58;
      setContainerHeight(newHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const getAllOrders = async (status) => {
    let url = `/order?page=1&limit=1000`; // Fetch a large number of orders
    if (status !== "all") {
      url += `&status=${status}`;
    }
    try {
      const res = await getMethod(url);
      if (res?.data) {
        setAllOrders(res.data.results);
      }
    } catch (error) {
      console.error('Error fetching all orders:', error);
    }
  };

  const getOrderData = async (status, page, limit) => {
    let url = `/order?page=${page}&limit=${limit}`;
    if (status !== "all") {
      url += `&status=${status}`;
    }
    try {
      const res = await getMethod(url);
      if (res?.data) {
        console.log('Order data received:', res.data.results);
        setOrderData(res.data.results);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getDosesData = async () => {
    let url = `/product?page=${page}&limit=30`;
    const res = await getMethod(url);
    if (res?.data) {
      setDoses(res.data.results);
    }
  };

  useEffect(() => {
    getOrderData(status, page, usersPerPage);
    getAllOrders(status);
  }, [status, page, usersPerPage]);

  useEffect(() => {
    getDosesData();
  }, []);

  const handleTabChange = (newStatus) => {
    setStatus(newStatus);
    router.push(`/admin/orders?page=1`);
  };

  const handleSelect = (e) => {
    setUsersPerPage(Number(e.target.value));
    router.push(`/admin/orders?page=1`);
  };

  const handleStatusClick = (order) => {
    setSelectedOrder(order);
    setIsStatusPopupOpen(true);
  };

  const handleMeetClick = (order) => {
    setSelectedOrder(order);
    setIsMeetPopupOpen(true);
  };

  const handleDoseClick = (order) => {
    setSelectedOrder(order);
    setIsDosePopupOpen(true);
  };

  const confirmStatusChange = async () => {
    if (newStatus) {
      let payload = {
        "_id": selectedOrder._id,
        "status": newStatus
      };

      const res = await putMethod("/v1/order/updateorder", payload);
      if (res?.data) {
        // Update the order in both orderData and allOrders
        setOrderData(prevOrders => 
          prevOrders.map(order => 
            order._id === selectedOrder._id 
              ? { ...order, status: newStatus }
              : order
          )
        );
        setAllOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === selectedOrder._id 
              ? { ...order, status: newStatus }
              : order
          )
        );
        
        setSelectedOrder(null);
        setNewStatus("");
        setIsStatusPopupOpen(false);
      }
    }
  };

  const handleConfirmMeet = async () => {
    const utcTime = formatISO(parseISO(schMeet.time), { representation: "dateTime" });

    let payload = {
      "_id": selectedOrder._id,
      "meetLink": schMeet.meetLink,
      "time": utcTime
    };

    const res = await postMethod("/v1/order/schedule", payload);
    if (res?.data) {
      setSelectedOrder(null);
      setSchMeet({
        meetLink: "",
        time: ""
      });
      setIsMeetPopupOpen(false);
      getOrderData(status, page, usersPerPage);
    }
  };

  const handleConfirmDose = async () => {
    let payload = {
      "_id": selectedOrder._id,
      "orderItems": [
        {
          "product": selectedDose._id,
          "quantity": selectedDose.quantity
        }
      ]
    };

    const res = await postMethod("/v1/order/upateItems", payload);
    if (res?.data) {
      setSelectedOrder(null);
      setSelectedDose("");
      setIsDosePopupOpen(false);
      getOrderData(status, page, usersPerPage);
    }
  };

  const filteredOrders = useMemo(() => {
    if (!searchQuery) return orderData;
    
    const query = searchQuery.toLowerCase();
    return allOrders.filter(order => {
      const orderId = order._id?.toLowerCase() || '';
      const userName = order.user?.name?.toLowerCase() || '';
      const userPhone = order.user?.phone?.toLowerCase() || '';
      const userEmail = order.user?.email?.toLowerCase() || '';
      
      return orderId.includes(query) || 
             userName.includes(query) || 
             userPhone.includes(query) ||
             userEmail.includes(query);
    });
  }, [allOrders, searchQuery]);

  return (
    <AdminLayout>
      <div className="min-h-full">
        <AdminNavBar title="Orders Management" />
        
        <section className="p-6">
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 overflow-x-auto">
                {["all", "placed", "pending"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-colors
                      ${status === tab 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Order ID, Name, or Phone Number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-orderTable gap-4 p-4 bg-gray-50 border-b border-gray-200">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">User Info</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date Ordered</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Details</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Meeting</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Dose</div>
            </div>

            <div className="divide-y divide-gray-200" style={{ maxHeight: containerHeight, overflowY: 'auto' }}>
              {filteredOrders.map((order) => (
                <div key={order._id} className="grid grid-cols-orderTable gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="text-xs font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <span id={`order-${order._id}`} className="truncate max-w-[100px]">{order._id}</span>
                      <button
                        onClick={() => {
                          const element = document.getElementById(`order-${order._id}`);
                          if (element) {
                            element.classList.toggle('truncate');
                            element.classList.toggle('max-w-[100px]');
                          }
                        }}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Toggle order ID"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    {order?.user ? (
                      <>
                        <span className="text-sm font-medium text-gray-900">
                          {order.user.name !== null ? order.user.name : "Name not set"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {order.user.email || "Email not provided"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {order.user.phone || "Phone not provided"}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500 italic">User information not available</span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}
                  </div>
                  
                  <div 
                    onClick={() => handleStatusClick(order)}
                    className={`
                      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      cursor-pointer transition-colors
                      ${(order.status === "placed" || order.status === "scheduleMeet")
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                      }
                    `}
                  >
                    {order.status === "scheduleMeet" ? "Meet Scheduled" : order.status}
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setData(order.user?.detail);
                      setIsView(true);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="View Details"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  
                  <div className="text-sm text-gray-500 break-words">
                    {[
                      order?.deliveryAddress?.address,
                      order?.deliveryAddress?.street,
                      order?.deliveryAddress?.city,
                      order?.deliveryAddress?.state,
                      order?.deliveryAddress?.country,
                      order?.deliveryAddress?.postalCode
                    ].filter(Boolean).join(", ")}
                  </div>
                  
                  <div>
                    {order?.meetLink ? (
                      <div className="flex flex-col gap-1">
                        <Link
                          href={order.meetLink.startsWith('http') ? order.meetLink : `https://${order.meetLink}`}
                          target="_blank"
                          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                        >
                          Join Meeting
                        </Link>
                        <span className="text-xs text-gray-500">
                          {new Date(order?.meetTime).toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleMeetClick(order)}
                        className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                      >
                        Schedule
                      </button>
                    )}
                  </div>
                  
                  <div>
                    {order?.orderItems.length > 0 ? (
                      <div className="text-sm text-gray-900">
                        {order.orderItems[0].productName}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDoseClick(order)}
                        className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                      >
                        Add dose
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
            {!searchQuery && (
              <>
                <div className="flex items-center gap-4">
                  <label htmlFor="usersPerPage" className="text-sm text-gray-600">
                    Items per page:
                  </label>
                  <select
                    id="usersPerPage"
                    value={usersPerPage}
                    onChange={handleSelect}
                    className="rounded-md border-gray-300 text-sm focus:border-primary focus:ring focus:ring-primary/20"
                  >
                    {[10, 15, 20, 25, 30].map((count) => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </div>
                
                {totalPages && (
                  <Pagination
                    currentPage={parseInt(page)}
                    totalPages={totalPages}
                    onPageChange={(newPage) => router.push(`/admin/orders?page=${newPage}`)}
                  />
                )}
              </>
            )}
            {searchQuery && (
              <div className="text-sm text-gray-600">
                Found {filteredOrders.length} results
              </div>
            )}
          </div>
        </section>

        {isView && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white max-w-2xl w-full mx-4 rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-primary p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white capitalize">
                    {selectedOrder?.user?.name ? selectedOrder?.user?.name : "User"} Details
                  </h2>
                  <button
                    onClick={() => setIsView(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                    aria-label='Close Button'
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Height:</span>
                        <span className="font-medium">{data?.height?.feet} ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">{data?.weight ? `${data?.weight} lbs` : "NA"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium">{data?.gender || "NA"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth:</span>
                        <span className="font-medium">{data?.dob ? new Date(data?.dob).toLocaleDateString() : "NA"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Postal Code:</span>
                        <span className="font-medium">{data?.zipCode || "NA"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Health Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Health Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Primary Care Provider:</span>
                        <span className="font-medium">{data?.seen_primary_care_provider ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Heart Condition:</span>
                        <span className="font-medium">{data?.heart_condition?.filter(Boolean).join(", ") || "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hormone/Kidney/Liver:</span>
                        <span className="font-medium">{data?.hormone_kidney_liver_condition?.filter(Boolean).join(", ") || "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type 2 Diabetes:</span>
                        <span className="font-medium">{data?.type_2_diabetes || "NA"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Goals:</span>
                        <span className="font-medium text-right max-w-[70%]">{data?.accomplish_with_body_program?.join(", ") || "NA"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional Conditions:</span>
                        <span className="font-medium text-right max-w-[70%]">{data?.additional_condition?.join(", ") || "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Allergies:</span>
                        <span className="font-medium text-right max-w-[70%]">{data?.allergies?.length > 0 ? data.allergies.join(", ") : "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Allergic to GLP-1:</span>
                        <span className="font-medium">{data?.allergy_GLP_1 ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Medications:</span>
                        <span className="font-medium text-right max-w-[70%]">{data?.medications?.join(", ") || "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Self Description:</span>
                        <span className="font-medium text-right max-w-[70%]">{data?.describe_yourself?.join(", ") || "NA"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isStatusPopupOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-96 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Update Order Status</h2>
                <button
                  onClick={() => { setIsStatusPopupOpen(false); setSelectedOrder(""); setNewStatus("") }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label='Close Button'
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <select
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                {["pending", "placed", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => { setIsStatusPopupOpen(false); setSelectedOrder(""); setNewStatus("") }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusChange}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
        {isMeetPopupOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-96 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Schedule Meeting</h2>
                <button
                  onClick={() => { setIsMeetPopupOpen(false); setSelectedOrder(""); setSchMeet({ meetLink: "", time: "" }) }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label='Close Button'
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">User Email</p>
                <p className="text-gray-800 font-medium">{selectedOrder.user?.email}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="meetLink" className="block text-sm text-gray-600 mb-1">Meeting Link</label>
                  <input
                    type="text"
                    id="meetLink"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    placeholder="Enter meeting link"
                    name="meetLink"
                    value={schMeet.meetLink}
                    onChange={(e) =>
                      setSchMeet({ ...schMeet, [e.currentTarget.name]: e.currentTarget.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="meetTime" className="block text-sm text-gray-600 mb-1">Meeting Time</label>
                  <input
                    type="datetime-local"
                    id="meetTime"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors cursor-pointer"
                    name="time"
                    min={minDateTime}
                    value={schMeet.time}
                    onClick={(e) => e.currentTarget.showPicker()}
                    onChange={(e) =>
                      setSchMeet({ ...schMeet, [e.currentTarget.name]: e.currentTarget.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => { setIsMeetPopupOpen(false); setSelectedOrder(""); setSchMeet({ meetLink: "", time: "" }) }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmMeet}
                  disabled={isConfirmDisabled}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isConfirmDisabled
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        )}
        {isDosePopupOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-96 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Add Doses</h2>
                <button
                  onClick={() => { setIsDosePopupOpen(false); setSelectedDose(""); setSelectedOrder("") }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label='Close Button'
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mb-6">
                <label htmlFor="doseSelect" className="block text-sm text-gray-600 mb-1">Select Dose</label>
                <select
                  id="doseSelect"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  value={selectedDose._id}
                  onChange={(event) => {
                    const selectedId = event.target.value;
                    const dose = doses.find((dose) => dose._id === selectedId);
                    setSelectedDose(dose);
                  }}
                >
                  <option value="">Select a dose</option>
                  {doses.map((dose) => (
                    <option key={dose._id} value={dose._id}>
                      {dose.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => { setIsDosePopupOpen(false); setSelectedDose(""); setSelectedOrder("") }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDose}
                  disabled={selectedDose === ""}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedDose === ""
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  Add Dose
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrdersList;

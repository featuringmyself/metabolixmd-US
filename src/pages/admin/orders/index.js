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
  const [status, setStatus] = useState("all");
  const [totalPages, setTotalPages] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
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
    const updateHeight = () => {
      const newHeight = window.innerHeight * 0.58;
      setContainerHeight(newHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const getOrderData = async (status, page, limit) => {
    let url = `/order?page=${page}&limit=${limit}`;
    if (status !== "all") {
      url += `&status=${status}`;
    }
    const res = await getMethod(url);
    if (res?.data) {
      setOrderData(res.data.results);
      setTotalPages(res.data.totalPages);
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
        setSelectedOrder(null);
        setNewStatus("");
        setIsStatusPopupOpen(false);
        getOrderData(status, page, usersPerPage);
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

  return (
    <AdminLayout>
      <div className="min-h-full">
        <AdminNavBar title="Orders Management" />
        
        <section className="p-6">
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
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
              {orderData.map((order) => (
                <div key={order._id} className="grid grid-cols-orderTable gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-medium text-gray-900">{order._id}</div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{order.user.name || "NA"}</span>
                    <span className="text-sm text-gray-500">{order.user?.email}</span>
                    <span className="text-sm text-gray-500">{order.user?.phone}</span>
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
          </div>
        </section>

        {isView && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white max-w-[600px] p-5 rounded-md">
              <div>
                <h2 className="text-xl font-bold mb-4 capitalize">{selectedOrder?.user?.name ? selectedOrder?.user?.name : "User"} Details</h2>
                <div className="space-y-2">
                  <p><strong>Goal:</strong> {data?.accomplish_with_body_program.join(", ")}</p>
                  <p><strong>Height:</strong> {data?.height.feet} ft</p>
                  <p><strong>Weight:</strong> {data?.weight ? data?.weight + " lbs" : "NA"} </p>
                  <p><strong>Gender:</strong> {data?.gender}</p>
                  <p><strong>Date of Birth:</strong>  {new Date(data?.dob).toLocaleString()}</p>
                  <p><strong>Postal Code:</strong> {data?.zipCode}</p>
                  <p><strong>Seen Primary Care Provider:</strong> {data?.seen_primary_care_provider ? "Yes" : "No"}</p>
                  <p><strong>Heart Condition:</strong> {data?.heart_condition.filter(Boolean).join(", ") || "None"}</p>
                  <p><strong>Hormone/Kidney/Liver Condition:</strong> {data?.hormone_kidney_liver_condition.filter(Boolean).join(", ") || "None"}</p>
                  <p><strong>Type 2 Diabetes:</strong> {data?.type_2_diabetes}</p>
                  <p><strong>Diabetic:</strong> {data?.diabetic}</p>
                  <p><strong>Additional Condition:</strong> {data?.additional_condition.join(", ")}</p>
                  <p><strong>Allergies:</strong> {data?.allergies.length > 0 ? data.allergies.join(", ") : "None"}</p>
                  <p><strong>Allergic to GLP-1:</strong> {data?.allergy_GLP_1 ? "Yes" : "No"}</p>
                  <p><strong>Medications:</strong> {data?.medications.join(", ")}</p>
                  <p><strong> Self Described:</strong> {data?.describe_yourself.join(", ")}</p>
                </div>
              </div>
              <div className="flex gap-5 justify-end mt-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setIsView(false)}
                  aria-label='Close Button'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {isStatusPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-80">
              <h2 className="text-lg font-bold mb-4">Update Status</h2>
              <select
                className="w-full p-2 mb-4 border rounded-md"
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
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  aria-label='Close Button'
                >
                  Close
                </button>
                <button
                  onClick={confirmStatusChange}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  aria-label='Confirm Button'
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {isMeetPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-80">
              <h2 className="text-lg font-bold mb-4">Schedule meet</h2>
              <p className="text-zinc-600 my-2">
                <span className="text-zinc-400">User email:</span> {selectedOrder.user?.email}
              </p>
              <input
                type="text"
                className="w-full p-2 mb-4 border rounded-md"
                placeholder="Enter meet link here"
                name="meetLink"
                value={schMeet.meetLink}
                onChange={(e) =>
                  setSchMeet({ ...schMeet, [e.currentTarget.name]: e.currentTarget.value })
                }
              />
              <input
                type="datetime-local"
                className="w-full p-2 mb-4 border rounded-md cursor-pointer"
                name="time"
                min={minDateTime}
                value={schMeet.time}
                onClick={(e) => e.currentTarget.showPicker()}
                onChange={(e) =>
                  setSchMeet({ ...schMeet, [e.currentTarget.name]: e.currentTarget.value })
                }
              />

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => { setIsMeetPopupOpen(false); setSelectedOrder(""); setSchMeet({ meetLink: "", time: "" }) }}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  aria-label='Close Button'
                >
                  Close
                </button>
                <button
                  onClick={handleConfirmMeet}
                  disabled={isConfirmDisabled}
                  className={`px-4 py-2 rounded-md ${isConfirmDisabled
                    ? "bg-blue-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                    }`}
                  aria-label='Confirm button'
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {isDosePopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-80">
              <h2 className="text-lg font-bold mb-4">Add Doses</h2>
              <select
                className="w-full p-2 mb-4 border rounded-md"
                value={selectedDose._id}
                onChange={(event) => {
                  const selectedId = event.target.value;
                  const dose = doses.find((dose) => dose._id === selectedId);
                  setSelectedDose(dose);
                }}
              >
                <option value="">
                  Select
                </option>
                {doses.map((dose) => (
                  <option key={dose._id} value={dose._id}>
                    {dose.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => { setIsDosePopupOpen(false); setSelectedDose(""); setSelectedOrder("") }}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  aria-label='Close Button'
                >
                  Close
                </button>
                <button
                  onClick={handleConfirmDose}
                  disabled={selectedDose === ""}
                  className={`px-4 py-2 rounded-md ${selectedDose === ""
                    ? "bg-blue-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                    }`}
                  aria-label='Confirm button'
                >
                  Confirm
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

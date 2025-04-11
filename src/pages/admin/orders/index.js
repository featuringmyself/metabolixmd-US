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
  const [status, setStatus] = useState("all");  // Track selected status
  const [totalPages, setTotalPages] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);  // Users per page
  const router = useRouter();
  const { page = 1 } = router.query;
  const [isView, setIsView] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [data, setData] = useState({})
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
  const [isMeetPopupOpen, setIsMeetPopupOpen] = useState(false);
  const [isDosePopupOpen, setIsDosePopupOpen] = useState(false);
  const [selectedDose, setSelectedDose] = useState("")
  const [doses, setDoses] = useState([])
  const [newStatus, setNewStatus] = useState("");
  const [schMeet, setSchMeet] = useState({
    meetLink: "",
    time: ""
  })
  const isConfirmDisabled = !schMeet.meetLink || !schMeet.time;
  const minDateTime = new Date().toISOString().slice(0, 16);
  useEffect(() => {
    const updateHeight = () => {
      // Calculate height based on viewport height, e.g., 80% of the viewport
      const newHeight = window.innerHeight * 0.58;
      setContainerHeight(newHeight);
    };

    // Set initial height
    updateHeight();

    // Update height on resize
    window.addEventListener('resize', updateHeight);

    // Cleanup event listener on unmount
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
    getDosesData()
  }, [])


  const handleTabChange = (newStatus) => {
    setStatus(newStatus);
    router.push(`/admin/orders?page=1`);
  };
  const handleSelect = (e) => {
    setUsersPerPage(Number(e.target.value))
    router.push(`/admin/orders?page=1`);

  }
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
      // Call the function to update status here

      let payload = {
        "_id": selectedOrder._id,
        "status": newStatus
      }

      const res = await putMethod("/order/updateorder", payload);
      if (res?.data) {
        setSelectedOrder(null)
        setNewStatus("")
        setIsStatusPopupOpen(false);
        getOrderData(status, page, usersPerPage);
      }

    }
  };

  const handleConfirmMeet = async () => {
    const utcTime = formatISO(parseISO(schMeet.time), { representation: "dateTime" })

    let payload = {
      "_id": selectedOrder._id,
      "meetLink": schMeet.meetLink,
      "time": utcTime
    }

    const res = await postMethod("/order/schedule", payload);
    if (res?.data) {
      setSelectedOrder(null)
      setSchMeet({
        meetLink: "",
        time: ""
      })
      setIsMeetPopupOpen(false);
      getOrderData(status, page, usersPerPage);
    }
  };
  const handleConfirmDose = async () => {
    console.log(selectedDose)

    let payload = {
      "_id": selectedOrder._id,
      "orderItems": [
        {
          "product": selectedDose._id,
          "quantity": selectedDose.quantity
        }
      ]
    }
    console.log(payload)

    const res = await postMethod("/order/upateItems", payload);
    if (res?.data) {
      setSelectedOrder(null)
      setSelectedDose("")
      setIsDosePopupOpen(false);
      getOrderData(status, page, usersPerPage);
    }
  };
  return (
    <AdminLayout>
      <div>
        <AdminNavBar title="Orders Management" />
        <section className='p-5 flex flex-col gap-2'>
          {/* <div className='flex items-center justify-between gap-10'>
            <input type="search" placeholder='Search order by id' className='bg-white outline-none px-3 py-2 rounded-md' />
          </div> */}
          <div className="tabs flex gap-4 ">
            {["all", "placed", "pending"].map((tab) => (
              <button
                key={tab}
                className={`tab ${status === tab ? 'bg-white py-2 rounded-full px-5 font-semibold' : 'font-semibold'}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="bg-white overflow-x-auto">

            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center grid grid-cols-orderTable gap-3 justify-between p-4 bg-liteOrange text-lg">
                <span className="text-black font-medium font-sans text-sm">Order Id</span>
                <span className="text-black font-medium font-sans text-sm">User Name</span>
                <span className="text-black font-medium font-sans text-sm">Date Ordered</span>
                <span className="text-black font-medium font-sans text-sm flex items-center justify-between gap-1">Status</span>
                <span className="text-black font-medium font-sans text-sm flex items-center justify-between gap-1">View</span>
                <span className="text-black font-medium font-sans text-sm flex items-center justify-between gap-1 text-center">Shipping Address</span>
                <span className="text-black font-medium font-sans text-sm flex items-center justify-between gap-1 text-center">Meet link</span>
                <span className="text-black font-medium font-sans text-sm flex items-center justify-between gap-1 text-center">Dose</span>
              </div>
            </div>

            <div className="flex flex-col bg-white min-w-fit w-full overflow-y-auto" style={{ maxHeight: containerHeight, overflowY: 'auto' }}>
              {
                orderData.map((order) => {
                  return (

                    <div key={order._id} className="grid grid-cols-orderTable gap-3 justify-between border-b border-[#E9E9EC] items-center p-4">
                      <span className=" font-sans font-semibold text-xs">{order._id}</span>
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-col">
                          <p className="text-sm font-sans font-medium break-all">{order.user.name ? order.user.name : "NA"}</p>
                          <p className="text-sm font-normal font-sans text-zinc-500 break-all">{order.user?.email}</p>
                          <p className="text-sm font-normal font-sans text-zinc-500">{order.user?.phone} </p>
                        </div>
                      </div>
                      <span className=" font-sans font-semibold text-sm">{new Date(order.createdAt).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</span>

                      <div onClick={() => handleStatusClick(order)} className={`py-1 justify-center cursor-pointer  px-3 w-full rounded-md  border font-sans font-semibold text-sm flex flex-row capitalize items-center gap-2  ${(order.status == "placed" || order.status === "scheduleMeet") ? "text-[#2BAB4B] border-[#2BAB4B]" : "text-yellow-400 border-yellow-400"}`}>
                        {order.status === "scheduleMeet" ? "Meet Scheduled" : order.status}
                      </div>
                      {/* view user qna */}
                      <span className='cursor-pointer' onClick={() => {
                        setSelectedOrder(order);
                        setData(order.user?.detail)
                        setIsView(true);
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M8 6h10" /><path d="M6 12h9" /><path d="M11 18h7" /></svg>
                      </span>

                      <div className="break-words text-xs">
                        {order?.deliveryAddress?.address && `${order.deliveryAddress.address}, `}
                        {order?.deliveryAddress?.street && `${order.deliveryAddress.street}, `}
                        {order?.deliveryAddress?.city && `${order.deliveryAddress.city}, `}
                        {order?.deliveryAddress?.state && `${order.deliveryAddress.state}, `}
                        {order?.deliveryAddress?.country && `${order.deliveryAddress.country}, `}
                        {order?.deliveryAddress?.postalCode && order.deliveryAddress.postalCode}
                      </div>


                      {
                        order?.meetLink ?
                          <div >
                            <Link
                              href={order?.meetLink.startsWith('http') ? order.meetLink : `https://${order.meetLink}`}
                              target='_blank'
                              className='text-blue-600 font-semibold'
                            >
                              Join
                            </Link>
                            <p className='text-xs'>Sch. Date: {new Date(order?.meetTime).toLocaleString()}</p>
                          </div>
                          :
                          <div onClick={() => handleMeetClick(order)} className='border rounded-3xl px-2 text-center shadow-2xl cursor-pointer'>
                            Schedule
                          </div>
                      }

                      {
                        order?.orderItems.length > 0 ?
                          <div >
                            <p className='text-xs'>{order?.orderItems?.[0].productName}</p>
                          </div>
                          :
                          <div onClick={() => handleDoseClick(order)} className='border rounded-3xl px-2 text-center shadow-2xl cursor-pointer'>
                            Add dose
                          </div>
                      }
                    </div>

                  )

                })
              }
            </div>
          </div>

          <div className='flex justify-between items-center bg-transparent'>
            <div className="flex items-center gap-2">
              <label htmlFor="usersPerPage" className="text-sm font-medium">Users per page:</label>
              <select
                id="usersPerPage"
                className="bg-white px-2 py-1 rounded-md"
                value={usersPerPage}
                onChange={handleSelect}
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
            <div className="bg-white max-w-[600px]   p-5 rounded-md ">
              <div>
                <h2 className="text-xl font-bold mb-4 capitalize">{selectedOrder?.user?.name ? selectedOrder?.user?.name : "User"} Details</h2>
                <div className="space-y-2 ">
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

import React, { useState, useEffect } from 'react';
import AdminLayout from '../layout';
import AdminNavBar from '@/components/admin modules/Header';
import Link from 'next/link';
import Pagination from '@/components/admin modules/Pagination';
import { getMethod, patchMethod } from '@/services/API/ApiMethod';
import { useRouter } from 'next/router';

const PrescriptionList = () => {
  const [containerHeight, setContainerHeight] = useState(400);
  const [orderData, setOrderData] = useState([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState("all");
  const [totalPages, setTotalPages] = useState("1");
  const router = useRouter();
  const [usersPerPage, setUsersPerPage] = useState(10);
  const { page = 1 } = router.query;

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = window.innerHeight * 0.75;
      setContainerHeight(newHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const getOrderData = async (status, page, limit) => {
    let url = `/prescription?page=${page}&limit=${limit}`;
    if (status !== "all") {
      url += `&status=${status}`;
    }
    const res = await getMethod(url);
    if (res?.data) {
      setOrderData(res.data.results);
      setTotalPages(res.data.totalPages);
    }
  };

  useEffect(() => {
    getOrderData(status, page, usersPerPage);
  }, [status, page, usersPerPage]);

  const handleApprove = async () => {
    const res = await patchMethod(`/prescription/${selectedOrderId}`, { status: "approved" });
    setIsApproveModalOpen(false);
    getOrderData(status, page, usersPerPage);
  };

  const handleReject = async () => {
    const res = await patchMethod(`/prescription/${selectedOrderId}`, { status: "rejected" });
    setIsRejectModalOpen(false);
    getOrderData(status, page, usersPerPage);
  };

  const handleTabChange = (newStatus) => {
    setStatus(newStatus);
    router.push(`/admin/prescriptions?page=1`);
  };

  const handleSelect = (e) => {
    setUsersPerPage(Number(e.target.value));
    router.push(`/admin/prescriptions?page=1`);
  };

  return (
    <AdminLayout>
      <div className="min-h-full">
        <AdminNavBar title="Prescription Management" />

        <section className="p-6">
          {/* Status Tabs */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex gap-2 overflow-x-auto">
              {["all", "approved", "rejected", "pending"].map((tab) => (
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

          {/* Prescriptions Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-presTable gap-4 p-4 bg-gray-50 border-b border-gray-200">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">ID</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">User Info</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Image</div>
            </div>

            <div className="divide-y divide-gray-200" style={{ maxHeight: containerHeight, overflowY: 'auto' }}>
              {orderData.map((order) => (
                <div key={order._id} className="grid grid-cols-presTable gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-medium text-gray-900">{order._id}</div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{order.user.name || "NA"}</span>
                    <span className="text-sm text-gray-500">{order.user?.email}</span>
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
                  
                  <div>
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : order.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                      }
                    `}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedOrderId(order._id);
                            setIsApproveModalOpen(true);
                          }}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                          aria-label="Approve"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrderId(order._id);
                            setIsRejectModalOpen(true);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          aria-label="Reject"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    {order.image?.url ? (
                      <button
                        onClick={() => {
                          setSelectedImage(order.image.url);
                          setIsImageModalOpen(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        aria-label="View Image"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
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
                onPageChange={(newPage) => router.push(`/admin/prescriptions?page=${newPage}`)}
              />
            )}
          </div>
        </section>

        {/* Modals */}
        {isApproveModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm Approval
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to approve this prescription?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsApproveModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}

        {isRejectModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm Rejection
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to reject this prescription?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsRejectModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {isImageModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Prescription Image
                </h3>
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Prescription"
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <a
                  href={selectedImage}
                  download
                  className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  Download
                </a>
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PrescriptionList;




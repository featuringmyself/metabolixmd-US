import React, { useState, useEffect } from 'react';
import AdminLayout from '../layout';
import AdminNavBar from '@/components/admin modules/Header';
import Pagination from '@/components/admin modules/Pagination';
import { getMethod } from '@/services/API/ApiMethod';
import { useRouter } from 'next/router';

const UsersList = () => {
  const [containerHeight, setContainerHeight] = useState(400);
  const [userData, setUserData] = useState([]);
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

  const getUserdata = async (page, limit) => {
    let url = `/users?page=${page}&limit=${limit}`;
    const res = await getMethod(url);
    if (res?.data) {
      setUserData(res.data?.results);
      setTotalPages(res.data?.totalPages);
    }
  }

  useEffect(() => {
    getUserdata(page, usersPerPage);
  }, [page, usersPerPage]);

  const handleSelect = (e) => {
    setUsersPerPage(Number(e.target.value));
    router.push(`/admin/users?page=1`);
  }

  return (
    <AdminLayout>
      <div className="min-h-full">
        <AdminNavBar title="Users Management" />
        
        <section className="p-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-userTable gap-4 p-4 bg-gray-50 border-b border-gray-200">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Email</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200" style={{ maxHeight: containerHeight, overflowY: 'auto' }}>
              {userData.map((user) => (
                <div key={user._id} className="grid grid-cols-userTable gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="text-sm font-medium text-gray-900">{user._id}</div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{user.name || "NA"}</span>
                    <span className="text-sm text-gray-500">{user.email}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}
                  </div>
                  
                  <div>
                    {user.isBlocked ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
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
                onPageChange={(newPage) => router.push(`/admin/users?page=${newPage}`)}
              />
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default UsersList;

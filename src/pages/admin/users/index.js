import React, { useState, useEffect } from 'react';
import AdminLayout from '../layout';
import AdminNavBar from '@/components/admin modules/Header';
import Link from 'next/link';
import Pagination from '@/components/admin modules/Pagination';
import { getMethod } from '@/services/API/ApiMethod';
import { useRouter } from 'next/router';

const UsersList = () => {
  const [containerHeight, setContainerHeight] = useState(400);
  const [userData, setUserData] = useState([])
  const [totalPages, setTotalPages] = useState("1") // Track selected status
  const router = useRouter();
  const [usersPerPage, setUsersPerPage] = useState(10)
  const { page = 1 } = router.query;

  useEffect(() => {
    const updateHeight = () => {
      // Calculate height based on viewport height, e.g., 80% of the viewport
      const newHeight = window.innerHeight * 0.75;
      setContainerHeight(newHeight);
    };

    // Set initial height
    updateHeight();

    // Update height on resize
    window.addEventListener('resize', updateHeight);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const getUserdata = async (page,limit) => {
    let url = `/users?page=${page}&limit=${limit}`;
    const res = await getMethod(url)

    if (res?.data) {
      setUserData(res.data?.results)
      setTotalPages(res.data?.totalPages)
    }

  }

  useEffect(() => {
    getUserdata(page,usersPerPage)
  }, [page,usersPerPage]);

  const handleSelect=(e)=>{
    setUsersPerPage(Number(e.target.value))
    router.push(`/admin/users?page=1`);
  }

  return (
    <AdminLayout>
      <div>
        <AdminNavBar title="Users Management" />
        <section className='p-5 flex flex-col gap-5'>
          {/* <div className='flex items-center justify-between gap-10'>
            <input type="search" placeholder='Search user' className='bg-white outline-none px-3 py-2 rounded-md' />
          </div> */}
          <div className="bg-white">

            <div className="bg-[#F0F2F5] min-w-fit w-full">
              <div className="items-center gap-3 grid grid-cols-userTable justify-between p-4 bg-liteOrange text-lg">
                <span className="text-black font-medium font-sans text-sm">User Id</span>
                <span className="text-black font-medium font-sans text-sm">Name</span>
                <span className="text-black font-medium font-sans text-sm">Date joined</span>
                <span className="text-black font-medium font-sans text-sm flex items-center justify-between gap-1 text-center">Status</span>

              </div>
            </div>
            <div className="flex flex-col bg-white min-w-fit w-full overflow-y-auto" style={{ maxHeight: containerHeight, overflowY: 'auto' }}>

              {
                userData.map((user) => {

                  return (
                    <div key={user._id} className="grid gap-3 grid-cols-userTable justify-between border-b border-[#E9E9EC] items-center p-4">
                      <span className="text-userblack font-sans font-semibold text-sm">{user._id}</span>
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-col">
                          <p className="text-sm font-sans font-medium">{user.name? user?.name : "NA"}</p>
                          <p className="text-sm font-normal font-sans text-zinc-500">{user?.email}</p>
                        </div>
                      </div>
                      <span className="text-userblack font-sans font-semibold text-sm">{new Date(user.createdAt).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</span>

                      {
                        user.isBlocked ?
                          <div className="py-1 justify-center px-3 w-full rounded-md border-red-400 border font-sans font-semibold text-sm flex flex-row items-center gap-2 text-red-400">
                            Blocked
                          </div>
                          :
                          <div className="py-1 justify-center px-3 w-full rounded-md border-[#B9F4C8] border font-sans font-semibold text-sm flex flex-row items-center gap-2 text-[#2BAB4B]">
                            Active
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

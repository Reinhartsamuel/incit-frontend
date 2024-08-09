/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

const ProfilePage = () => {
  const [data, setData] = useState<any>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const userDataSql = JSON.parse(
    localStorage.getItem('userSql') || '{"name":""}'
  );
  const handleChange = (key:string, value:string):void => {
    setData({...data, [key] : value});
    if (userDataSql[key] !== data[key]) return setIsEditing(true)
      setIsEditing(false);
  };
  
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center gap-1'>
      <div className='flex flex-col gap-1 p-5 items-center rounded-xl bg-gray-900 w-[95%] lg:w-1/2 gap-3'>
      <h1 className='text-8xl'>Profile</h1>
      <p className=' mb-10 font-thin text-md text-gray-400'>You can change your info here</p>
        <div className='flex flex-col mt-2 w-full'>
          <h4>First Name</h4>
          <input placeholder={userDataSql?.first_name} onChange={(e) => handleChange('first_name', e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className='flex flex-col mt-2 w-full'>
          <h4>Last Name</h4>
          <input placeholder={userDataSql?.last_name} onChange={(e) => handleChange('last_name', e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className='flex flex-col mt-2 w-full'>
          <h4>Email</h4>
          {/* <input disabled value={userDataSql?.email} /> */}
          <input disabled value={userDataSql?.email} type="search" id="default-search" className="cursor-not-allowed block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {isEditing && <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Update</button>}
      </div>
    </div>
  )
}

export default ProfilePage
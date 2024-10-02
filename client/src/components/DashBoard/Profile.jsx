
import React, { useEffect, useState } from 'react';
import userlogo from '../../assets/profile.jpeg';
import axios from 'axios';


export default function Profile() {
    const [user, setuser] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/dashboard/user",{withCredentials:true})
        .then((respoonse) => setuser(respoonse.data))
        .catch((err) => console.log(err))
    },[])

  return (
    <>
        <div className="flex flex-col items-center w-9/12 mx-auto my-12">
            <h1 className="mb-8 text-3xl font-bold text-gray-800 text-center">Profile</h1>

            <div className="w-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div className="flex flex-col sm:flex-row p-6">
                    <div className="flex justify-center mb-4 sm:mb-0">
                        <img 
                            alt="User" 
                            src={userlogo} 
                            className="h-32 w-32 rounded-full border-4 border-gray-300 dark:border-gray-600"
                        />
                    </div>
                    <div className="flex flex-col justify-center ml-0 sm:ml-4">
                        <h2 className="text-2xl font-bold dark:text-white">{user.username}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.role || "User Role"}</p>
                    </div>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-600">
                    <div className="p-6">
                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                        <address className="text-sm font-normal not-italic text-gray-500 dark:text-gray-400">
                            <div className="font-semibold">Full Name:</div>
                            <a className="text-sm font-medium text-gray-900 dark:text-white" href={`mailto:${user.email}`}>{user.full_name}</a>
                            <div className="mt-2 font-semibold">Email Address:</div>
                            <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{user.email}</div>
                            <div className="mt-2 font-semibold">Phone Number:</div>
                            <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">N/A</div>
                        </address>
                    </div>
                    <div className="p-6 border-t border-gray-300 dark:border-gray-600">
                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">About</h3>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Dedicated, passionate, and accomplished Full Stack Developer and growing my educational social network that helps others learn programming, web design
                        </p>
                    </div>
                </div>
            </div>
        </div>



    </>
  )
};
import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import '../../styles/Profile.css';

export const Profile = () => {
  const [editable, setEditable] = useState(true);
  const [username, setUsername] = useState(localStorage.getItem('username') ?? '');
  const [mobileNo, setMobileNo] = useState(localStorage.getItem('mobileNo') ?? '');
  const [rollNo, setRollNo] = useState(localStorage.getItem('rollNo') ?? '');
  const [userData, setUserData] = useState({
    email: localStorage.getItem('email') // Replace with actual user email
  });

  const onEdit = () => {
    setEditable(!editable);
  };

  const updateUserDetails = async () => {
    try {
      const updatedUserDetails = {
        username,
        mobileNo,
        rollNo,
        email: userData.email
      };

      const response = await axios.put('https://wsh.vistaran.tech/api/auth/profile', updatedUserDetails);

      if (response.data.status) {
        toast.success('Info Updated Successfully');
        localStorage.setItem('username', username);
        localStorage.setItem('mobileNo', mobileNo);
        localStorage.setItem('rollNo', rollNo);
        setEditable(true);
      } else {
        toast.error('Error updating info');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error('Error updating info');
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center  mx-auto relative w-full max-w-fit rounded-2xl backdrop-blur-md bg-white bg-opacity-5 gap-12 -translate-x-10 -translate-y-5">
        <div className="rounded-lg p-8 flex flex-col items-center">
          <div className="relative w-full flex justify-end items-center">
            <h2 className="text-4xl font-bold text-center text-sky-400 self-center grow absolute w-full -z-[100]">User Profile</h2>
            <button
              className={`bg-slate-400 font-bold text-lg rounded-lg px-4 py-1 text-black mr-10 ${
                editable ? '' : 'opacity-0 pointer-events-none'
              }`}
              onClick={onEdit}
              >
              {editable ? 'Edit' : 'Save'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-20 gap-y-12 p-10">
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg text-left">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={editable}
                className="text-black w-64 h-12 rounded-lg px-4 py-2 bg-white placeholder:text-black/50 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg text-left">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="username@email.com"
                value={userData?.email}
                required
                readOnly
                disabled={true}
                className="text-black w-64 h-12 pointer-events-none rounded-lg px-4 py-2 bg-white placeholder:text-black/50 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg text-left">Mobile Number</label>
              <input
                type="number"
                name="mobileNo"
                id="mobileNo"
                placeholder="eg. 9999123456"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
                disabled={editable}
                className="text-black w-64 h-12 rounded-lg px-4 py-2 bg-white placeholder:text-black/50 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-bold text-lg text-left">Roll Number</label>
              <input
                type="number"
                name="rollNo"
                id="rollNo"
                placeholder="eg. 12115071"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
                disabled={editable}
                className="text-black w-64 h-12 rounded-lg px-4 py-2 bg-white placeholder:text-black/50 focus:outline-none"
              />
            </div>
          </div>
          {!editable ? (
            <div className="flex justify-between w-64">
              <button
                onClick={updateUserDetails}
                className="bg-[#052961] text-white rounded-lg px-4 py-2 text-black font-semibold cursor-pointer"
              >
                Save
              </button>
              <button onClick={onEdit} className="bg-[#052961] text-white rounded-lg px-4 py-2 text-black font-semibold cursor-pointer">
                Cancel
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

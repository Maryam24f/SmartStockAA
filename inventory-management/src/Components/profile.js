import "../App.css";
import React from "react";
import { useState } from "react";
import "../App.css";
import { CgProfile } from "react-icons/cg";
import {AiOutlineLogout} from 'react-icons/ai'
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { logout} = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutButtonClick = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };
  function handleLogout() {
    logout();
    navigate(`/`);
}
/////modal////
const LogoutModal = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
      <div className='fixed w-full overflow-y-auto inset-0'>
        <div className="fixed flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-8">
                  <h1 className="mb-4 text-3xl font-extrabold text-black">Logout Confirmation</h1>
                  <p className="text-black">Are you sure you want to logout?</p>
                </div>
                <div className="space-y-4">
                  <button onClick={handleLogout} className="p-3 bg-black rounded-full text-white w-full font-semibold">
                    Yes, Logout
                  </button>
                  <button onClick={onClose} className="p-3 bg-white border rounded-full w-full font-semibold">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};
  return (
    <div className="fixed z-10 w-full sm:left-56 shadow-md">
      <div className=" bg-white h-12 pr-4 sm:pr-64 flex justify-between items-center">
        <div></div>
        <div className="pt-1 flex space-x-1">
          <CgProfile className="w-8 h-8 sm:inline text-yellow-500" />
          <h className='text-gray-400 pt-1 hidden sm:inline'>Welcome AAS</h>
          <div onClick={handleLogoutButtonClick} className="flex cursor-pointer">
          <AiOutlineLogout className="w-8 h-8 text-yellow-500"></AiOutlineLogout>
          <h className='text-black font-bold pt-1'>Logout</h>
          </div>
        </div>
      </div>
      {/* Logout Modal */}
      <LogoutModal 
      isOpen={isLogoutModalOpen} 
      onClose={closeLogoutModal}
       />
    </div>
  );
}
export default Profile;

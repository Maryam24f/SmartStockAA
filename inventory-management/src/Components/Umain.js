import React, { useState } from "react";
import { SiHomebridge } from "react-icons/si";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import {AiOutlineLogout} from 'react-icons/ai'
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const Us = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <div className='fixed w-full overflow-y-auto z-50 inset-0'>
        <div className="fixed flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
          <div className="max-h-full items-center justify-center w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white sm:ml-8 sm:mr-8 ">
            <div className="w-full items-center justify-center ">
              <div className="m-8 my-20 max-w-[400px] mx-auto items-center justify-center">
                <div className="mb-8 items-center justify-center">
                  <h1 className="mb-4 text-3xl font-extrabold text-gray-800">Logout Confirmation</h1>
                  <p className="text-gray-600">Are you sure you want to logout?</p>
                </div>
                <div className="space-y-4">
                  <button onClick={handleLogout} className="p-3 bg-black rounded-full text-white w-full font-semibold">
                    Yes, Logout
                  </button>
                  <button onClick={onClose} className="p-3 bg-white text-black border rounded-full w-full font-semibold">
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
    <div className="text-black bg-yellow-500 p-1 fixed w-full z-10">
      <div className="flex">
        <SiHomebridge className="w-10 text-5xl text-black"></SiHomebridge>
        <h1 className="text-3xl text-black mt-2 font-serif"><span className='text-white font-serif text-4xl'>AA</span>stock</h1>
      </div>
      <div className="container mx-auto lg:px-4">
        <div className="flex flex-col lg:flex-row items-center justify-end">
          <div className="flex items-center space-x-4 text-xl">
            <Link to="/Uhome" className=" hidden md:inline-block lg:inline-block hover:underline">
              Home
            </Link>
            <Link to="/Uassets" className=" hidden lg:inline-block md:inline-block hover:underline">
              Assets
            </Link>
            <Link to="/Ureport" className=" hidden lg:inline-block md:inline-block hover:underline">
              Consumable
            </Link>
            <Link to="/Umaintenance" className=" hidden lg:inline-block md:inline-block hover:underline">
              Request
            </Link> 
            <div onClick={handleLogoutButtonClick} className="flex cursor-pointer">
          <AiOutlineLogout className="w-6 h-8  text-black font-bold hidden lg:inline-block md:inline-block"></AiOutlineLogout>
          <h className='text-white font-bold hidden lg:inline-block md:inline-block'>Logout</h>
          </div>
          </div>
          
        </div>
        <div className="flex">
          <button
            className="lg:hidden text-black md:hidden"
            onClick={() => {
              console.log("Button clicked");
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            {isMenuOpen ? <RxCrossCircled /> : <AiOutlineMenu />}
          </button>
        </div>
        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          {/* Render your responsive navigation here */}
          <div className="h-1 bg-black mt-2"></div>
          <Link to="/Uhome" className="block hover:underline">
              Home
            </Link>
            <Link to="/Uassets" className="block hover:underline">
              Assets
            </Link>
            <Link to="/Ureport" className="block hover:underline">
            Consumable
            </Link>
            <Link to="/Umaintenance" className=" block hover:underline">
            Request
            </Link> 
            <div onClick={handleLogoutButtonClick} className="flex justify-end items-end cursor-pointer">
          <AiOutlineLogout className="w-6 h-6 text-black "></AiOutlineLogout>
          <h className='text-white font-bold '>Logout</h>
          </div>
           </div>
    </div>
     {/* Logout Modal */}
     <LogoutModal 
      isOpen={isLogoutModalOpen} 
      onClose={closeLogoutModal}
      className=""
       />
       
  </div>
  );
};

export default Us;

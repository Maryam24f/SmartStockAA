import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import lg from "../Assets/lg.jpg";
import { SiHomebridge } from "react-icons/si";
const Login = () => {
  const { setUserRole, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleAdminLogin = (e) => {
      login(formData.username, formData.password );
      navigate(`/home`);
    
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    login(formData.username, formData.password );
      navigate(`/Uhome`);
    } 
  
  return (
    <div>
      <div class="bg-gray-100 flex justify-center items-center h-screen">
        <div class="w-1/2 h-screen hidden lg:block mt-4 mb-4">
          <img src={lg} className="h-screen" />
          {/* <div className="absolute top-56 left-28">
            <div className="mt-1 rounded-md ml-32">
              <h1 className="ml-2  text-2xl font-serif text-black">
                <span className="text-yellow-500 text-3xl">AA</span>stock
              </h1>
            </div>
          </div> */}
          {/*<span className="whitespace-nowrap">
          <span className="block ml-28 mt-10  text-blue-950 font-extrabold">I</span>
          <span className="block ml-28  text-blue-950 font-extrabold">M</span>
          <span className="block ml-28  text-blue-950 font-extrabold">S</span>
        </span>
          </div> */}
        </div>

        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <div className="flex justify-center mb-2 space-x-1">
            <div className="w-10 h-10 ml-1 mb-1 mt-1 bg-yellow-500 rounded-full">
              <SiHomebridge className="w-10 h-10 mb-1"></SiHomebridge>
            </div>
            <h1 class="text-2xl font-semibold mb-2 mt-1 text-yellow-500">
              Login
            </h1>
          </div>

          <form action="#" method="POST">
            <div class="mb-4">
              <label for="username" class="block text-black">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div class="mb-4">
              <label for="password" class="block text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div class="mb-6 text-yellow-500">
              <a href="#" class="hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
          <div className="flex justify-between">
            <div className="space-y-2">
              <button
                className="px-2 py-1 bg-black text-yellow-500 mr-2 rounded-lg hover:bg-gray-400 hover:text-black"
                onClick={handleAdminLogin}
              >
                Login as Admin
              </button>
              <button
                className="px-2 py-1 bg-black text-yellow-500 mr-2 rounded-lg hover:bg-gray-400 hover:text-black"
                onClick={handleUserLogin}
              >
                Login as User
              </button>
            </div>
            <div class=" text-yellow-500 text-center">
              <a href="#" class="hover:underline">
                Sign up Here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

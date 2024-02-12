import axios from "axios";
import React, { useState, useEffect } from "react";
import SideBar from "./main";
import Profile from "./profile";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

function Branches() {
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch branches when component mounts
    fetchBranches();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/branches");
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("deleting branch")
      await axios.delete(`http://localhost:8000/branches/delete/${id}`);
      fetchBranches(); // Refetch branches after deletion
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      await axios.post("http://localhost:8000/branches", formData);
      setFormData({ branchname:""}); // Clear form data
      fetchBranches(); // Refetch branches after adding new branch
      
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  };

  const handleDivClick = (branch) => {
    navigate(`/branches/BranchAssetCategories`, { state: { Branch: branch } });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      <div className="flex-col w-screen">
        {/* Profile bar */}
        <Profile />

        {/* Screen content */}
        <div className="flex-col space-y-5 max-w-auto sm:ml-0 md:ml-80 lg:ml-72 pl-4 pr-4 mt-16">
          <h2 className="text-4xl font-semibold">Branches</h2>
          <div className="max-w-auto mx-auto border-2 pl-2">
            <form onSubmit={handleSubmit} className="">
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="branchname"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Branch name
                  </label>
                  <input
                    type="text"
                    id="branchname"
                    name="branchname"
                    value={formData.branchname}
                    onChange={(e) => setFormData({name: e.target.value })}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-500"
                    placeholder="Enter Branch Name"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-2 py-2 mb-1 transition rounded-lg bg-black text-yellow-400 hover:bg-white hover:text-gray-800 border-2 border-gray-400 focus:outline-none"
              >
                Add
              </button>
            </form>
          </div>
          {/* Branches cards */}
          <section className="max-w-auto mx-auto px-4 sm:px-6 py-4 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:flex-grow gap-6">
              {branches.map((branch) => (
                <div
                key={branch._id}
                  className="w-full bg-white rounded-lg p-12 flex flex- shadow-xl lg:flex-grow-0 justify-center border border-gray-300 items-center"
                  
                >
                  <div className="text-center"
                  key={branch._id}
                  onClick={() => handleDivClick(branch.name)}
                  >
                    <p className="text-xl text-gray-700 font-bold mb-2">{branch.name}</p>
                    <p className="text-base text-gray-400 font-normal">AA Exchange</p>
                  </div>
                  <RiDeleteBin6Line className="ml-8 w-20 h-10" onClick={() => handleDelete(branch._id)} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Branches;

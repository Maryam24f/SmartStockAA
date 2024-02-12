import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SideBar from "./main";
import Profile from "./profile";
import BranchAssetModal from "./BranchAssetModal";

function BranchData() {
  const location = useLocation();
  const { state: props } = location;
  const cat = props.category;

  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/branches/${props.branch.branch}/${cat}`);
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchData();
  }, [props.branch.branch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredAssets = assets.filter((asset) => {
    const searchFields = [
      asset.name,
      asset.tag,
      asset.details,
      asset.type,
      asset.branch,
    ];
  
    return searchFields.some((field) =>
      (field ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-col w-screen">
        <Profile />
        <div className="flex-col sm:ml-0 md:ml-80 lg:ml-80 lg:mr-4 mt-16">
          <h2 className="text-4xl font-semibold">{props.branch.branch} {cat}</h2>
          <div className="flex justify-between">
            <div className="mt-4">
              <h className="font-bold">Search: </h>
              <input
                type="text"
                placeholder="Enter data"
                onChange={(e) => handleSearch(e.target.value)}
                className="p-2 border border-black rounded-md"
              />
            </div>
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-gray-200 border-2 border-black shadow-md bg-white rounded-md">
              <thead className="border border-black">
                <tr className="bg-black text-yellow-500 font-bold">
                  <td className="border border-black">Asset Name</td>
                  <td className="border border-black">
                    {cat === "consumable" ? "Quantity" : "Asset Tag"}
                  </td>
                  <td className="border border-black">Details</td>
                  <td className="border border-black">Type</td>
                  <td className="border border-black">Branch</td>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((a) => (
                  <tr key={a.id} className="border-black">
                    <td className="border border-black">{a.name}</td>
                    <td
                        className={`border border-black ${
                          a.quantity === 0 ? "bg-red-500" : ""
                        }`}
                      >
                        {cat === "consumable" ? a.quantity : a.tag}
                      </td>
                    <td className="border border-black">{a.details}</td>
                    <td className="border border-black">{a.type}</td>
                    <td className="border border-black">{a.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <BranchAssetModal />
    </div>
  );
}

export default BranchData;

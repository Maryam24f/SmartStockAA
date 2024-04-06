import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./main";
import Profile from "./profile";
import UassetModal from "./Uassetmodal";
import AssetAllocationModal from "./AssetAllocationModal";
import Us from './Umain'
import axios from 'axios';
import { useAuth } from "./AuthContext";
import AssetModal from "./AssetModal";
function UassetsList() {
  // Access userBranch from the AuthContext
  const { userBranch } = useAuth()
  // Use the useLocation hook to get the current location
  const location = useLocation();
  const {state: { category}} = location;
  // Array of options for the dropdown
  const options = ["Branches", "ISE", "F11", "G9"];
  // State to manage the dropdown state for each row

  // Function to handle opening/closing dropdown for a specific row
  const toggleDropdown = (index) => {
    setDropdownStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };
  // Access the state object from the location, which contains the props passed through navigation
  
  const cat = category;
  console.log("Location state:", location.state);
  console.log("Category value:", cat);
  // State to manage the list of assets
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    console.log("user: "+userBranch +"cat:"+ cat)
    fetchAssets()
  }, [category, userBranch]);
  
  const fetchAssets = async () => {
      
    try {
      if (userBranch && cat) {
        // Make an API call to fetch assets based on userBranch and category
        const response = await axios.get(`http://localhost:8000/branches/${userBranch}/${category}`);
        setAssets(response.data);
        console.log("response:" + assets)
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  
  
  // State to manage the dropdown state for each row
  const [dropdownStates, setDropdownStates] = useState(assets.map(() => false));
  const [selectedAllocation, setSelectedAllocation] =
    useState("...Branches...");

  // State to manage form input values
  const [formData, setFormData] = useState({
    status: "Not Allocated",
    name: "",
    tag: "",
    quantity:"",
    details: "",
    type: "",
    branch: "",
  });

  // State to manage the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
 
  const openAddModal = () => {
    setFormData({
      status: "Not Allocated",
      name: "",
      tag: "",
      quantity:"",
      details: "",
      type: "",
      branch: "",
    });
    setSelectedAssetId(null);
    setIsModalOpen(true);
  };

  const openUpdateModal = (assetId) => {
    const selectedAsset = assets.find((asset) => asset.id === assetId);
    setFormData({
      status: selectedAsset.status,
      name: selectedAsset.name,
      tag: selectedAsset.assetTag,
      quantity:selectedAsset.quantity,
      details: selectedAsset.details,
      type: selectedAsset.type,
      branch: selectedAsset.branch,
    });
    setSelectedAssetId(assetId);
    setIsModalOpen(true);
    setModalMode("update");
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
  };
  // Function to handle form submission (add asset)
  // Update the handleSaveAsset function to update the dropdown states when adding a new asset
  const handleSaveAsset = async () => {
    console.log(cat)
    // Assuming formData is an object
    const FormData = {
      ...formData,
      category: category,
      branch: userBranch,
      status: "Allocated"
    };

    try {
      var response;
        // Add new asset
        response = await axios.post(`http://localhost:8000/assets`,
          FormData,
        );
      console.log("API Response:", response.data);
        // Handle add
        const newAsset = response.data;
        setAssets([newAsset, ...assets]);
        console.log("cate"+category)
      

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving asset:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }

      // Handle error, show a message, or perform other actions as needed
    }
  };

  // Update the handleAllocateAsset function to handle dropdown state for all assets
  const handleAllocateAsset = (assetId, selectedBranch) => {
    // Toggle the dropdown state for the selected row
    setDropdownStates((prevStates) =>
      prevStates.map((state, index) => (index === assetId ? !state : state))
    );

    // Update the branch field for the selected asset
    setAssets((prevAssets) =>
      prevAssets.map((asset, index) =>
        index === assetId
          ? { ...asset, branch: selectedBranch, status: "Allocated" }
          : asset
      )
    );
    setDropdownStates([...dropdownStates, false]);
  };

  // Function to handle user deletion
  const handleDeleteAsset = (assetId) => {
    // Filter out the asset with the specified ID
    const updatedAssets = assets.filter((asset) => asset.id !== assetId);

    // Update the assets state without the deleted asset
    setAssets(updatedAssets);
  };
  // Function to handle pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;
  // const totalItems = assets.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const paginatedAssets = assets.slice(startIndex, endIndex);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  //...........................................................///

  //filter data//
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const filteredAssets = assets.filter((asset) => {
    const searchFields = [
      asset.name,
      asset.tag,
      asset.quantity,
      asset.details,
      asset.type,
      asset.status,
      asset.branch,
    ];
  
    return searchFields.some((field) => {
      // Check if the field is a string before calling toLowerCase()
    if (typeof field === 'string') {
      return field.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false; // Return false for non-string fields
  });
  });

  //////////// State to manage the allocation modal //////////////
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);

  // Function to handle opening the allocation modal
  const openAllocationModal = () => {
    setIsAllocationModalOpen(true);
  };

  // Function to handle closing the allocation modal
  const closeAllocationModal = () => {
    setIsAllocationModalOpen(false);
  };

  // Function to handle saving the allocation data
  const handleSaveAllocation = (date, branch) => {
    // Update the selected asset with allocation data
    const updatedAssets = [...assets];
    updatedAssets[selectedAssetId] = {
      ...updatedAssets[selectedAssetId],
      status: "Allocated",
      branch,
      allocationDate: date,
    };
    setAssets(updatedAssets);

    // Close the allocation modal
    closeAllocationModal();
  };
  
  ////////////////////////////////////////////////

  return (
    <div className="h-screen">
    <Us />
    {/* Asset type */}
    <div className="flex-col  max-w-auto sm:ml-0  pl-2 pr-4 overflow-y-auto">
          {/* Category */}
          <h2 className="text-4xl font-semibold mt-24">{cat}</h2>

          {/* Add button to open the modal */}
          <div className="flex justify-between">
            <button
              onClick={openAddModal}
              className="justify-start mt-4 px-2 py-2 transition rounded-lg bg-black text-yellow-400 hover:bg-white hover:text-gray-800 border-2 border-gray-200 focus:outline-none"
            >
              Add Asset
            </button>


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

          {/* Display your table */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-gray-200 border-2 border-black shadow-md bg-white rounded-md">
              <thead className="border border-black">
                <tr className="bg-black text-yellow-400 font-bold">
                  <td className="border border-black">Asset Name</td>
                  <td className="border border-black">
                  {cat === 'consumable' ? 'Quantity' : 'Asset Tag'}
                  </td>
                  <td className="border border-black">Details</td>
                  <td className="border border-black">Type</td>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((a, index) => (
                  <tr key={a.id} className="border-black">
                    <td className="border border-black">{a.name}</td>
                    <td className="border border-black">
                      {cat === 'consumable' ? a.quantity : a.tag}
                    </td>
                    <td className="border border-black">{a.details}</td>
                    <td className="border border-black">{a.type}</td>
                    {/*<td className="border border-black">
                       <div
                        className={`m-2 w-fit text-white font-bold pl-2 pr-2 h-fit rounded-lg pt-1
                     ${(() => {
                       switch (a.status) {
                         case "Allocated":
                           return "bg-red-600";
                         case "Not Allocated":
                           return "bg-green-600";
                         default:
                           return "";
                       }
                     })()}
                      `}
                      >
                        {a.status}
                      </div> 
                    </td>*/}
                    {/* <td className="border border-black">{a.branch}</td> */}
                    {/*  */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination controls */}
        {/* <div className="flex justify-end mt-4 mr-4 space-x-2">
          <div className="pl-16 text-lg ml-40 w-40 h-10 bg-white border-2 border-gray-700 rounded-md ">
            Page:{currentPage}
          </div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-2 mr-2 bg-gray-600 text-white rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-2 bg-gray-600 text-white rounded-lg"
          >
            Next
          </button>
        </div> */}
      

      {/* Render the modal */}
      <UassetModal
        isOpen={isModalOpen}
        closeModal={closeAddModal}
        onSave={handleSaveAsset}
        formData={formData}
        setFormData={setFormData}
        categ={category}
      />
      {/* Render the allocation modal */}
      {/* <AssetAllocationModal
        isOpen={isAllocationModalOpen}
        closeModal={closeAllocationModal}
        onSave={handleSaveAllocation}
        branches={options} // Pass the branches array to the modal
        
      /> */}
    </div>
  );
}

export default UassetsList;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SideBar from "./main";
import Profile from "./profile";
import AssetModal from "./AssetModal";
import AssetAllocationModal from "./AssetAllocationModal";
import AssetDetailsModal from "./AssetDeatilsModal";
function AssetsList() {
  const [allocationHistory, setAllocationHistory] = useState([]);
  // Use the useLocation hook to get the current location
  const location = useLocation();
  const {
    state: { category, catList, itList, fixList },
  } = location;

  const cat = category;
  const [assets, setAssets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByHistory, setFilterByHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchData(); // Fetch data when the category changes
    // Add other dependencies if needed for the useEffect
  }, [cat]);
  const fetchData = async () => {
    try {
      // Make a GET request to fetch assets based on the category
      const response = await axios.get(
        `http://localhost:8000/assets/category/${cat}`
      );
      setAssets(response.data);
      setFilteredData(response.data); // Assuming you want to show all data initially
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };
  // Array of options for the dropdown
  const [options, setOptions] = useState([]);
  useEffect(() => {
    // Fetch branches when component mounts
    fetchBranches();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/branches");
      console.log(response)
      setOptions(response.data);
      console.log(options)
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  // State to manage the dropdown state for each row

  // Function to handle opening/closing dropdown for a specific row
  const toggleDropdown = (index) => {
    setDropdownStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };
  // In the useEffect, update allocation history when the category changes
  useEffect(() => {
    const fetchAllocationHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/assets/allocation/history/${cat}`
        );
        setAllocationHistory(response.data);
      } catch (error) {
        console.error("Error fetching allocation history:", error);
      }
    };

    if (showHistory) {
      fetchAllocationHistory();
    } else {
      setAllocationHistory([]);
    }
  }, [cat, showHistory]);
  // State to manage the dropdown state for each row
  const [dropdownStates, setDropdownStates] = useState(assets.map(() => false));
  const [selectedAllocation, setSelectedAllocation] =
    useState("...Branches...");

  // State to manage form input values
  const [formData, setFormData] = useState({
    status: "",
    name: "",
    tag: "",
    quantity: "",
    details: "",
    type: "",
    branch: "",
  });

  // State to manage the modal //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAssetDetails, setSelectedAssetDetails] = useState(null);

  const openDetailsModal = (assetDetails) => {
    setSelectedAssetDetails(assetDetails);
    setIsDetailsModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({
      status: "",
      name: "",
      tag: "",
      quantity: "",
      details: "",
      type: "",
      branch: "",
    });
    setSelectedAssetId(null);
    setIsModalOpen(true);
    setModalMode("add"); // Set modal mode to "add"
  };

  const openUpdateModal = (assetId) => {
    const selectedAsset = assets.find((asset) => asset._id === assetId);

    if (selectedAsset) {
      setFormData({
        status: selectedAsset.status,
        name: selectedAsset.name,
        tag: selectedAsset.tag,
        quantity: selectedAsset.quantity,
        details: selectedAsset.details,
        type: selectedAsset.type,
        branch: selectedAsset.branch,
      });
      setSelectedAssetId(assetId);
      setIsModalOpen(true);
      setModalMode("update");
    } else {
      // Handle the case where no asset with the specified assetId is found
      console.error(`No asset found with id ${assetId}`);
    }
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
  };
  // Function to handle form submission (add asset)
  // Update the handleSaveAsset function to update the dropdown states when adding a new asset

  const handleSaveAsset = async () => {
    setFilterByHistory(false);
    setShowHistory(false);
    // Add or derive category and status based on your logic
    const category = String(cat); // Assuming cat is a variable passed from the previous page
    const status = "Not Allocated";

    // Assuming formData is an object
    const updatedFormData = {
      ...formData,
      category: category,
      status: status,
    };

    try {
      let response;

      if (modalMode === "update" && selectedAssetId !== null) {
        // Update existing asset
        response = await axios.put(
          `http://localhost:8000/assets/update/${selectedAssetId}`,
          updatedFormData,
          fetchData()
        );
      } else {
        // Add new asset
        response = await axios.post(
          "http://localhost:8000/assets",
          updatedFormData
        );
      }

      console.log("API Response:", response.data);

      if (modalMode === "update" && selectedAssetId !== null) {
        // Handle update
        const updatedAsset = response.data;
        const updatedAssets = assets.map((asset) =>
          asset.id === selectedAssetId ? updatedAsset : asset
        );
        setAssets(updatedAssets, ...assets);
        setFilteredData(updatedAssets, ...assets);
      } else {
        // Handle add
        const newAsset = response.data;
        setAssets([newAsset, ...assets]);
        setFilteredData([newAsset, ...assets]);
      }

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
  const handleDeleteAsset = async (assetId) => {
    console.log("Asset ID to delete:", assetId);
    try {
      // Make an API call to delete the asset
      await axios.delete(`http://localhost:8000/assets/delete/${assetId}`);

      // Update the state to reflect the deletion
      const updatedAssets = assets.filter((asset) => asset._id !== assetId);
      setFilterByHistory(false);
      setShowHistory(false);
      setAssets(updatedAssets);
      setFilteredData(updatedAssets);
      fetchData();
    } catch (error) {
      console.error("Error deleting asset:", error);
      // Handle error, show a message, or perform other actions as needed
    }
  };

  //filter data//
  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredAssets = assets.filter((asset) => {
      const searchFields = [
        asset.name,
        asset.tag,
        asset.details,
        asset.type,
        asset.status,
        asset.branch,
      ];

      const filteredSearchFields = searchFields.filter(field => field !== null && field !== undefined);
    
      return filteredSearchFields.some((field) =>
        (field ?? '').toLowerCase().includes(query.toLowerCase())
      );
    });
    
    setFilteredData(filteredAssets);
  };

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

  const handleSaveAllocation = async (date, branch, quantity) => {
    try {
      // Make an API call to allocate the asset

      const response = await axios.put(`http://localhost:8000/assets/allocate/${selectedAssetId}`,
        {
          date,
          branch,
          quantity,
        },
        // 
      );
      // setAssets(response.data)
      // setFilteredData(response.data)/
       fetchData()
       console.log(assets)

      closeAllocationModal();
    } catch (error) {
      console.error("Error allocating asset:", error);
      // Handle error, show a message, or perform other actions as needed
    }
  };

  const handleFilterByApproveProcess = async (value) => {
    setSearchQuery(""); // Clear the search query when applying filters
    setFilterByHistory(false);

    if (value === "History") {
      try {
        // Fetch allocation history data from the server based on the current category
        const response = await axios.get(
          `http://localhost:8000/allocation/history/${cat}`
        );

        // Update the state with the fetched allocation history data
        setAllocationHistory(response.data);
        setShowHistory(true);
      } catch (error) {
        console.error("Error fetching allocation history:", error);
        // Handle error, show a message, or perform other actions as needed
      }
    } else {
      // Continue with the existing logic to filter by status
      const filteredByApproveProcess = assets.filter(
        (row) => row.status === value
      );
      setFilteredData(filteredByApproveProcess);
      setShowHistory(false); // Set showHistory to false when filtering by status
    }
  };

  const Filter = (selectedValue) => {
    setSearchQuery(""); // Clear the search query when applying filters
    setFilterByHistory(false);
    setShowHistory(false);
    if (filterByHistory) {
      // Handle the logic for displaying the history table

      // Filter assets with status "Allocated" and sort by date in descending order
      const allocatedAssets = assets.filter(
        (row) => row.status === "Allocated"
      );
      const sortedAllocatedAssets = allocatedAssets.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // Create a new history array with cloned history records
      const historyData = sortedAllocatedAssets.map((row) => {
        return {
          ...row,
          branch: row.branch, // Set the branch for the history record
        };
      });

      setFilteredData(historyData);
    } else {
      // If no value is selected, show all data
      if (!selectedValue) {
        setFilteredData(assets);
      } else {
        // Filter data based on the selected value
        const filteredBySelectedValue = assets.filter(
          (row) => row.status === selectedValue
        );
        setFilteredData(filteredBySelectedValue);
      }
    }
  };

  ////////////////////////////////////////////////

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      <div className="flex-col w-screen">
        {/* Profile bar */}
        <Profile />

        {/* Screen content */}
        <div className="flex-col sm:ml-0 md:ml-80 lg:ml-80 lg:mr-4 mt-16">
          {/* Category */}
          <h2 className="text-4xl font-semibold">
            CATEGORY: <span className="text-yellow-500">{cat}</span>
          </h2>

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
          <div className="flex flex-wrap justify-between mt-1 mb-1 space-x-0 space-y-3 md:space-x-4 md:space-y-1 ">
            <div className="flex flex-wrap flex-grow  space-x-0 space-y-3 md:space-x-4 md:space-y-1">
              <button
                onClick={() => {
                  setFilterByHistory(false);
                  setShowHistory(false);
                  Filter("");
                }}
                className="w-full mt-1 md:w-32 h-10 bg-gray-600 hover:bg-gray-400 text-white rounded-lg mb-2 md:mb-0"
              >
                All
              </button>
              <button
                onClick={() => {
                  setShowHistory(false);
                  handleFilterByApproveProcess("Allocated");
                }}
                className="w-full md:w-32 h-10 bg-red-600 hover:bg-red-300 text-white rounded-lg mb-2 md:mb-0"
              >
                Allocated
              </button>
              <button
                onClick={() => {
                  setShowHistory(false);
                  handleFilterByApproveProcess("Not Allocated");
                }}
                className="w-full md:w-32 h-10 bg-green-600 hover:bg-green-400 text-white rounded-lg mb-2 md:mb-0"
              >
                Not Allocated
              </button>
            </div>
            <button
              onClick={() => {
                setShowHistory(true);
                setSearchQuery("");
                //setFilteredData(true)
                //Filter("Allocated");
              }}
              className="w-full md:w-32 h-10 text-yellow-500 font-bold hover:bg-yellow-400 bg-black rounded-lg mb-2 md:mb-0"
            >
              History
            </button>
          </div>

          {/* Display your table */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-yellow-100 border-2 border-black shadow-md bg-white rounded-md">
              <thead className="border border-black ">
                <tr className="bg-black text-yellow-500 font-bold">
                  <td className="border border-black">Asset Name</td>
                  <td className="border border-black">
                    {cat === "consumable" ? "Quantity" : "Asset Tag"}
                  </td>
                  <td className="border border-black">Details</td>
                  <td className="border border-black">Type</td>
                  <td className="border border-black">Status</td>
                  <td className="border border-black">Branch</td>
                  <td className="border border-black">
                    {showHistory ? "Date" : "Actions"}
                  </td>
                </tr>
              </thead>
              <tbody>
                {(showHistory ? allocationHistory : filteredData).map(
                  (a, index) => (
                    <tr key={a.id} className="border-black">
                      <td
                        className="border border-black"
                        onClick={() => openDetailsModal(a)}
                      >
                        {a.name}
                      </td>
                      <td
                        className={`border border-black ${
                          a.quantity === 0 ? "bg-red-500" : ""
                        }`}
                        onClick={() => openDetailsModal(a)}
                      >
                        {cat === "consumable" ? a.quantity : a.tag}
                      </td>

                      <td
                        className="border border-black"
                        onClick={() => openDetailsModal(a)}
                      >
                        {a.details}
                      </td>
                      <td
                        className="border border-black"
                        onClick={() => openDetailsModal(a)}
                      >
                        {a.type}
                      </td>
                      <td
                        className="border border-black"
                        onClick={() => openDetailsModal(a)}
                      >
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
                      </td>
                      <td
                        className="border border-black"
                        onClick={() => openDetailsModal(a)}
                      >
                        {a.branch}
                      </td>
                      <td className="border border-black space-y-1">
                        {showHistory ? (
                          a.date
                        ) : (
                          <>
                            <button
                              onClick={() => handleDeleteAsset(a._id)}
                              className="px-2 py-1 bg-black text-yellow-400 mr-2 rounded-lg"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => openUpdateModal(a._id)}
                              className="px-2 py-1 bg-black text-yellow-400 mr-2 rounded-lg"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAssetId(a._id);
                                openAllocationModal();
                              }}
                              className={`px-2 py-1 bg-black text-yellow-400 mr-2 rounded-lg`}
                              // disabled={a.status === "Allocated"}
                              // style={{
                              //   cursor:
                              //     a.status === "Allocated"
                              //       ? "not-allowed"
                              //       : "pointer",
                              // }}
                            >
                              Allocate
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                )}
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
      </div>

      {/* Render the modal */}
      <AssetModal
        isOpen={isModalOpen}
        closeModal={closeAddModal}
        onSave={handleSaveAsset}
        formData={formData}
        setFormData={setFormData}
        categ={cat}
      />
      {/* Render the allocation modal */}
      <AssetAllocationModal
        isOpen={isAllocationModalOpen}
        closeModal={closeAllocationModal}
        onSave={handleSaveAllocation}
        branches={options} // Pass the branches array to the modal
        category={category}
      />
      {/* Render the details modal */}
      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        closeModal={() => setIsDetailsModalOpen(false)}
        assetDetails={selectedAssetDetails}
        category={cat}
      />
    </div>
  );
}
export default AssetsList;

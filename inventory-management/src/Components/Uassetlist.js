import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./main";
import Profile from "./profile";
import UassetModal from "./Uassetmodal";
import AssetAllocationModal from "./AssetAllocationModal";
import Us from './Umain'
function UassetsList() {
  // Use the useLocation hook to get the current location
  const location = useLocation();

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
  const { state: props } = location;
  const cat = props.category;
  console.log("Category value:", cat);
  // State to manage the list of assets
  const [assets, setAssets] = useState([
    {
      id: 0,
      status: props.status,
      assetname: props.assetname,
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type: props.type,
      branch: "warehouse I9",
    },
    {
      id: 1,
      status: props.status,
      assetname: props.assetname,
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type: props.type,
      branch: "warehouse I9",
    },
    {
      id: 2,
      status: props.status,
      assetname: props.assetname,
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type: props.type,
      branch: "warehouse I9",
    },
    {
      id: 3,
      status: props.status,
      assetname: props.assetname,
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type: props.type,
      branch: "warehouse I9",
    },
    {
      id: 4,
      status: props.status,
      assetname: props.assetname,
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type: props.type,
      branch: "warehouse I9",
    },
    {
      id: 5,
      status: props.status,
      assetname: "table",
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type: 'table',
      branch: "warehouse I9",
    },
    {
      id: 6,
      status: props.status,
      assetname: "table",
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type: 'table',
      branch: "warehouse I9",
    },
    {
      id: 7,
      status: props.status,
      assetname: "table",
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type: "table",
      branch: "warehouse I9",
    },
    {
      id: 8,
      status: props.status,
      assetname: "Milk",
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type:'Milk',
      branch: "warehouse I9",
    },
    {
      id: 9,
      status: props.status,
      assetname: "Milk",
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type: 'Milk',
      branch: "warehouse I9",
    },
    {
      id: 10,
      status: props.status,
      assetname: "Milk",
      assetTag: props.assettag,
      quantity:props.quantity,
      details: props.specs,
      type: 'Milk',
      branch: "warehouse I9",
    },
  ]);
  // State to manage the dropdown state for each row
  const [dropdownStates, setDropdownStates] = useState(assets.map(() => false));
  const [selectedAllocation, setSelectedAllocation] =
    useState("...Branches...");

  // State to manage form input values
  const [formData, setFormData] = useState({
    status: "Not Allocated",
    assetname: "",
    assetTag: "",
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
      assetname: "",
      assetTag: "",
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
      assetname: selectedAsset.assetname,
      assetTag: selectedAsset.assetTag,
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
  const handleSaveAsset = () => {
    if (modalMode === "update" && selectedAssetId !== null) {
      // Update existing asset
      const updatedAssets = [...assets];
      const index = updatedAssets.findIndex(
        (asset) => asset.id === selectedAssetId
      );
      updatedAssets[index] = { id: selectedAssetId, ...formData };
      setAssets(updatedAssets);
    } else {
      // Add new asset
      const newAssetId = assets.length + 1;
      const newAsset = {
        id: newAssetId,
        status: "Not Allocated",
        ...formData,
      };
      // Unshift the new asset to the beginning of the assets array
      setAssets([newAsset, ...assets]);
      // Update dropdown states for the new asset
      setDropdownStates([false, ...dropdownStates]);
    }

    setIsModalOpen(false);
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
      asset.assetname,
      asset.assetTag,
      asset.quantity,
      asset.details,
      asset.type,
      asset.status,
      asset.branch,
    ];
  
    return searchFields.some((field) => {
      // Check if the field is defined before calling toLowerCase()
      return field && field.toLowerCase().includes(searchQuery.toLowerCase());
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
          <div className="flex justify-end">

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
                  {cat === 'Consumable Assets' ? 'Quantity' : 'Asset Tag'}
                  </td>
                  <td className="border border-black">Details</td>
                  <td className="border border-black">Type</td>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((a, index) => (
                  <tr key={a.id} className="border-black">
                    <td className="border border-black">{a.assetname}</td>
                    <td className="border border-black">
                      {cat === 'Consumable Assets' ? a.quantity : a.assetTag}
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
        categ={cat}
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

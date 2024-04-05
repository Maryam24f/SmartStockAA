import React, { useState, useEffect } from "react";
import SideBar from "./main";
import Profile from "./profile";
import axios from "axios";
function Maintenance() {
  const [Rlist, setRlist] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [totalId, setTotalId] = useState(null);
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState("requests"); 
  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch data from backend API when the component mounts
    fetchData();
    fetchMaint();
  }, []);

  const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8000/clist");
    if (response.ok) {
      const data = await response.json();
      setRlist(data); // Update state with fetched data
      console.log(Rlist);
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  const fetchMaint = async () => {
    try {
      const response = await fetch("http://localhost:8000/maint"); // Adjust the URL based on your backend setup
      if (response.ok) {
        const maint = await response.json();
        console.log("maintenance: "+maint)
        setData(maint); // Update state with fetched data
        setFilteredData(maint);
        console.log(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
   
  // State to manage the list of data
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedMonthDetails, setSelectedMonthDetails] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [ModalOpen, setModal] = useState(false);
  // State to manage the status for each month-branch combination
  const [statusByMonthBranch, setStatusByMonthBranch] = useState({});
  useEffect(() => {
    console.log("Updated statusByMonthBranch:", statusByMonthBranch);
  }, [statusByMonthBranch]);

  useEffect(() => {
    // Initialize statusByMonthBranch with values from rlist
    const initialStatusByMonthBranch = {};

    Rlist.forEach((item) => {
      const statusKey = `${item.month}-${item.branch}`;
      initialStatusByMonthBranch[statusKey] = item.status;
    });

    setStatusByMonthBranch(initialStatusByMonthBranch);
  }, [Rlist]); // Run this effect whenever rlist changes

  // Function to handle dropdown change for the second table
  const handleDropdownR = async (event, month, branch) => {
    const selectedStatus = event.target.value;
    const updatedRlist = Rlist.map((item) => {
      if (item.month === month && item.branch === branch) {
        return { ...item, status: selectedStatus };
      }
      return item;
    });
    setRlist(updatedRlist); // Update the state locally

    try {
      // Make a POST request using Axios to update the status value in the backend
      await axios.post("http://localhost:8000/clist/updateStatus", {
        month,
        branch,
        status: selectedStatus,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusForMonthAndBranch = (month, branch) => {
    // Check if the status exists for the given month and branch combination
    const statusKey = `${month}-${branch}`;
    console.log("Checking status for key:", statusKey);

    if (statusByMonthBranch[statusKey]) {
      console.log("Status found:", statusByMonthBranch[statusKey]);
      return statusByMonthBranch[statusKey];
    }

    // If status does not exist, return an empty string or a default value
    console.log("Status not found, returning default value.");
    return "";
  };
  // useEffect(() => {
  //   console.log("id" + totalId + "nmbr" + total);
  //   updateTotalById(totalId, total);
  // }, [totalId, total]);
  const [dataUpdated, setDataUpdated] = useState(false);
  // Function to update total by ID
  const updateTotalById = async (id, total) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/clist/updateTotal/${id}/${total}`,
        { total }
      );
      console.log("Total updated:", response.data);
    } catch (error) {
      console.error("Error updating total:", error);
    }
  };

  // Function to update totalSum by month and branch
  const updateTotalSumByMonthAndBranch = async (month, branch, totalSum) => {
    try {
      await axios.put("http://localhost:8000/clist/updateTotalSum", {
        month,
        branch,
        totalSum,
      });
      console.log("TotalSum updated successfully");
    } catch (error) {
      console.error("Error updating totalSum:", error);
    }
  };

  const handleShowDetails = (selectedMonth, branch) => {
    const selectedData = Rlist.filter(
      (item) => item.month === selectedMonth && item.branch === branch
    );
    setSelectedMonthDetails(selectedData);
    setSelectedBranch(branch);
    setModal(true);
  };

  //////list details//////
  // State variables for managing form input values
  const [editFormData, setEditFormData] = useState({
    Aname: "",
    au: "",
    month: "",
    quantity: "",
    amount: "",
  });

  // State to manage modal visibility and edited row data
const [editModalOpen, setEditModalOpen] = useState(false);
const [selectedRowData, setSelectedRowData] = useState(null);

/// Function to handle opening the edit modal
const handleEditClick = (rowData) => {
  console.log("edit123: " + rowData._id)
  // Set the data of the row being edited to the edit form data state
  setEditFormData({
    id: rowData._id,
    Aname: rowData.Aname,
    au: rowData.au,
    month: rowData.month,
    quantity: rowData.quantity,
    amount: rowData.amount,
  });
  // Open the edit modal
  setEditModalOpen(true);
};

// Function to handle closing the edit modal
const handleEditModalClose = () => {
  setSelectedRowData(null); // Clear the selected row data
  setEditModalOpen(false); // Close the edit modal
};
  // Function to handle updating the record in the database
  const handleUpdateClick = async (id) => {
    try {
      console.log(id)
      // Make a PUT request using Axios to update the record in the backend
      await axios.post(`http://localhost:8000/clist/update/${id}`, editFormData); // Remove editRowId

      // Refetch data after updating the record
      fetchData();
      // Close the edit modal
      handleEditModalClose();
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  // Function to handle form input changes within the edit modal
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const ListDetails = ({ selectedMonthDetails}) => {
    const totalSum = selectedMonthDetails.reduce(
      (total, item) => total + item.amount * item.quantity,
      0
    );
    setTotalSum(totalSum);
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-4 -mt-96 ml-0 md:ml-60 rounded-lg max-w-4xl w-full sm:w-11/12 overflow-auto">
          <h2 className="text-yellow-500 font-bold text-2xl mb-4">
            List Details
          </h2>
          <div className="overflow-x-auto">
          <div className="max-h-96 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 border-2 border-black shadow-md bg-white rounded-md">
              <thead className="border border-black">
                <tr className="text-black font-bold">
                  <th className="border border-black">Particulars</th>
                  <th className="border border-black">A/U</th>
                  <th className="border border-black">Month</th>
                  <th className="border border-black">Quantity</th>
                  <th className="border border-black">Amount</th>
                  <th className="border border-black">Total</th>
                  <th className="border border-black">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedMonthDetails &&
                  selectedMonthDetails.map((item) => {
                    const itemTotal = item.amount * item.quantity;
                    // Update total by ID
                       updateTotalById(item._id, itemTotal);

                    return (
                      <tr key={item._id} className="border-black">
                        <td className="border border-black">{item.Aname}</td>
                        <td className="border border-black">{item.au}</td>
                        <td className="border border-black">{item.month}</td>
                        <td className="border border-black">{item.quantity}</td>
                        <td className="border border-black">{item.amount}</td>
                        <td className="border border-black">{itemTotal}</td>
                        <td className="border border-black space-y-1">
                            <button
                              className="px-2 py-1 bg-black text-yellow-400 mr-2 rounded-lg" 
                              onClick={() => handleEditClick(item)}>
                              Edit
                            </button>
                        </td> 
                      </tr>
                    );
                  })}
                <tr>
                  <td colSpan="5" className="text-left font-bold">
                    Total:
                  </td>
                  <td className="border border-black font-bold">{totalSum}</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
          <button
            onClick={() => setModal(false)}
            className="mt-4 p-3 bg-black rounded-md text-white w-full font-semibold"
          >
            Close
          </button>
        </div>
        {/* Edit modal */}
        {editModalOpen && (
          
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 ml-0 lg:ml-52 -mt-28 rounded-lg">
              <h2 className="text-yellow-500 font-bold text-2xl mb-4">Edit Record</h2>
              <div className="space-y-4">
                <div className="space-x-6">
                <label className="font-bold">Particulars:</label>
                <input
                  type="text"
                  name="Aname"
                  value={editFormData.Aname}
                  onChange={handleEditInputChange}
                  className="border-2 "
                  placeholder="Particulars"
                />
                </div>
                <div className="space-x-20">
                <label className="font-bold">AU:</label>
                <input
                  type="text"
                  name="au"
                  value={editFormData.au}
                  onChange={handleEditInputChange}
                  className="border-2"
                  placeholder="A/U"
                />
                </div>
                <div className="space-x-12">
                <label className="font-bold">Month:</label>
                <input
                  type="text"
                  name="month"
                  value={editFormData.month}
                  onChange={handleEditInputChange}
                  className="border-2"
                  placeholder="Month"
                />
                </div>
                <div className="space-x-8">
                <label className="font-bold">Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={editFormData.quantity}
                  onChange={handleEditInputChange}
                  className="border-2"
                  placeholder="Quantity"
                />
                </div>
                <div className="space-x-10">
                <label className="font-bold">Amount:</label>
                <input
                  type="number"
                  name="amount"
                  value={editFormData.amount}
                  onChange={handleEditInputChange}
                  className="border-2"
                  placeholder="Amount"
                />
                </div>
                <div className="flex justify-between">
                  <button onClick={() => handleUpdateClick(editFormData.id)} className="mt-4 p-3 bg-black text-yellow-400 rounded-md font-semibold" >
                    Update
                  </button>
                  <button onClick={handleEditModalClose} className="mt-4 p-3 bg-black rounded-md text-white font-semibold">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      

      </div>
      
    );
  };

  const uniqueMonths = new Set();

  // Populate the Set with unique months
  Rlist.forEach((row) => {
    uniqueMonths.add(row.month);
  });

  // State to manage the selected value
  const [filteredData, setFilteredData] = useState([...data]);
  const [searchQuery, setSearchQuery] = useState("");
  const options = ["", "In process", "Accepted", "Rejected"];
  const options2 = ["", "In process", "Accepted", "Rejected"];

  useEffect(() => {
    // Apply search filter whenever searchQuery or data changes
    const filteredAssets = data.filter((row) =>
      Object.values(row).some(
        (field) =>
          field &&
          typeof field === "string" &&
          field.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filteredAssets);
  }, [searchQuery, data]);

  const handleFilterByApproveProcess = (value) => {
    setSearchQuery(""); // Clear the search query when applying filters

    if (activeTab === "requests") {
      // Filter data list
      const filteredData = data.filter((row) => row.status === value);
      setFilteredData(filteredData);
    } else {
      // Filter Rlist
      const filteredR = Rlist.filter((row) => row.status === value);
      setFilteredData(filteredR);
    }
  };
  ///////////////////////////
  // ... (your imports and other code)

  function Maintenance() {
    // ... (your existing code)
    // ... (rest of your code)
  }

  const handleDropdownChange = async (event, id) => {
    const selectedValue = event.target.value;
    try {
      await axios.post("http://localhost:8000/maint/updateStatus", {
        id,
        status: selectedValue,
      });
      // Refetch data after updating status
      fetchMaint();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const openImageInNewWindow = (bill) => {
    const { contentType, data } = bill;
    console.log("Image Data:", bill);

    // Convert data to base64
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const base64Data = fileReader.result;
      console.log("Base64 Data:", base64Data);

      // Open image in new window
      const newWindow = window.open();
      newWindow.document.write(`<img className="w-20 h-9" src="${base64Data}" alt="Bill" />`);
    };

    // Read data as DataURL
    const blob = new Blob([new Uint8Array(data.data)], { type: contentType });
    fileReader.readAsDataURL(blob);
  };

  // State to manage form input values
  const [formData, setFormData] = useState({
    branch: "",
    assetTag: "",
    assetName: "",
    supplier: "",
    startDate: "",
    cost: "",
  });

  // Function to handle form submission (add data)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique ID for the new data
    const newDataId = data.length;

    // Create a new data object with the form data and generated ID
    const newData = {
      id: newDataId,
      branch: formData.branch,
      assetTag: formData.assetTag,
      assetName: formData.assetName,
      supplier: formData.supplier,
      startDate: formData.startDate,
      cost: formData.cost,
    };

    // Update the data state with the new data
    setData([, newData, ...data]);

    // Clear the form input values
    setFormData({
      branch: "",
      assetTag: "",
      assetName: "",
      supplier: "",
      startDate: "",
      cost: "",
    });
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the formData state with the new input value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //filter data//
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const Filter = (...values) => {
    setSearchQuery(""); // Clear the search query when applying filters

    // If no values are selected, show all data
    if (values.length === 0) {
      setFilteredData(data);
      return;
    }

    // Filter data based on all selected values
    const filteredByApproveProcess = data.filter((row) =>
      values.includes(row.status)
    );
    setFilteredData(filteredByApproveProcess);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      <div className="flex-col w-screen">
        {/* Profile bar */}
        <Profile />

        {/* Screen content */}
        <div className="flex-col ml-2 md:ml-80 lg:ml-80 mr-2 lg:mr-4 mt-16 space-y-4">
          <h2 className="text-4xl font-semibold">Maintenance</h2>

          <div className="grid gap-0 lg:grid-cols-2 sm:ml-8 sm:mr-8 lg:ml-32 lg:mr-32 md:ml-32 md:mr-32">
            <div
              onClick={() => setActiveTab("requests")}
              className="justify-center cursor-pointer items-center p-2 mt-2 rounded-xl group sm:flex border hover:border-gray-200 space-x-0 text-black bg-yellow-500 shadow-xl hover:bg-yellow-400 hover:text-black"
            >
              <div className="sm:w-auto">
                <div className="space-y-4">
                  <h4 className="text-2xl font-semibold">Asset Requests</h4>
                </div>
              </div>
            </div>

            <div
              onClick={() => setActiveTab("consumables")}
              className="justify-center cursor-pointer items-center p-2 lg:mt-2 mt-4 rounded-xl group sm:flex border hover:border-gray-200 space-x-0 text-black bg-yellow-500 shadow-xl hover:bg-yellow-400 hover:text-black"
            >
              <div className="sm:w-auto">
                <div className="space-y-4">
                  <h4 className="text-2xl font-semibold text-yellow">
                    Consumable List
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {activeTab === "requests" && (
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-1">
              <div className="flex flex-wrap space-x-0 space-y-3 md:space-x-4 md:space-y-1 ">
                <button
                  onClick={() =>
                    Filter("", "Accepted", "In process", "Rejected")
                  }
                  className="w-full mt-1 md:w-32 h-10 bg-gray-600 hover:bg-gray-400 text-white rounded-lg mb-2 md:mb-0"
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterByApproveProcess("")}
                  className="w-full md:w-32 h-10 bg-yellow-500 hover:bg-yellow-700 text-white rounded-lg mb-2 md:mb-0"
                >
                  New
                </button>
                <button
                  onClick={() => handleFilterByApproveProcess("In process")}
                  className="w-full md:w-32 h-10 bg-orange-300 hover:bg-orange-600 text-white rounded-lg mb-2 md:mb-0"
                >
                  In process
                </button>
                <button
                  onClick={() => handleFilterByApproveProcess("Accepted")}
                  className="w-full md:w-32 h-10 bg-green-400 hover:bg-green-600 text-white rounded-lg mb-2 md:mb-0"
                >
                  Accepted
                </button>
                <button
                  onClick={() => handleFilterByApproveProcess("Rejected")}
                  className="w-full md:w-32 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Rejected
                </button>
              </div>
              <div className="md:mt-2">
                <h className="font-bold">Search: </h>
                <input
                  type="text"
                  placeholder="Enter data"
                  onChange={(e) => handleSearch(e.target.value)}
                  className="p-2 border border-black rounded-md w-full md:w-auto"
                />
              </div>
            </div>
          )}
          {/* Display your table */}
          {activeTab === "requests" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border-2 border-black shadow-md bg-white rounded-md">
                <thead className="border border-black">
                  <tr className="bg-black text-yellow-500 font-bold">
                    <td className="border border-black">Branch Name</td>
                    <td className="border border-black">Asset Category</td>
                    <td className="border border-black">Asset Type</td>
                    <td className="border border-black">Asset Tag</td>
                    <td className="border border-black">Asset Name</td>
                    <td className="border border-black">Supplier</td>
                    <td className="border border-black">Date</td>
                    <td className="border border-black">Cost</td>
                    <td className="border border-black">Bill</td>
                    <td className="border border-black">Demand</td>
                    <td className="border border-black">Approve Process</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr key={row.id} className="border-black">
                      <td className="border border-black">{row.branch}</td>
                      <td className="border border-black">{row.category}</td>
                      <td className="border border-black">{row.type}</td>
                      <td className="border border-black">{row.tag}</td>
                      <td className="border border-black">{row.name}</td>
                      <td className="border border-black">{row.supplier}</td>
                      <td className="border border-black">{row.date}</td>
                      <td className="border border-black">{row.cost}</td>
                      <td className="border border-black">
                      <a href="#" onClick={() => openImageInNewWindow(row.bill)}>
                      <img
                        src={`data:${row.bill.contentType};base64,${btoa(
                          String.fromCharCode(
                            ...new Uint8Array(row.bill.data.buffer)
                          )
                        )}`}
                        alt="Bill"
                      />
                    </a>
                      </td>

                      <td className="border border-black">{row.demand}</td>
                      <td className="border border-black pl-2">
                        <select
                          className=""
                          id={`dropdown-${row._id}`}
                          value={row.status}
                          onChange={(e) => handleDropdownChange(e, row._id)}
                        >
                          {options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <p
                          className={`font-extrabold pl-4 ${(() => {
                            switch (row.status) {
                              case "Rejected":
                                return "bg-red-600";
                              case "Accepted":
                                return "bg-green-400";
                              case "In process":
                                return "bg-orange-300";
                              default:
                                return "";
                            }
                          })()}`}
                        >
                          {row.status}
                        </p>
                      </td>
                      {/* <td>
                  <div className='flex-col space-x-2'>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className='px-2 py-2 transition rounded-lg bg-gray-600 text-white hover:bg-white hover:text-gray-800 border-2 border-gray-200 focus:outline-none'
                    >
                      Delete
                    </button>
                    <button
                     className='px-2 py-2 transition rounded-lg bg-gray-600 text-white hover:bg-white hover:text-gray-800 border-2 border-gray-200 focus:outline-none'
                    >
                      Update
                    </button>
                  </div>
                </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border-2 border-black shadow-md bg-white rounded-md">
                <thead className="border border-black">
                  <tr className="bg-black text-yellow-400 font-bold">
                    <td className="border border-black">Month</td>
                    <td className="border border-black">Branch</td>
                    <td className="border border-black">Status</td>
                  </tr>
                </thead>
                <tbody>
                  {/* Iterate over unique month-branch combinations */}
                  {[...uniqueMonths].map((month) => {
                    // Get all unique branches for the current month
                    const branchesForMonth = Rlist.filter(
                      (item) => item.month === month
                    )
                      .map((item) => item.branch)
                      .filter(
                        (value, index, self) => self.indexOf(value) === index
                      );

                    // Render rows for each branch within the current month
                    return branchesForMonth.map((branch, index) => {
                      // Get the status for the current month and branch
                      const status = getStatusForMonthAndBranch(month, branch);

                      return (
                        <tr key={`${month}-${branch}`} className="border-black">
                          {/* Render month only for the first branch */}
                          {index === 0 && (
                            <td
                              className="border border-black"
                              rowSpan={branchesForMonth.length}
                            >
                              {month}
                            </td>
                          )}
                          {/* Render branch */}
                          <td
                            className="border border-black"
                            onClick={() => handleShowDetails(month, branch)}
                          >
                            {branch}
                          </td>
                          {/* Render status */}
                          <td className="border border-black">
                            <select
                              className=""
                              value={status}
                              onChange={(e) =>
                                handleDropdownR(e, month, branch)
                              }
                            >
                              {options2.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <p
                              className={`font-extrabold w-auto pl-4 ${(() => {
                                switch (status) {
                                  case "Rejected":
                                    return "bg-red-600";
                                  case "Accepted":
                                    return "bg-green-400";
                                  case "In process":
                                    return "bg-orange-300";
                                  default:
                                    return "";
                                }
                              })()}`}
                            >
                              {status}
                            </p>
                          </td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
            </div>
          )}
          {/* Conditionally render ListDetails */}
          {ModalOpen && (
            <ListDetails selectedMonthDetails={selectedMonthDetails}
            branch={selectedBranch} />
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Maintenance;

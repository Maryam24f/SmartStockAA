import React, { useState, useEffect } from "react";
import SideBar from "./main";
import Profile from "./profile";
import bill from "../Assets/bill.jpg";
function Maintenance() {
  // State to manage the list of data
  const [activeTab, setActiveTab] = useState("requests"); // State to track active tab
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedMonthDetails, setSelectedMonthDetails] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [ModalOpen, setModal] = useState(false);
  // State to manage the status for each month-branch combination
  const [statusByMonthBranch, setStatusByMonthBranch] = useState({});

  const handleDropdownR = (event, month, branch) => {
    const updatedStatusByMonthBranch = { ...statusByMonthBranch };

    // Update the status for the specific month and branch with the selected value
    updatedStatusByMonthBranch[`${month}-${branch}`] = event.target.value;
    setStatusByMonthBranch(updatedStatusByMonthBranch);
  };

  // Function to get status for a specific month and branch
  const getStatusForMonthAndBranch = (month, branch) => {
    // Check if the status exists for the given month and branch combination
    const statusKey = `${month}-${branch}`;
    if (statusByMonthBranch[statusKey]) {
      return statusByMonthBranch[statusKey];
    }
    // If status does not exist, return an empty string or a default value
    return "";
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
  const ListDetails = ({ selectedMonthDetails, branch }) => {
    const totalSum = selectedMonthDetails.reduce((total, item) => total + (item.amount * item.quantity), 0);
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg max-w-4xl w-full sm:w-11/12">
          <h2 className="text-yellow-500 font-bold text-2xl mb-4">
            List Details
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border-2 border-black shadow-md bg-white rounded-md">
              <thead className="border border-black">
                <tr className="text-black font-bold">
                  <th className="border border-black">Particulars</th>
                  <th className="border border-black">A/U</th>
                  <th className="border border-black">Month</th>
                  <th className="border border-black">Quantity</th>
                  <th className="border border-black">Amount</th>
                  <th className="border border-black">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedMonthDetails &&
                  selectedMonthDetails.map((item) => (
                    <tr key={item.id} className="border-black">
                      <td className="border border-black">{item.Aname}</td>
                      <td className="border border-black">{item.au}</td>
                      <td className="border border-black">{item.month}</td>
                      <td className="border border-black">{item.quantity}</td>
                      <td className="border border-black">{item.amount}</td>
                      <td className="border border-black">
                        {item.amount * item.quantity}
                      </td>
                    </tr>
                  ))}
                  <tr>
                <td colSpan="5" className="text-left font-bold">Total:</td>
                <td className="border border-black font-bold">{totalSum}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <button
            onClick={() => setModal(false)}
            className="mt-4 p-3 bg-black rounded-md text-white w-full font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  const [Rlist, setRlist] = useState([
    {
      id: 0,
      branch: "ISE", // Branch Name
      ACategory: "IT", // Asset Category
      Aname: "Papers", // Asset Type
      au: "rim",
      month: "2024-01-23", // Date
      quantity: "50",
      amount: "145", // Cost
      status: "",
    },
    {
      id: 1,
      branch: "ISE", // Branch Name
      ACategory: "consuamble", // Asset Category
      Aname: "Milk", // Asset Type
      au: "rim",
      month: "2024-01-23", // Date
      quantity: "10",
      amount: "145", // Cost
      status: "",
    },
    {
      id: 2,
      branch: "ISE", // Branch Name
      ACategory: "IT", // Asset Category
      Aname: "Tea", // Asset Type
      au: "rim",
      month: "2024-01-23", // Date
      quantity: "20",
      amount: "145", // Cost
      status: "",
    },
    {
      id: 3,
      branch: "G9", // Branch Name
      ACategory: "IT", // Asset Category
      Aname: "max", // Asset Type
      au: "rim",
      month: "2024-01-23", // Date
      quantity: "10",
      amount: "145", // Cost
      status: "",
    },
    {
      id: 4,
      branch: "G9", // Branch Name
      ACategory: "consuamble", // Asset Category
      Aname: "glint", // Asset Type
      au: "rim",
      month: "2024-01-23", // Date
      quantity: "30",
      amount: "145", // Cost
      status: "",
    },
    {
      id: 5,
      branch: "G9", // Branch Name
      ACategory: "IT", // Asset Category
      Aname: "Garbage bag", // Asset Type
      au: "rim",
      month: "2024-01-23", // Date
      quantity: "5",
      amount: "145", // Cost
      status: "",
    },
  ]);
  const [data, setData] = useState([
    {
      id: 0,
      branch: "Ise",
      ACategory: "IT",
      AType: "LCD",
      assetTag: "5003456",
      assetName: "LCD1",
      supplier: "abc",
      startDate: "12/08/2023",
      cost: "Rs: 5000",
      selectedValue: "",
      demand: "New",
      file: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Frestaurant-bill&psig=AOvVaw3R39YTb0TYLRkK6gc5UO6X&ust=1702711830614000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLCn3YL2kIMDFQAAAAAdAAAAABAD",
    },
    {
      id: 1,
      branch: "F9",
      ACategory: "IT",
      AType: "LCD",
      assetTag: "5003456",
      assetName: "LCD1",
      supplier: "abc",
      startDate: "12/08/2023",
      cost: "Rs: 5000",
      selectedValue: "Completed",
      demand: "Repair",
      file: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Frestaurant-bill&psig=AOvVaw3R39YTb0TYLRkK6gc5UO6X&ust=1702711830614000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLCn3YL2kIMDFQAAAAAdAAAAABAD",
    },
    {
      id: 2,
      branch: "G10",
      ACategory: "IT",
      AType: "LCD",
      assetTag: "5003456",
      assetName: "LCD1",
      supplier: "abc",
      startDate: "12/08/2023",
      cost: "Rs: 5000",
      selectedValue: "In process",
      demand: "New",
      file: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Frestaurant-bill&psig=AOvVaw3R39YTb0TYLRkK6gc5UO6X&ust=1702711830614000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLCn3YL2kIMDFQAAAAAdAAAAABAD",
    },
    {
      id: 3,
      branch: "G10",
      ACategory: "IT",
      AType: "LCD",
      assetTag: "5003456",
      assetName: "LCD1",
      supplier: "abc",
      startDate: "12/08/2023",
      cost: "Rs: 5000",
      selectedValue: "Rejected",
      demand: "New",
      file: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Frestaurant-bill&psig=AOvVaw3R39YTb0TYLRkK6gc5UO6X&ust=1702711830614000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLCn3YL2kIMDFQAAAAAdAAAAABAD",
    },
  ]);
  const uniqueMonths = new Set();

  // Populate the Set with unique months
  Rlist.forEach((row) => {
    uniqueMonths.add(row.month);
  });

  // State to manage the selected value
  const [filteredData, setFilteredData] = useState([...data]);
  const [searchQuery, setSearchQuery] = useState("");
  const options = ["", "In process", "Completed", "Rejected"];
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

    const filteredByApproveProcess = data.filter(
      (row) => row.selectedValue === value
    );
    setFilteredData(filteredByApproveProcess);
  };
  ///////////////////////////
  // ... (your imports and other code)

  function Maintenance() {
    // ... (your existing code)
    // ... (rest of your code)
  }

  const handleDropdownChange = (event, rowId) => {
    const updatedData = data.map((row) =>
      row.id === rowId ? { ...row, selectedValue: event.target.value } : row
    );
    setData(updatedData);
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
      values.includes(row.selectedValue)
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
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-1">
            <div className="flex flex-wrap space-x-0 space-y-3 md:space-x-4 md:space-y-1 ">
              <button
                onClick={() =>
                  Filter("", "Completed", "In process", "Rejected")
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
                onClick={() => handleFilterByApproveProcess("Completed")}
                className="w-full md:w-32 h-10 bg-green-400 hover:bg-green-600 text-white rounded-lg mb-2 md:mb-0"
              >
                Completed
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
                      <td className="border border-black">{row.ACategory}</td>
                      <td className="border border-black">{row.AType}</td>
                      <td className="border border-black">{row.assetTag}</td>
                      <td className="border border-black">{row.assetName}</td>
                      <td className="border border-black">{row.supplier}</td>
                      <td className="border border-black">{row.startDate}</td>
                      <td className="border border-black">{row.cost}</td>
                      <td className="border border-black">
                        <a
                          href={bill}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img className="w-20 h-9" src={bill} alt="Bill" />
                        </a>
                      </td>

                      <td className="border border-black">{row.demand}</td>
                      <td className="border border-black pl-2">
                        <select
                          className=""
                          id={`dropdown-${row.id}`}
                          value={row.selectedValue}
                          onChange={(e) => handleDropdownChange(e, row.id)}
                        >
                          {options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <p
                          className={`font-extrabold pl-4 ${(() => {
                            switch (row.selectedValue) {
                              case "Rejected":
                                return "bg-red-600";
                              case "Completed":
                                return "bg-green-400";
                              case "In process":
                                return "bg-orange-300";
                              default:
                                return "";
                            }
                          })()}`}
                        >
                          {row.selectedValue}
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
                  {/* Render unique month-branch combinations */}
                  {[...uniqueMonths].map((month) => {
                    // Use a Set to store unique branches for the current month
                    const uniqueBranches = new Set();

                    return (
                      <React.Fragment key={month}>
                        {Rlist.map((item) => {
                          // Check if the item's month matches the current month
                          if (item.month === month) {
                            // Check if the branch is unique for the current month
                            if (!uniqueBranches.has(item.branch)) {
                              // Add the branch to the Set to mark it as seen
                              uniqueBranches.add(item.branch);

                              return (
                                <tr
                                  key={`${month}-${item.branch}`}
                                  className="border-black"
                                >
                                  {/* Render month */}
                                  <td
                                    className="border border-black"
                                    onClick={() =>
                                      handleShowDetails(month, item.branch)
                                    }
                                    rowSpan={uniqueBranches.size} // Set row span for the month
                                  >
                                    {month}
                                  </td>
                                  {/* Render branch */}
                                  <td className="border border-black">
                                    {item.branch}
                                  </td>
                                  {/* Render status */}
                                  <td className="border border-black">
                                    <select
                                      className=""
                                      value={getStatusForMonthAndBranch(
                                        month,
                                        item.branch
                                      )}
                                      onChange={(e) =>
                                        handleDropdownR(e, month, item.branch)
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
                                        switch (
                                          getStatusForMonthAndBranch(
                                            month,
                                            item.branch
                                          )
                                        ) {
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
                                      {getStatusForMonthAndBranch(
                                        month,
                                        item.branch
                                      )}
                                    </p>
                                  </td>
                                </tr>
                              );
                            } else {
                              // If the branch is not unique, return null to skip rendering
                              return null;
                            }
                          } else {
                            // If the item's month does not match the current month, return null to skip rendering
                            return null;
                          }
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {/* Conditionally render ListDetails */}
          {ModalOpen && (
            <ListDetails selectedMonthDetails={selectedMonthDetails} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Maintenance;

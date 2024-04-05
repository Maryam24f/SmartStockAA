import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import Us from "./Umain";
import Graph from "./graph";
import Chart from "chart.js/auto";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { CircleLoader } from 'react-spinners';
function Ureport() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [ModalOpen, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonthDetails, setSelectedMonthDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("requests"); // State to track active tab
  const [selectedRow, setSelectedRow] = useState(null); // State to track selected row for modal
  const [Rlist, setRlist] = useState([]);
  const { userBranch, userEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Fetch data from backend API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("user" + userBranch);
    try {
      const response = await axios.get(
        `http://localhost:8000/clist/${userBranch}`
      );
      if (response.status === 200) {
        setRlist(response.data); // Update state with fetched data
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [formData, setFormData] = useState({
    Aname: "", // Asset Type
    month: "", // Date
    au: "",
    quantity: "", // Cost
    amount: "",
  });

  const [showForm, setShowForm] = useState(true);
  const [showRequests, setShowRequests] = useState(false);
  const [showGraph, setshowGrap] = useState(false);
  // Define a list of predefined items for the dropdown
  const [predefinedItems, setPredefinedItems] = useState([]);
  useEffect(() => {
    // Fetch data from backend API when the component mounts
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/assets/consumable`
      );
      console.log(response.data);
      if (response.status === 200) {
        // Remove duplicates based on asset name
        const uniqueAssets = response.data.reduce((acc, curr) => {
          if (!acc.find((item) => item.name === curr.name)) {
            acc.push(curr);
          }
          return acc;
        }, []);

        // Add "Other" option at the end
        const assetsWithOtherOption = [
          ...uniqueAssets,
          { _id: "other", name: "other" },
        ];

        setPredefinedItems(assetsWithOtherOption); // Update state with fetched data
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // State to manage the selected item in the dropdown
  const [selectedItem, setSelectedItem] = useState("");
  // State to manage the user input for "Other" option
  const [otherItem, setOtherItem] = useState("");
  const handleDivClick = (data) => {
    navigate(`/Uassets/Uassetslist`, { state: data });
  };
  // Function to handle user deletion
  const handleDelete = (rowId) => {
    // Filter out the user with the specified ID
    const updatedRow = Rlist.filter((row) => row.id !== rowId);

    // Update the users state without the deleted user
    setRlist(updatedRow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newdata = {
      ...formData,
      email: userEmail,
      branch: userBranch,
      Aname: selectedItem === "other" ? otherItem : selectedItem,
    };
    e.preventDefault();
    console.log(newdata);
    try {
      await axios.post("http://localhost:8000/clist", newdata);
      setFormData({
        Aname: "", // Asset Type
        month: "", // Date
        au: "",
        quantity: "", // Cost
        amount: "",
      });
      fetchData(); // Refetch branches after adding new branch
      setSelectedItem("");
      setOtherItem("");
      closeModal();
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  };
  const handleSent = async (e) => {
    e.preventDefault();
    const branch = userBranch;
    console.log(branch);
    try {
      setLoading(true);
      console.log(loading)
      await axios.post("http://localhost:8000/clist/send", { branch });
      console.log("Request sent successfully");
      console.log("ModalOpen before setting to false:", ModalOpen);
      setLoading(false);
      setModal(false);
      console.log("ModalOpen after setting to false:", ModalOpen);
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  };

  const handleCancelUpdate = () => {
    setFormData({
      branch: "", // Branch Name
      Aname: "", // Asset Type
      month: "", // Date
      au: "",
      quantity: "", // Cost
      amount: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleOpenClick();
  };

  const handleItemChange = (e) => {
    const { value } = e.target;
    setSelectedItem(value);
    // If the selected item is "Other", clear the otherItemValue state
    if (value === "Other") {
      setOtherItem("");
    }
  };

  const handleOtherItemChange = (e) => {
    const { value } = e.target;
    setOtherItem(value);
  };

  function form() {
    return (
      <form onSubmit={handleSubmitForm}>
        <div className="grid gap-6 mb-6 mt-4 md:mt-12 lg:mt-14 lg:grid-cols-2 md:grid-cols-2 sm:ml-8 sm:mr-8 lg:ml-32 lg:mr-32 md:ml-32 md:mr-32">
          <div>
            <label
              htmlFor="AType"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Particulars
            </label>
            {/* Dropdown for predefined items */}
            <select
              value={selectedItem}
              onChange={handleItemChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              required
            >
              <option value="">Select an item</option>
              {predefinedItems.map((item) => (
                <option key={item} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {/* Input field for user input if "Other" is selected */}
            {selectedItem === "other" && (
              <input
                type="text"
                value={otherItem}
                onChange={handleOtherItemChange}
                placeholder="Enter other item"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                required
              />
            )}
          </div>
          <div className="">
            <label
              htmlFor="month"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Month
            </label>
            <input
              type="date"
              name="month"
              value={formData.month}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="cost"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cost"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="au"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              A/U
            </label>
            <input
              type="text"
              id="au"
              name="au"
              value={formData.au}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="rim"
              required
            />
          </div>
        </div>
        <div className="sm:ml-8 sm:mr-8 lg:ml-32 lg:mr-32 md:ml-32 md:mr-32">
          <button
            type="submit"
            className="px-2 py-2 transition rounded-lg text-black bg-yellow-500 hover:bg-white hover:text-gray-800 border-2 border-gray-200 focus:outline-none"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancelUpdate}
            className="ml-2 inline-flex justify-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-500 active:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
  const handleShowDetails = (selectedMonth) => {
    const selectedData = Rlist.filter((item) => item.month === selectedMonth);
    setSelectedMonthDetails(selectedData);
    setModal(true);
  };

  //////list details//////
  const ListDetails = ({ selectedMonthDetails }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-4 -mt-60 rounded-lg max-w-4xl w-full sm:w-11/12">
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
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="justify-center" >
                    {loading && <CircleLoader className="ml-40"></CircleLoader>}
            </div>
          <div
            className="flex-col-2 space-x-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            {selectedMonthDetails &&
            selectedMonthDetails.some(
              (item) =>
                item.status === "Accepted" ||
                item.status === "Rejected" ||
                item.status === "In process"
            ) ? (
              <button
                onClick={() => setModal(false)}
                className="mt-4 p-3 bg-black rounded-md text-white w-1/3 font-semibold"
              >
                Close
              </button>
            ) : (
              <>
                <button
                  onClick={handleSent}
                  className="mt-4 p-3 bg-yellow-600 rounded-md text-black w-1/3 font-semibold"
                >
                  Sent
                </button>
                <button
                  onClick={() => setModal(false)}
                  className="mt-4 p-3 bg-black rounded-md text-white w-1/3 font-semibold"
                >
                  Close
                </button>
              </>
            )}
             
          </div>
        </div>
      </div>
    );
  };

  //////modal//////
  const handleOpenClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  ////grpah module/////
  // /////modal///////
  const SubmitModal = ({ isOpen, onClose }) => {
    return (
      <>
        {isOpen && (
          <div className="fixed w-full overflow-y-auto z-50 inset-0">
            <div className="fixed flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
              <div className="max-h-full items-center justify-center w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white sm:ml-8 sm:mr-8 ">
                <div className="w-full items-center justify-center ">
                  <div className="m-8 my-20 max-w-[400px] mx-auto items-center justify-center">
                    <div className="mb-8 items-center justify-center">
                      <h1 className="mb-4 text-3xl font-extrabold text-gray-800">
                        Report Confirmation
                      </h1>
                      <p className="text-gray-600">
                        Are you sure you want to add asset in list?
                      </p>
                    </div>
                    <div className="space-y-4">
                      <button
                        onClick={handleSubmit}
                        className="p-3 bg-black rounded-full text-white w-full font-semibold"
                      >
                        Yes, Add
                      </button>
                      <button
                        onClick={onClose}
                        className="p-3 bg-white border rounded-full w-full font-semibold"
                      >
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

  function requests() {
    /////search/////
    const handleSearch = (query) => {
      setSearchQuery(query);
    };

    const filteredData = Rlist.filter((M) => {
      const searchFields = [M.month];
      return searchFields.some((field) => {
        if (typeof field === "string") {
          return field.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false; // Return false for non-string fields
      });
    });

    // Create a Set to keep track of unique months from the filtered data
    const uniqueMonths = new Set(filteredData.map((item) => item.month));
    // Function to get the status for a given month
    const getStatusForMonth = (month) => {
      // Find the row in Rlist corresponding to the given month
      const row = Rlist.find((item) => item.month === month);
      // Return the status if the row is found, otherwise return null or an appropriate default value
      return row ? row.status : "No Status"; // Change 'status' to the actual property name containing the status value
    };

    return (
      <div className="overflow-x-auto space-y-2 mt-4 sm:ml-8 sm:mr-8 lg:ml-32 lg:mr-32 md:ml-32 md:mr-32">
        <div className="mt-1 flex justify-start">
          <h className="font-bold p-2">Search: </h>
          <input
            type="text"
            placeholder="Enter data"
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 border border-black rounded-md"
          />
        </div>
        <table className="min-w-full divide-y divide-gray-200 border-2 border-black shadow-md bg-white rounded-md">
          <thead className="border border-black">
            <tr className="bg-black text-yellow-400 font-bold">
              <td className="border border-black">Month</td>
              <td className="border border-black">Status</td>
              <td className="border border-black">Note</td>
            </tr>
          </thead>
          <tbody>
            {/* Render unique months */}
            {[...uniqueMonths].map((month) => (
              <tr key={month} className="border-black">
                <td
                  className="border border-black"
                  onClick={() => handleShowDetails(month)}
                >
                  {month}
                </td>
                {/* Render status (if any) */}
                {/* You may need to modify this part according to your data structure */}
                <td className="border border-black">
                  <div
                    className={`m-2 w-fit text-black text-xl font-serif pl-2 pr-2 h-fit rounded-lg 
                     ${(() => {
                       switch (getStatusForMonth(month)) {
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
                    {getStatusForMonth(month)}
                  </div>
                </td>
                <td className="border border-black font-sans">
                  {getStatusForMonth(month) === "Rejected" ||
                  getStatusForMonth(month) === "Accepted" ||
                  getStatusForMonth(month) === "In process" ? (
                    <div className="font-sans bg-yellow-500">
                      <h>Check the list to conform if modified by the admin</h>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Us />
      <div className="flex-col max-w-auto sm:ml-0 pl-2 pr-4 overflow-y-auto">
        <h2 className="text-4xl font-semibold mt-24 lg:ml-24 md:ml-20">
          Consumable Assets Quotation
        </h2>
        <div className="grid gap-0 lg:grid-cols-3 sm:ml-8 sm:mr-8 lg:ml-32 lg:mr-32 md:ml-32 md:mr-32">
          <div
            onClick={() => {
              setShowForm(true);
              {
                console.log(showForm);
              }
              setShowRequests(false);
              setshowGrap(false);
            }}
            className="justify-center cursor-pointer items-center p-2 mt-10 rounded-xl group sm:flex border hover:border-gray-200 space-x-0 text-black bg-yellow-500  shadow-xl hover:bg-yellow-400 hover:text-black"
          >
            <div className="sm:w-auto">
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold">List Data</h4>
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              setShowRequests(true);
              setShowForm(false);
              setshowGrap(false);
            }}
            className="justify-center cursor-pointer items-center p-2 lg:mt-10 mt-4 rounded-xl group sm:flex border hover:border-gray-200 space-x-0 text-black bg-yellow-500 shadow-xl hover:bg-yellow-400 hover:text-black "
          >
            <div className="sm:w-auto">
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold">List</h4>
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              setshowGrap(true);
              {
                console.log(showGraph);
              }
              setShowRequests(false);
              setShowForm(false);
            }}
            className="justify-center cursor-pointer items-center p-2 mt-4 lg:mt-10 rounded-xl group sm:flex border hover:border-gray-200 space-x-0 text-black bg-yellow-500  shadow-xl hover:bg-yellow-400 hover:text-black"
          >
            <div className="sm:w-auto">
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold">View Report</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto">
          {showForm && form()}
          {showRequests && requests()}
          {/* Render ListDetails component only when selectedMonthDetails is not null */}
          {ModalOpen && (
            <ListDetails selectedMonthDetails={selectedMonthDetails} />
          )}
          {showGraph && <Graph></Graph>}
        </div>
      </div>
      {/* Logout Modal */}
      <SubmitModal isOpen={isModalOpen} onClose={closeModal} className="" />
    </div>
  );
}
export default Ureport;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Us from "./Umain";
import axios from "axios";
import { useAuth } from "./AuthContext";
function Umaintenance() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { userBranch } = useAuth();
  const [Mlist, setMlist] = useState([]);

  useEffect(() => {
    // Fetch data from backend API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("user" + userBranch);
    try {
      const response = await axios.get(
        `http://localhost:8000/maint/${userBranch}`
      );
      console.log(response.data);
      if (response.status === 200) {
        setMlist(response.data); // Update state with fetched data
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [formData, setFormData] = useState({
    branch: "", // Branch Name
    category: "", // Asset Category
    type: "", // Asset Type
    tag: "", // Asset Tag
    name: "", // Asset Name
    supplier: "", // Supplier
    date: "", // Date
    cost: "", // Cost
    bill: "", // Bill
    demand: "", // Demand
  });

  const [showForm, setShowForm] = useState(true);
  const [showRequests, setShowRequests] = useState(false);
  const handleDivClick = (data) => {
    navigate(`/Uassets/Uassetslist`, { state: data });
  };
  // Function to handle user deletion
  const handleDelete = (rowId) => {
    // Filter out the user with the specified ID
    const updatedRow = Mlist.filter((row) => row.id !== rowId);

    // Update the users state without the deleted user
    setMlist(updatedRow);
  };

  const handleSubmit = async (e) => {
    const newdata = { ...formData, branch: userBranch, status: "" };
    e.preventDefault();
    console.log(newdata);
    try {
      await axios.post("http://localhost:8000/maint", newdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData({
        branch: "", // Branch Name
        category: "", // Asset Category
        type: "", // Asset Type
        tag: "", // Asset Tag
        name: "", // Asset Name
        supplier: "", // Supplier
        date: "", // Date
        cost: "", // Cost
        bill: "", // Bill
        demand: "",
      });
      closeModal();
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  };

  const handleCancelUpdate = () => {
    setFormData({
      branch: "", // Branch Name
      category: "", // Asset Category
      type: "", // Asset Type
      tag: "", // Asset Tag
      name: "", // Asset Name
      supplier: "", // Supplier
      date: "", // Date
      cost: "", // Cost
      bill: "", // Bill
      demand: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    // Do something with the file, like setting it in the form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      bill: e.target.files[0],
    }));
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleOpenClick();
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

  function form() {
    return (
      <form
        action="/uploads"
        method="post"
        enctype="multipart/form-data"
        onSubmit={handleSubmitForm}
      >
        <div className="grid gap-6 mb-6 mt-4 md:mt-12 lg:mt-14 lg:grid-cols-3 md:grid-cols-2 sm:ml-8 sm:mr-8 lg:ml-32 lg:mr-32 md:ml-32 md:mr-32">
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Asset Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              required
            >
              <option value="">Select asset category</option>
              <option value="fix">fix</option>
              <option value="IT">IT</option>
              <option value="consumable">consumable</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Asset Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="Enter asset type"
              required
            />
          </div>

          <div>
            <label
              htmlFor="tag"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Asset Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="Enter asset tag"
              required
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Asset Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="Enter asset name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="supplier"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Supplier
            </label>
            <input
              type="text"
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="Enter supplier"
              required
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              onChange={handleInputChange}
              placeholder="Enter supplier"
              required
            />
          </div>

          <div>
            <label
              htmlFor="cost"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Cost
            </label>
            <input
              type="text"
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="Enter cost"
              required
            />
          </div>

          <div>
            <label
              htmlFor="bill"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Bill
            </label>
            <input
              type="file"
              id="bill"
              name="bill"
              accept="image/*"
              onChange={handleFileInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="demand"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Demand
            </label>
            <input
              type="text"
              id="demand"
              name="demand"
              value={formData.demand}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="Enter demand"
              required
            />
          </div>

          {/* Add similar blocks for other fields */}
          {/* ... */}
        </div>
        <div className="sm:ml-8 sm:mr-8 lg:ml-32 lg:mr-32 md:ml-32 md:mr-32">
          <button
            type="submit"
            className="px-2 py-2 transition rounded-lg text-black bg-yellow-500 hover:bg-white hover:text-gray-800 border-2 border-gray-200 focus:outline-none"
          >
            Send
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
  /////search/////
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const filteredData = Mlist.filter((M) => {
    const searchFields = [
      M.branch,
      M.category,
      M.type,
      M.name,
      M.tag,
      M.cost,
      M.date,
      M.demand,
      M.supplier,
      M.status,
    ];
    return searchFields.some((field) => {
      if (typeof field === "string") {
        return field.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false; // Return false for non-string fields
    });
  });

  //////modal//////
  const handleOpenClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
                      <h1 className="mb-4 text-3xl font-extrabold text-black">
                        Request Confirmation
                      </h1>
                      <p className="text-gray-600">
                        Are you sure you want to submit request?
                      </p>
                    </div>
                    <div className="space-y-4">
                      <button
                        onClick={handleSubmit}
                        className="p-3 bg-black rounded-full text-white w-full font-semibold"
                      >
                        Yes, send
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
    return (
      <div className="overflow-x-auto space-y-2 mt-4 sm:ml-8 sm:mr-8 lg:ml-32 lg:mr-32 md:ml-32 md:mr-32">
        <div className="mt-1 flex justify-start ">
          <h className="font-bold p-2">Search: </h>
          <input
            type="text"
            placeholder="Enter data"
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <table className="min-w-full divide-y divide-gray-200 border-2 border-gray-200 shadow-md bg-white rounded-md">
          <thead className="border border-black">
            <tr className="bg-black text-yellow-400 font-bold">
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
              <td className="border border-black">Status</td>
              {/* <td className="border border-black">Action</td> */}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row._id} className="border-black">
                <td className="border border-black">{row.branch}</td>
                <td className="border border-black">{row.category}</td>
                <td className="border border-black">{row.type}</td>
                <td className="border border-black">{row.tag}</td>
                <td className="border border-black">{row.name}</td>
                <td className="border border-black">{row.supplier}</td>
                <td className="border border-black">{row.date}</td>
                <td className="border border-black">{row.cost}</td>
                <td className="border border-black">
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
                </td>

                <td className="border border-black">{row.demand}</td>
                <td className="border border-black">
                  <div
                    className={`m-2 w-fit text-white text-xl font-serif pl-2 pr-2 h-fit rounded-lg 
                     ${(() => {
                       switch (row.status) {
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
                    {row.status}
                  </div>
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
          Maintenance Request
        </h2>
        <div className="grid gap-0 lg:grid-cols-2 sm:ml-8 sm:mr-8 lg:ml-32 lg:mr-32 md:ml-32 md:mr-32">
          <div
            onClick={() => {
              setShowForm(true);
              {
                console.log(showForm);
              }
              setShowRequests(false);
            }}
            className="justify-center cursor-pointer items-center p-2 mt-10 rounded-xl group sm:flex border hover:border-gray-200 space-x-0 text-black bg-yellow-500 shadow-xl hover:bg-yellow-400 hover:text-black"
          >
            <div className="sm:w-auto">
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold">Send Request</h4>
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              setShowRequests(true);
              setShowForm(false);
            }}
            className="justify-center cursor-pointer items-center p-2 lg:mt-10 mt-4 rounded-xl group sm:flex border hover:border-gray-200 space-x-0 text-black bg-yellow-500 shadow-xl hover:bg-yellow-400 hover:text-black"
          >
            <div className="sm:w-auto">
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold text-yellow">
                  View Requests
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto">
          {showForm && form()}
          {showRequests && requests()}
        </div>
      </div>
      {/* Logout Modal */}
      <SubmitModal isOpen={isModalOpen} onClose={closeModal} className="" />
    </div>
  );
}

export default Umaintenance;

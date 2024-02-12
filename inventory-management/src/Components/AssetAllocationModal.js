import React, { useState } from "react";
const AssetAllocationModal = ({
  isOpen,
  closeModal,
  onSave,
  branches,
  category,
}) => {
  const [allocationDate, setAllocationDate] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [quantity, setQuantity] = useState(null);
  // Function to clear the allocation form
const clearAllocationForm = () => {
  // Reset the form state or any relevant state values
  // For example:
  setAllocationDate("");
  setSelectedBranch("");
  setQuantity(null); // Add this line if 'quantity' is a state variable in your component
};
  const handleSave = () => {
    if (allocationDate && selectedBranch || quantity) {
      onSave(allocationDate, selectedBranch, quantity);
      closeModal();
      clearAllocationForm();
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div
      className={`fixed  inset-0 overflow-y-auto z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10"
                // Add any icon or indicator for the modal here
              >
                {/* For example: */}
                {/* <CheckIcon className="h-6 w-6 text-green-600" /> */}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Allocate Asset
                </h3>
                <div className="mt-2">
                  <label
                    htmlFor="allocationDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Allocation Date
                  </label>
                  <input
                    type="date"
                    id="allocationDate"
                    onChange={(e) => setAllocationDate(e.target.value)}
                    value={allocationDate}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {category === "consumable" && (
                  <div className="mt-2">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                )}
                <div className="mt-2">
                  <label
                    htmlFor="selectedBranch"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Branch
                  </label>
                  <select
                    id="selectedBranch"
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    value={selectedBranch}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="" disabled>
                      Select Branch
                    </option>
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSave}
              className="w-full inline-flex justify-center bg-black text-yellow-400 rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssetAllocationModal;

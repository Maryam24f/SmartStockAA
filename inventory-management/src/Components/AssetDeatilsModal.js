import React from "react";

// ... (previous code)

const AssetDetailsModal = ({ isOpen, closeModal, assetDetails, category }) => {
  if (!isOpen || !assetDetails) {
    return null;
  }

  const renderAssetTagOrQuantity = () => {
    const { assetTag, quantity } = assetDetails;
    console.log(category);
    if (category === "Consumable Assets") {
      return (
        <p className="mb-4 pl-2 pr-2">
          <span className="font-semibold">Quantity:</span>{" "}
          {quantity != null ? quantity : "N/A"}
        </p>
      );
    } else {
      return (
        <p className="mb-4 pl-2 pr-2">
          <span className="font-semibold">Asset Tag:</span>{" "}
          {assetTag || "N/A"}
        </p>
      );
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 rounded-md shadow-md">
        <div className="w-full pl-4 bg-black h-10 rounded-md text-yellow-500 flex items-center justify-center">
          <h2 className="text-2xl font-bold">Asset Details</h2>
        </div>

        <div className="flex flex-col border-2 border-yellow-500 mt-4 font-serif text-2xl">
          <p className="mb-4 pl-2 pr-2">
            <span className="font-semibold">Asset Name:</span>{" "}
            {assetDetails.assetname}
          </p>

          {renderAssetTagOrQuantity()}

          <p className="mb-4 pl-2 pr-2">
            <span className="font-semibold">Details:</span>{" "}
            {assetDetails.details}
          </p>
          <p className="mb-4 pl-2 pr-2">
            <span className="font-semibold">Type:</span> {assetDetails.type}
          </p>
          <p className="mb-4 pl-2 pr-2">
            <span className="font-semibold">Status:</span> {assetDetails.status}
          </p>
          <p className="mb-4 pl-2 pr-2">
            <span className="font-semibold">Branch:</span> {assetDetails.branch}
          </p>
          <p className="mb-4 pl-2 pr-2">
            <span className="font-semibold">Date:</span>{" "}
            {assetDetails.date || "N/A"}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-black text-yellow-500 rounded-md hover:bg-gray-400 hover:text-black focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsModal;

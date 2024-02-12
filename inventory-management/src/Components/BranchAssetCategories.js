import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import SideBar from './main';
import Profile from './profile';

function BranchAssetCategories() {
  const navigate = useNavigate();

  // Use the useLocation hook to get the current location
  const location = useLocation();
  const props = location.state || {}; // Use an empty object if state is null

  // Now, you can safely access props.Branch
  const branch = props.Branch;
  console.log(branch);
  // Function to handle div click and navigate to a new page
  const handleDivClick = (data) => {
    

    // Use the `navigate` function to redirect to a new page with props
    navigate(`/branches/BranchAssetCategories/BranchData`, { state: data });
  };
  
  
  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <SideBar />

      <div className='flex-col w-screen'>
        {/* Profile bar */}
        <Profile />

        {/* Screen content */}
        <div className='flex-col sm:ml-0 md:ml-80 lg:ml-80 lg:mr-4 mt-16'>
            
          {/* Categories */}
          <h2 className="text-3xl font-semibold">Categories</h2>
          <h2 className="text-2xl font-thin pl-3 pt-1"><span className='font-semibold'>Branch:</span> {branch}</h2>
          <div className='h-96 mt-10 pt-4 space-y-4'>
            {/* Fix Assets */}
            <div
              className="p-1 rounded-xl sm:flex border border-gray-200 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl lg:transform md:transform transition-transform hover:scale-95"
              onClick={() => handleDivClick({category:'fix', assetname:'Chair',assettag:'05000987', type:'Furniture', specs:'wooden chair', branch:{branch}})}
            >
              <div className="sm:w-7/12 pl-0 p-1 whitespace-nowrap">
                <div className="space-y-0">
                  <h4 className="text-lg font-semibold text-cyan-900">Fix Assets </h4>
                </div>
              </div>
            </div>

            {/* Consumable Assets */}
            <div
              className="p-1 rounded-xl sm:flex border border-gray-200 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl lg:transform md:transform transition-transform hover:scale-95"
              onClick={() => handleDivClick({category:'consumable', assetname:'papers',assettag:'05000987', type:'Papers', specs:'A4', branch:{branch}})}
            >
              <div className="sm:w-7/12 pl-0 p-1 whitespace-nowrap">
                <div className="space-y-0">
                  <h4 className="text-lg font-semibold text-cyan-900">Consumable Assets</h4>
                </div>
              </div>
            </div>

            {/* IT Assets */}
            <div
              className="p-1 rounded-xl sm:flex border border-gray-200 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl lg:transform md:transform transition-transform hover:scale-95"
              onClick={() => handleDivClick({category:'IT', assetname:'Hard Disk',assettag:'05000987', type:'Storage Disk', specs:'100Gb', branch:{branch}})}
            >
              <div className="sm:w-7/12 pl-0 p-1 whitespace-nowrap">
                <div className="space-y-0">
                  <h4 className="text-lg font-semibold text-cyan-900">IT Assets</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchAssetCategories;

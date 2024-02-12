
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import SideBar from './main';
import Profile from './profile';

function Assets() {
  const navigate = useNavigate();
  const [catList, setCatList] = useState([]);
  const [itList, setItList] = useState([]);
  const [fixList, setFixList] = useState([]);
  ///consuamble list/////
  // const catList=[{
  //    assetname:'papers',
  //    quantity:20, 
  //    type:'Papers', 
  //    specs:'A4', 
  //    date:"",
  //    status:'Not Allocated'

  // },
//   {
//     assetname:'papers',
//     quantity:'2', 
//     type:'Papers', 
//     specs:'A4', 
//     status:'Allocated'

//  },
// ]
 ///it list/////
//  const itList=[{
//   assetname:'lcd1',
//   assetTag:'0500456', 
//   type:'lcd', 
//   specs:'Abc', 
//   date:"",
//   status:'Not Allocated'

// },]
///fix list/////
// const fixList=[{
//   assetname:'chair',
//   assetTag:'0500987', 
//   type:'wooden', 
//   specs:'wooden', 
//   date:"",
//   status:'Not Allocated'

// },
// {
//   assetname:'table',
//   assetTag:'0500987', 
//   type:'wooden', 
//   specs:'wooden', 
//   date:"2024-01-10",
//   status:'Not Allocated'

// }
// ,]
  // Function to handle div click and navigate to a new page

  const handleDivClick = (data) => {
    // Use the `navigate` function to redirect to a new page with props
    navigate(`/assets/AssetsList`, { state: { category: data.category, catList: data.catList, itList: data.itList, fixList: data.fixList }});
  };

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <SideBar />

      <div className='flex-col w-screen'>
        {/* Profile bar */}
        <Profile />

        {/* Screen content */}
        <div className='flex-col ml-2 md:ml-80 lg:ml-80 mr-2 lg:mr-4 mt-12'>
          {/* Categories */}
          <h2 className="text-3xl pt-4 font-semibold">Categories</h2>
          <div className='flex-col h-96 mt-4 pt-2 space-y-2 '>
              {/* Fix Assets */}
              <div
               className="p-1 rounded-xl sm:flex border border-gray-200 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl lg:transform md:transform transition-transform hover:scale-95"
                onClick={() => handleDivClick({category:'fix'})}
              >
                <div className="sm:w-7/12 pl-0 p-1 whitespace-nowrap">
                  <div className="space-y-0">
                    <h4 className="text-lg font-semibold text-cyan-900">Fix Assets</h4>
                  </div>
                </div>
              </div>
  
              {/* Consumable Assets */}
              <div
                className="p-1 rounded-xl sm:flex border border-gray-200 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl lg:transform md:transform transition-transform hover:scale-95"
                onClick={() => handleDivClick({category:'consumable'})}
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
                onClick={() => handleDivClick({category:'IT'})}
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

export default Assets;

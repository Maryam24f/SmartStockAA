import React from 'react';
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import SideBar from './main';
import Profile from './profile';
import { useNavigate } from 'react-router-dom';
import { dashboardContent } from './Utilities';

function Dashboard() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const navigate = useNavigate();
  // const [showChart, setShowChart] = useState(true);

  // // Other code...

  // useEffect(() => {
  //   // Cleanup function
  //   return () => {
  //     setShowChart(false); // Set showChart to false before unmounting
  //   };
  // }, []); //

  // Mock data for assets
  const assets = [
    {
      id: 0,
      status: "Not Allocated",
      assetname: "LCD1",
      assetTag: "0500989",
      details: "aaaaaaaaaaaaabcc",
      type: "LCD",
      category:"IT",
      branch: "warehouse I9",
    },
    {
      id: 1,
      status: "Allocated",
      assetname: "paper",
      assetTag: "0500989",
      details: "aaaaaaaaaaaaabcc",
      type: "paper",
      category:"consumable",
      branch: "F11",
    },
    {
      id: 2,
      status: "Allocated",
      assetname: "chair",
      assetTag: "0500989",
      details: "aaaaaaaaaaaaabcc",
      type: "chair",
      category:"fix",
      branch: "ISE",
    },
    
  ];
  
  // Extract asset categories and their counts
  const assetCategories = {};
  assets.forEach((asset) => {
    const { category } = asset;
    assetCategories[category] = (assetCategories[category] || 0) + 1;
  });

  // Data for the doughnut chart
  const data = {
    labels: Object.keys(assetCategories),
    datasets: [
      {
        data: Object.values(assetCategories),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          // Add more colors if needed
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          // Add more colors if needed
        ],
        borderWidth: 1,
      },
    ],
  };

  // Extract asset status and their counts
  const assetStatus = {};
  assets.forEach((asset) => {
    const { status } = asset;
    assetStatus[status] = (assetStatus[status] || 0) + 1;
  });
  const status = {
    labels: Object.keys(assetStatus),
    datasets: [
      {
        data: Object.values(assetStatus),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          // Add more colors if needed
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          // Add more colors if needed
        ],
        
        borderWidth: 1,
      },
    ],
  };
  // Function to handle div click and navigate to a new page
  const handleDivClick = (props) => {
    const { state } = props;
    
    if (state && typeof state.currIndex !== 'undefined') {
      switch (state.currIndex) {
        case 0:
          navigate('/assets');
          break;
  
        case 1:
          navigate('/branches');
          break;
  
        case 2:
          navigate('/maintenance');
          break;
  
        case 3:
          navigate('/reports');
          break;
  
        default:
          // Handle default case if needed
          break;
      }
    }
  };
  
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      <div className="flex-col w-screen">
        {/* Profile bar */}
        <Profile />

        {/* Screen content */}
        <div className="flex-col space-y-10 max-w-auto sm:ml-0 md:ml-72 lg:ml-72 pl-4 pr-4 mt-20 overflow-y-auto">
          
          {/* Asset type */}
          <div className=" grid w-full gap-4 lg:grid-cols-4 justify-center items-center">
          {dashboardContent.map(
                ({ Heading1, Heading2 }, currIndex) => {
                  return (
                    <div class="group relative mt-4 z-0 ">
                      <div
                        className={`aspect-h-1 aspect-w-1 w-full sm:overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-40 p-4 ${
                          (currIndex == 0 && "bg-blue-400") ||
                          (currIndex == 1 && "bg-yellow-300") ||
                          (currIndex == 2 && "bg-red-400") ||
                          (currIndex == 3 && "bg-pink-400")
                        }`}
                        style={{ zIndex: 10 }} 
                        onClick={() => handleDivClick({ state: { currIndex } })}

                      >
                        <h1 className="text-white text-2xl">{Heading1}</h1>
                        <h1 className="font-bold text-4xl text-white ">
                          {Heading2}
                        </h1>
                      </div>
                    </div>
                  );
                }
              )}
             </div>
            <div class="grid gap-12 lg:grid-cols-2">
            <div className="justify-center items-center p-1 rounded-xl group sm:flex border border-black-200 space-x-0 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
              <div className="sm:w-auto">
                <div className="space-y-4">
                  <h4 className="pl-12 text-2xl font-semibold text-cyan">
                    Asset By Category
                  </h4>
                  {/* Doughnut chart component */}
                  <div className="relative " style={{ height: '400px' }}>
                  {<Doughnut data={data}  />}
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center items-center p-1 rounded-xl group sm:flex space-x-0 bg-white bg-opacity-30 border border-black-200 shadow-xl hover:rounded-2xl">
              <div className="sm:w-auto">
                <div className="space-y-4">
                  <h4 className="pl-14 text-2xl font-semibold text-cyan">
                    Asset By Status
                  </h4>
                  {/* Doughnut chart component */}
                  <div className="relative " style={{ height: '400px' }}>
                  {<Doughnut data={status} />}
                  </div>
                </div>
              </div>
            </div>          
            </div>         
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

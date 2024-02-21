import '../App.css';
import SideBar from './main';
import Profile from './profile';
import {TbMoodEmptyFilled} from 'react-icons/tb'
import React, { useState, useEffect,useRef, useLayoutEffect } from "react";
import Chart from "chart.js/auto";
import Creport from './cgraph';
import Agraph from './graph3';

// Assuming your sample data has a 'date' field in the format 'YYYY-MM-DD'
// const sampleData = [
//   { branch: "ISE", date: "2023-01-15", assetType: "Paper", quantity: 200 },
//   { branch: "ISE", date: "2023-01-20", assetType: "Ink", quantity: 15 },
//   { branch: "ISE", date: "2023-01-20", assetType: "Tissues", quantity: 15 },
//   { branch: "ISE", date: "2023-01-20", assetType: "Tea", quantity: 15 },
//   { branch: "ISE", date: "2023-01-20", assetType: "Milk", quantity: 15 },
//   { branch: "ISE", date: "2023-01-20", assetType: "pens", quantity: 15 },
//   { branch: "ISE", date: "2023-02-05", assetType: "Paper", quantity: 30 },
//   { branch: "F9", date: "2023-02-10", assetType: "Ink", quantity: 25 },
// ];
// ...

function Report() {
  // const [selectedBranch, setSelectedBranch] = useState("");
  // const [selectedMonthYear, setSelectedMonthYear] = useState("");
  // const [consumableData, setConsumableData] = useState({});
  // const hasMounted = useRef(false);
  // const chartInstanceRef = useRef(null);
  const [activeTab, setActiveTab] = useState("graph1");
  // useLayoutEffect(() => {
  //   // Initialize the bar graph when the component mounts
  //   renderBarGraph();
  // }, []);  // Empty dependency array to ensure it runs only once on mount

  // useEffect(() => {
  //   if (hasMounted.current) {
  //     // Filter sample data based on selected criteria
  //     const filteredData = sampleData.filter(
  //       (item) => item.branch === selectedBranch && getMonthYear(item.date) === selectedMonthYear
  //     );

  //     // Process data to group by assetType and sum the quantity
  //     const processedData = filteredData.reduce((acc, item) => {
  //       const key = item.assetType;
  //       acc[key] = (acc[key] || 0) + item.quantity;
  //       return acc;
  //     }, {});

  //     setConsumableData(processedData);
  //   } else {
  //     hasMounted.current = true;
  //   }
  // }, [selectedBranch, selectedMonthYear]);

  // useEffect(() => {
  //   // When consumableData changes, update the bar graph
  //   renderBarGraph();
  // }, [consumableData]);

  // const getMonthYear = (dateString) => {
  //   const date = new Date(dateString);
  //   const month = date.getMonth() + 1; // Adjusting month because it returns 0-indexed
  //   const year = date.getFullYear();
  //   return `${year}-${month < 10 ? '0' : ''}${month}`;
  // };

  
  // const renderBarGraph = () => {
  //   const canvas = document.getElementById("barGraph");
    
  //   if (!canvas) {
  //     console.log("Canvas element not found");
  //     return;
  //   }

  //   const ctx = canvas.getContext("2d");

  //   if (!ctx) {
  //     console.log("Canvas context not available");
  //     return;
  //   }

  //   // Destroy previous chart instance if it exists
  //   if (chartInstanceRef.current) {
  //     chartInstanceRef.current.destroy();
  //   }

  //   if (Object.keys(consumableData).length === 0) {
  //     console.log("No data to render");
  //     return;
  //   }
  //   const labels = Object.keys(consumableData);
  //   const data = Object.values(consumableData);
  //   const chartConfig = {
  //     type: "bar",
  //     data: {
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: "Quantity Used",
  //           data: data,
  //           backgroundColor: [
  //             'rgba(255, 99, 132, 0.5)',
  //             'rgba(255, 205, 86, 0.5)',
  //             'rgba(54, 162, 235, 0.5)',
  //             'rgba(75, 192, 192, 0.5)',
  //             // Add more colors if needed
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //   };

  //   // Create a new bar graph
  //   chartInstanceRef.current = new Chart(ctx, chartConfig);
  //   console.log("Graph rendered");
  // };
  
  return (
    <div className='flex h-full'>
      {/* Sidebar */}
      <SideBar />
  
      <div className='flex-col w-full'>
        {/* Profile bar */}
        <Profile />
  
        {/* Dashboard content */}
        <div className='flex-col ml-2  md:ml-80 lg:ml-80 mr-2 lg:mr-4 mt-12 items-center'>
          <h2 className="text-4xl font-semibold">Report</h2>
          {/* Tabs for switching between graphs */}
          <div className='flex flex-col items-center mt-1'>
          <div className='flex-col sm:flex-row space-y-2 lg:space-x-4 mt-1'>
            <button
              className={`text-black bg-yellow-500 text-2xl font-bold ml-10 w-52 md:w-60 lg:w-80 h-10 rounded-md tab ${activeTab === "graph1" ? "active" : ""}`}
              onClick={() => setActiveTab("graph1")}
            >
              Branches Report
              
            </button>
            <button
              className={` text-black bg-yellow-500 text-2xl font-bold ml-10 w-52 md:w-60 lg:w-80 h-10 rounded-md tab ${activeTab === "graph2" ? "active" : ""}`}
              onClick={() => setActiveTab("graph2")}
            >
              Asset Report
            </button>
          </div>
            {/* Conditional rendering based on the active tab */}
          {activeTab === "graph1" ? (
            <Agraph/>
          ) : (
            <Creport />
          )}
          </div>
        </div>
      </div>
    </div>
  );
}  

export default Report;

import "../App.css";
import { TbMoodEmptyFilled } from "react-icons/tb";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Chart from "chart.js/auto";

// Assuming your sample data has a 'date' field in the format 'YYYY-MM-DD'
const sampleData = [
  { branch:"ISE",date: "2023-01-15", assetType:"Paper", quantity:60 },
  { branch:"f11",date: "2023-01-15", assetType:"Paper", quantity:6 },
  { branch:"g9", date: "2023-01-15", assetType:"Paper", quantity:20 },
  { branch:"f9", date: "2023-01-15", assetType:"Paper", quantity:40 },
  { branch:"i10",date: "2023-01-15", assetType:"Paper", quantity:250 },
  { branch:"f7", date: "2023-01-15", assetType:"Paper", quantity:300 },
  { branch:"f9", date: "2023-02-20", assetType:"Paper", quantity:15 },
  { branch:"f9", date: "2023-01-20", assetType:"Ink",   quantity:15 },
  { branch:"f7", date: "2023-03-1",  assetType:"Paper", quantity:300 },
];

function Creport() {
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [consumableData, setConsumableData] = useState({});
  const hasMounted = useRef(false);
  const chartInstanceRef = useRef(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isGraphVisible, setIsGraphVisible] = useState(false);

  useLayoutEffect(() => {
    // Initialize the bar graph when the component mounts
    renderBarGraph();
  }, []); // Empty dependency array to ensure it runs only once on mount

  useEffect(() => {
    if (hasMounted.current) {
      const filteredData = sampleData.filter((item) => {
        const isAssetTypeMatch = item.assetType === selectedAssetType;
        const isMonthYearMatch =
          !selectedMonthYear || getMonthYear(item.date) === selectedMonthYear;

        if (fromDate && toDate) {
          // If both fromDate and toDate are provided, consider the date range
          return (
            isAssetTypeMatch &&
            isMonthYearMatch &&
            item.date >= fromDate &&
            item.date <= toDate
          );
        } else {
          // If fromDate or toDate is not provided, ignore the date range
          return isAssetTypeMatch && isMonthYearMatch;
        }
      });

      // Process data to create datasets for each branch
      const branchData = filteredData.reduce((acc, item) => {
        const branch = item.branch;

        const monthYear = getMonthYear(item.date);
       
        if (!acc[branch]) {
          acc[branch] = {};
        }
        if (!acc[branch][monthYear]) {
          acc[branch][monthYear] = 0;
        }
        acc[branch][monthYear] += item.quantity;
        return acc;
      }, {});// Initialize datasets outside the map function


      const datasets = Object.entries(branchData).reduce((acc, [branch, monthData]) => {
        // Check if the branch already exists in the datasets
        const existingDatasetIndex = acc.findIndex(dataset => dataset.label === branch);
      
        if (existingDatasetIndex !== -1) {
          // If the branch exists, update the existing dataset with new quantities
          acc[existingDatasetIndex].data = acc[existingDatasetIndex].data.map((value, index) => 
            value + (monthData[index] || 0)
          );
        } else {
          // If the branch doesn't exist, create a new dataset
          const newDataset = {
            label: branch,
            data: monthData,
            backgroundColor: getRandomColor(),
            borderWidth: 1,
          };
          acc.push(newDataset);
        }      
        return acc;
      }, []);      
      setConsumableData({ datasets });
      setIsGraphVisible(true);
    } else {
      hasMounted.current = true;
    }
  },[selectedMonthYear, selectedAssetType, fromDate, toDate]);

  useEffect(() => {
    // When consumableData changes, update the bar graph
    renderBarGraph();
  }, [consumableData]);

  const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Adjusting month because it returns 0-indexed
    const year = date.getFullYear();
    return `${year}-${month < 10 ? "0" : ""}${month}`;
  };

  const renderBarGraph = () => {
    const canvas = document.getElementById("barGraph");

    if (!canvas) {
      console.log("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.log("Canvas context not available");
      return;
    }

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (
      Object.keys(consumableData).length === 0 ||
      (!selectedMonthYear && (!fromDate || !toDate))
    ) {
      console.log("No data or date not selected");
      setIsGraphVisible(false);
      return;
    }
    // Log the content of consumableData before rendering the chart
    console.log("Consumable Data:", consumableData);

    const chartConfig = {
      type: "bar",
      data: {
        datasets: consumableData.datasets,
      },
    };

    // Create a new bar graph
    chartInstanceRef.current = new Chart(ctx, chartConfig);
    console.log("Graph rendered");
  };

  const getRandomColor = () => {
    // Function to generate a random color
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const clearGraph = () => {
    // Clear input fields and reset visibility flag
    setSelectedAssetType("");
    setSelectedMonthYear("");
    setFromDate("");
    setToDate("");
    setIsGraphVisible(false);
  };

  return (
    <div className="flex h-full">
      {/* Dashboard content */}
      <div className="flex flex-col items-center ">
        <div className="flex justify-end items-end">
          <button
            className="mt-1 text-yellow-500 bg-black font-bold py-1 px-4 rounded-md"
            onClick={clearGraph}
          >
            Reset
          </button>
        </div>
        {/* Dropdowns for selecting asset type and month-year */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 md:items-center mt-1">
          <div>
            <label className="font-bold text-gray-600">
              Asset:
              <input
                type="text"
                value={selectedAssetType}
                className="border-2 border-gray-700 font-light rounded-md ml-2 w-44 h-10"
                onChange={(e) => setSelectedAssetType(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="font-bold text-gray-600">
              Month:
              <input
                type="month"
                value={selectedMonthYear}
                className="border-2 border-gray-700 font-light rounded-md ml-2 w-44 h-10"
                onChange={(e) => setSelectedMonthYear(e.target.value)}
              />
            </label>
          </div>
          <div className="mt-4">
            <label className="font-bold text-gray-600">
              From:
              <input
                type="month"
                value={fromDate}
                className="border-2 border-gray-700 ml-2 rounded-md font-light w-44 h-10"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </label>
          </div>
          <div className="mt-4">
            <label className="font-bold text-gray-600">
              To:
              <input
                type="month"
                value={toDate}
                className="border-2 border-gray-700 ml-2 rounded-md font-light w-44 h-10"
                onChange={(e) => setToDate(e.target.value)}
              />
            </label>
          </div>
        </div>
        {/* Conditional rendering based on data existence */}
        {Object.keys(consumableData).length === 0 ? (
          <div className="flex-col justify-center items-center mt-20 md:mt-28 lg:mt-28 ml-4 w-96 h-40 shadow-lg border border-gray-300">
            <div className="flex-col justify-center items-center">
              <TbMoodEmptyFilled className="text-yellow-400 w-20 h-20 ml-36 mt-6"></TbMoodEmptyFilled>
              <p className="text-center">No data available</p>
            </div>
          </div>
        ) : (
          // Canvas for rendering the bar graph
          <canvas id="barGraph"></canvas>
        )}
      </div>
    </div>
  );
}
export default Creport;

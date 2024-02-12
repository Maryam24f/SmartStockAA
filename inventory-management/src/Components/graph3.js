import "../App.css";
import { TbMoodEmptyFilled } from "react-icons/tb";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Chart from "chart.js/auto";

// Assuming your sample data has a 'date' field in the format 'YYYY-MM-DD'
const sampleData = [
  { branch: "ISE", date: "2023-01-15", assetType: "Paper", quantity: 200 },
  { branch: "ISE", date: "2023-01-20", assetType: "Ink", quantity: 150 },
  { branch: "ISE", date: "2023-02-20", assetType: "Ink", quantity: 130 },
  { branch: "ISE", date: "2023-03-20", assetType: "Ink", quantity: 110 },
  { branch: "ISE", date: "2023-04-20", assetType: "Ink", quantity: 90 },
  { branch: "ISE", date: "2023-01-20", assetType: "Tissues", quantity: 85 },
  { branch: "ISE", date: "2023-01-20", assetType: "Tea", quantity: 65 },
  { branch: "ISE", date: "2023-01-20", assetType: "Milk", quantity: 25 },
  { branch: "ISE", date: "2023-01-20", assetType: "pens", quantity: 55 },
  { branch: "ISE", date: "2023-02-05", assetType: "Paper", quantity: 140 },
  { branch: "ISE", date: "2023-02-20", assetType: "pens", quantity: 20},
  { branch: "ISE", date: "2023-03-05", assetType: "Paper", quantity: 90 },
  { branch: "ISE", date: "2023-04-05", assetType: "Paper", quantity: 60 },
  { branch: "ISE", date: "2023-05-05", assjetType:"Paper", quantity: 40 },
  { branch: "F9",  date: "2023-02-10", assetType: "Ink", quantity: 25 },
];
function Agraph() {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [consumableData, setConsumableData] = useState({});
  const hasMounted = useRef(false);
  const chartInstanceRef = useRef(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isGraphVisible, setIsGraphVisible] = useState(false);

  useLayoutEffect(() => {
    // Initialize the bar graph when the component mounts
    renderBarGraph();
  }, []);// Empty dependency array to ensure it runs only once on mount

  useEffect(() => {
    if (hasMounted.current) {
      // Filter sample data based on selected criteria
      const filteredData = sampleData.filter(
        (item) =>
          item.branch === selectedBranch &&
          (!selectedMonthYear ||
            getMonthYear(item.date) === selectedMonthYear) &&
          ((!fromDate && !toDate) ||
            (fromDate &&
              toDate &&
              new Date(item.date) >= new Date(fromDate) &&
              new Date(item.date) <= new Date(toDate)) ||
            (fromDate && !toDate && new Date(item.date) >= new Date(fromDate)) ||
            (!fromDate &&
              toDate &&
              new Date(item.date) <= new Date(toDate)))
      );
  
      // Process data to group by assetType and month
      const processedData = filteredData.reduce((acc, item) => {
        const key = `${item.assetType}-${getMonthYear(item.date)}`;
        acc[key] = (acc[key] || 0) + item.quantity;
        return acc;
      }, {});
  
      setConsumableData(processedData);
      // Set visibility flag for the graph
      setIsGraphVisible(true);
    } else {
      hasMounted.current = true;
    }
  }, [selectedBranch, selectedMonthYear, fromDate, toDate]);
  
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
  
    const uniqueAssetTypes = Array.from(
      new Set(sampleData.map((item) => item.assetType))
    );
    const uniqueMonths = Array.from(
      new Set(sampleData.map((item) => getMonthYear(item.date)))
    );
    const datasets = uniqueMonths.map((month) => {
      const data = uniqueAssetTypes.map((assetType) => {
        const key = `${assetType}-${month}`;
        console.log(`Data for ${assetType} in ${month}:`, consumableData[key] || 0);
        return consumableData[key] || 0;
      });
    
      return {
        label: month,
        data: data,
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 1)`,
        borderWidth: 1,
      };
    });
    
    // Create a new bar graph
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: uniqueAssetTypes,
        datasets: datasets,
      },
    });
  
    console.log("Graph rendered");
  };
  
  const clearGraph = () => {
    // Clear input fields and reset visibility flag
    setSelectedBranch("");
    setSelectedMonthYear("");
    setFromDate("");
    setToDate("");
    setIsGraphVisible(false);
  };

  return (
    <div className="flex h-full">
      {/* Dashboard content */}
        <div className="flex flex-col items-center">
        <div className="flex justify-end items-end">
        <button
          className="mt-1 text-yellow-500 bg-black font-bold py-1 px-4 rounded-md"
          onClick={clearGraph}
        >
          Reset
        </button>
        </div>
          {/* Dropdowns and date pickers */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-x-2 md:items-center">
            <div className="mt-1">
              <label className="font-bold text-gray-600">
                Branch:
                <select
                  className="border-2 border-gray-700 ml-2 rounded-md font-light w-44 h-10"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}>
                  <option value="">Select Branch </option>
                  <option value="ISE">ISE </option>
                  <option value="F9">F9   </option>
                  <option value="I10">I10 </option>
                </select>
              </label>
            </div>
            <div className="mt-4">
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
            {/* Button to clear the graph and input fields */}        
            </div>         
          {/* Conditional rendering based on data existence */}
          {Object.keys(consumableData).length === 0 ? (
            <div className="flex-col justify-center items-center mt-20 w-96 h-40 shadow-lg border border-gray-300">
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
export default Agraph;

import "../App.css";
import { TbMoodEmptyFilled } from "react-icons/tb";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Chart from "chart.js/auto";
import { useAuth } from "./AuthContext";
import axios from "axios";

// const sampleData = [
//   { branch: "ISE", date: "2023-01-15", assetType: "Paper", quantity: 200 },
//   { branch: "ISE", date: "2023-01-20", assetType: "Ink", quantity: 150 },
//   { branch: "ISE", date: "2023-02-20", assetType: "Ink", quantity: 130 },
//   { branch: "ISE", date: "2023-03-20", assetType: "Ink", quantity: 110 },
//   { branch: "ISE", date: "2023-04-20", assetType: "Ink", quantity: 90 },
//   { branch: "ISE", date: "2023-01-20", assetType: "Tissues", quantity: 85 },
//   { branch: "ISE", date: "2023-01-20", assetType: "Tea", quantity: 65 },
//   { branch: "ISE", date: "2023-01-20", assetType: "Milk", quantity: 25 },
//   { branch: "ISE", date: "2023-01-20", assetType: "pens", quantity: 55 },
//   { branch: "ISE", date: "2023-02-05", assetType: "Paper", quantity: 140 },
//   { branch: "ISE", date: "2023-02-20", assetType: "pens", quantity: 20},
//   { branch: "ISE", date: "2023-03-05", assetType: "Paper", quantity: 90 },
//   { branch: "ISE", date: "2023-04-05", assetType: "Paper", quantity: 60 },
//   { branch: "ISE", date: "2023-05-05", assjetType:"Paper", quantity: 40 },
// ];



function Graph() {
  const { userBranch } = useAuth();
  const fixedBranch = userBranch; // Fix the branch value
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [consumableData, setConsumableData] = useState({});
  const hasMounted = useRef(false);
  const chartInstanceRef = useRef(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const [sampleData, setSampledata] = useState([]);

  useEffect(()=>{
    fetchData()
  },[]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/clist/${fixedBranch}`);
      const data = response.data;
      setSampledata(data);
      console.log(sampleData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useLayoutEffect(() => {
    // Initialize the bar graph when the component mounts
    renderBarGraph();
  }, []);

  useEffect(() => {
    if (hasMounted.current) {
      // Filter sample data based on selected criteria
      const filteredData = sampleData.filter(
        (item) =>
          item.branch === fixedBranch && // Fix the branch value
          (!selectedMonthYear ||
            getMonthYear(item.date) === selectedMonthYear) &&
          ((!fromDate && !toDate) ||
            (fromDate &&
              toDate &&
              new Date(item.date) >= new Date(fromDate) &&
              new Date(item.date) <= new Date(toDate)) ||
            (fromDate &&
              !toDate &&
              new Date(item.date) >= new Date(fromDate)) ||
            (!fromDate && toDate && new Date(item.date) <= new Date(toDate)))
      );

      // Process data to group by assetType and month
      const processedData = filteredData.reduce((acc, item) => {
        const key = `${item.assetType}-${getMonthYear(item.date)}`;
        acc[key] = (acc[key] || 0) + item.quantity;
        return acc;
      }, {});

      setConsumableData(processedData);
      setIsGraphVisible(true); // Set visibility flag for the graph
    } else {
      hasMounted.current = true;
    }
  }, [selectedMonthYear, fromDate, toDate]);

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
    setSelectedMonthYear("");
    setFromDate("");
    setToDate("");
    setIsGraphVisible(false);
  };

  return (
    <div className="flex h-full">
      <div className="flex-col ml-0 w-full md:w-1/2 md:ml-20 lg:ml-96 mr-2 lg:mr-4 mt-2 items-center">
        <div className="flex flex-col items-center mt-4">
        <div className="flex justify-end items-end">
        <button
          className=" text-yellow-500 bg-black font-bold py-1 px-4 rounded-md"
          onClick={clearGraph}
        >
          Reset
        </button>
        </div>
          <div className="flex flex-col mt-1 md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 md:items-center">
            {/* Fixed branch */}
            <div className="flex items-center">
              <div className="font-bold text-gray-600">Branch:</div>
              <div className="border-2 border-gray-700 ml-1 rounded-md font-light w-52 h-10">
                {fixedBranch}
              </div>
            </div>

            <div className="flex items-center">
              <div className="font-bold text-gray-600">Month:</div>
              <input
                type="month"
                value={selectedMonthYear}
                className="border-2 border-gray-700 font-light rounded-md ml-2 w-52 h-10"
                onChange={(e) => setSelectedMonthYear(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <label className="font-bold text-gray-600">From:</label>
              <input
                type="date"
                value={fromDate}
                className="border-2 border-gray-700 ml-2 rounded-md font-light w-44 h-10"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <label className="font-bold text-gray-600">To:</label>
              <input
                type="date"
                value={toDate}
                className="border-2 border-gray-700 ml-2 rounded-md font-light w-44 h-10"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
          {Object.keys(consumableData).length === 0 ? (
            <div className="flex-col justify-center items-center mt-4 md:mt-28 lg:mt-28 ml-4 w-96 h-40 shadow-lg border border-gray-300">
              <div className="flex-col justify-center items-center">
                <TbMoodEmptyFilled className="text-yellow-400 w-20 h-20 ml-36 mt-6"></TbMoodEmptyFilled>
                <p className="text-center">No data available</p>
              </div>
            </div>
          ) : (
            <canvas id="barGraph" width="400" height="200"></canvas>
          )}
        </div>
      </div>
    </div>
  );
}

export default Graph;

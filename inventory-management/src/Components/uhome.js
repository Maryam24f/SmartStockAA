import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Us from "./Umain";
import { useAuth } from "./AuthContext";
import axios from "axios";

function Uhome() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const navigate = useNavigate();
  // Rest of the Doughnut component logic
  const dashboardContent = [
    {
      color: `bg-blue-400`,
      Heading1: "",
      Heading2: "Assets",
    },
    {
      color: "bg-red-400",
      Heading1: "",
      Heading2: "Maintenance",
    },
    {
      color: "bg-pink-400",
      Heading1: "",
      Heading2: "Reports",
    }
  ];
  // Mock data for mentenance
  const [ment, setMent] = useState([]);
  const { userBranch, userEmail } = useAuth();
  // Mock data for assets
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    fetchData(); // Fetch data when the category changes
    fetchMaint();
    // Add other dependencies if needed for the useEffect
  }, []);

  const fetchData = async () => {
    try {
      // Make a GET request to fetch assets for all branches
      const response = await axios.get(`http://localhost:8000/assets`);

      // Filter the response data based on the user's branch
      const filteredAssets = response.data.filter(
        (asset) => asset.branch === userBranch
      );
      console.log(filteredAssets);
      // Set the filtered data in the assets state
      setAssets(filteredAssets);
      console.log("assets: " + { assets });
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };
  const fetchMaint = async () => {
    try {
      // Make a GET request to fetch assets for all branches
      const response = await axios.get(`http://localhost:8000/maint`);

      // Filter the response data based on the user's branch
      const filteredAssets = response.data.filter(
        (asset) => asset.branch === userBranch
      );
      console.log(filteredAssets);
      // Set the filtered data in the assets state
      setMent(filteredAssets);
      console.log("assets: " + { ment });
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  // Extract asset categories and their counts
  const assetCategories = {};
  assets.forEach((asset) => {
    const { category } = asset;
    assetCategories[category] = (assetCategories[category] || 0) + 1;
  });
  // Extract asset type and their counts
  // Extract asset type and their counts
  const typeCounts = {};
  ment.forEach((item) => {
    const { type } = item;
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  });

  // Data for the doughnut chart
  const data = {
    labels: Object.keys(assetCategories),
    datasets: [
      {
        data: Object.values(assetCategories),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          // Add more colors if needed
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          // Add more colors if needed
        ],
        borderWidth: 1,
      },
    ],
  };
  // Generate random colors
const generateRandomColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
    colors.push(randomColor);
  }
  return colors;
};

// Get the types and their counts
const types = Object.keys(typeCounts);
const numTypes = types.length;

// Generate colors based on the number of types
const backgroundColors = generateRandomColors(numTypes);

// Construct the dataset
const dataM = {
  labels: types,
  datasets: [{
    data: Object.values(typeCounts),
    backgroundColor: backgroundColors,
    borderColor: backgroundColors.map(color => color.replace(', 0.5)', ', 1)')),
    borderWidth: 1,
  }],
};
  const options = {
    maintainAspectRatio: false,
    // other options...
  };
  // Function to handle div click and navigate to a new page
  const handleDivClick = (props) => {
    const { state } = props;

    if (state && typeof state.currIndex !== "undefined") {
      switch (state.currIndex) {
        case 0:
          navigate("/Uassets");
          break;

        case 1:
          navigate("/Umaintenance");
          break;

        case 2:
          navigate("/Ureport");
          break;

        default:
          // Handle default case if needed
          break;
      }
    }
  };
  return (
    <div className="h-screen">
      <Us />
      {/* Asset type */}
      <div className="flex-col  max-w-auto sm:ml-0  pl-2 pr-4  overflow-y-auto">
        <div className=" grid w-full gap-8 lg:grid-cols-3 justify-center items-center mt-28">
          {dashboardContent.map(({ Heading1, Heading2 }, currIndex) => {
            return (
              <div class="group relative">
                <div
                  className={`aspect-h-1 aspect-w-1  w-full sm:overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-40 p-4 ${
                    (currIndex == 0 && "bg-blue-400") ||
                    (currIndex == 1 && "bg-yellow-400") ||
                    (currIndex == 2 && "bg-red-400")
                  }`}
                  style={{ zIndex: 10 }}
                  onClick={() => handleDivClick({ state: { currIndex } })}
                >
                  <h1 className="text-white text-2xl">{Heading1}</h1>
                  <h1 className="font-serif text-4xl text-white">
                    {Heading2}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div class="grid gap-6 lg:grid-cols-2 ml-2 mr-2 h-auto">
        <div className="justify-center items-center p-1 h-full mt-6 rounded-xl group sm:flex border border-gray-200 space-x-0 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
          <div className="sm:w-auto">
            <div className="space-y-4 h">
              <h4 className="pl-12 text-2xl font-semibold text-cyan-900">
                Asset By Category
              </h4>
              <div className="relative" style={{ height: "400px" }}>
                {/* Apply a custom class to the canvas element */}
                <Doughnut data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
        <div className="justify-center items-center h-full p-1 mt-6 rounded-xl group sm:flex border border-gray-200 space-x-0 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
          <div className="sm:w-auto">
            <div className="space-y-4 ">
              <h4 className="pl-12 text-2xl font-semibold text-cyan-900">
                Maintenance By Asset Type
              </h4>
              <div className="relative " style={{ height: "400px" }}>
                {/* Apply the same custom class to the canvas element */}
                <Doughnut data={dataM} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Uhome;

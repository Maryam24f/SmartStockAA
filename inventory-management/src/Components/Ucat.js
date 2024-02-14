import React from 'react';
import { useNavigate } from 'react-router-dom';
import Us from './Umain'
function Uassets() {
    const navigate = useNavigate();
  
    // Function to handle div click and navigate to a new page
    const handleDivClick = (data) => {
      
  
      // Use the `navigate` function to redirect to a new page with props
      navigate(`/Uassets/Uassetslist`, { state: data });
    };
  
    return (
        <div className="h-screen">
        <Us />
        {/* Asset type */}
        <div className="flex-col  max-w-auto sm:ml-0  pl-2 pr-4 overflow-y-auto ">
            {/* Categories */}
            <h2 className="text-3xl pt-2 font-semibold mt-32">Categories</h2>
            <div className='flex-col h-96 mt-4 pt-2 space-y-2 '>
              {/* Fix Assets */}
              <div
                className="p-1 w-full h-1/4  rounded-xl sm:flex border border-gray-200 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl lg:transform md:transform transition-transform hover:scale-95"
                onClick={() => handleDivClick({category:'fix'})}
              >
                <div className="sm:w-7/12 pl-0 p-1 whitespace-nowrap">
                  <div className="space-y-0">
                    <h4 className="text-3xl font-light text-cyan-900">Fix Assets</h4>
                  </div>
                </div>
              </div>
  
              {/* Consumable Assets */}
              <div
                className="p-1 w-full h-1/4  rounded-xl sm:flex border border-gray-200 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl lg:transform md:transform transition-transform hover:scale-95"
                onClick={() => handleDivClick({category:'consumable'})}
              >
                <div className="sm:w-7/12 pl-0 p-1 whitespace-nowrap">
                  <div className="space-y-0">
                    <h4 className="text-3xl font-light text-cyan-900">Consumable Assets</h4>
                  </div>
                </div>
                
              </div>
  
              {/* IT Assets */}
              <div
                className="p-1 w-full h-1/4  rounded-xl sm:flex border border-gray-200 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl lg:transform md:transform transition-transform hover:scale-95"
                onClick={() => handleDivClick({category:'IT'})}
              >
                <div className="sm:w-7/12 pl-0 p-1 whitespace-nowrap">
                  <div className="space-y-0">
                    <h4 className="text-3xl font-light text-cyan-900">IT Assets</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
    );
  }
  
  export default Uassets;
  
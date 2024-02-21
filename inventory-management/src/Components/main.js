import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {AiOutlineMenu, AiOutlineBank, AiOutlinePartition} from "react-icons/ai"
import {HiCollection} from "react-icons/hi"
import {GrHostMaintenance} from "react-icons/gr"
import {BsGraphUpArrow} from "react-icons/bs"
import {FiUsers} from "react-icons/fi"
import {CgProfile} from "react-icons/cg"
import l4 from "../Assets/l4.png"
import {SiHomebridge} from "react-icons/si"
function SideBar() {
  const [toggle, setToggle] = useState(false)
  return (
  <div className="relative z-20 flex-col max-h-auto min-h-screen">
      {/* profile bar*/}
  <div className='fixed'>
     <div className="text-xl bg-white text-black font-extrabold flex justify-start space-x-1 md:w-72 sm:w-56" >
      <div className='w-10 h-10 ml-1 mb-1 mt-1 bg-yellow-500 rounded-full'>  
      <SiHomebridge className='w-10 h-10 mb-1'></SiHomebridge>
      </div>
      <h1 className='mt-2 text-2xl font-serif '><span className='text-yellow-500 text-3xl'>AA</span>stock</h1>
      <AiOutlineMenu onClick={()=>setToggle(!toggle)} className='text- mt-5 md:hidden cursor-pointer'/> 
    </div>    
  
     {/* Sidebar */}
     <div
        className={`${
          toggle
            ? 'h-screen fixed flex-1 overflow-y-auto  bg-yellow-500 text-black  md:w-72 sm:w-56 flex-shrink-0'
            : 'hidden fixed md:flex flex-1 h-screen bg-yellow-500 text-black  md:w-72 sm-w-'
        }`}
      >
  <div className="flex-1 overflow-y-auto pt-10 p-8 space-y-2 space-x-2 text-xl">
      {/* Sidebar navigation links */}
    
      <Link to="/home" className="py-2 ml-2 flex hover:bg-black hover:text-yellow-400 hover:pl-5">
        <AiOutlineBank className='mr-7  mt-1'/>Dashboard</Link>
      <Link to="/assets" className=" flex  hover:bg-black hover:text-yellow-400 hover:pl-5">
        <HiCollection className='mr-7 mt-1'/>Assets</Link>
      <Link to="/branches" className="py-2 flex  hover:bg-black hover:text-yellow-400 hover:pl-5 ">
        <AiOutlinePartition className='mr-7 mt-1'/>Branches</Link>
      <Link to="/maintenance" className="py-2 flex  hover:bg-black hover:text-yellow-400 hover:pl-5">
        <GrHostMaintenance className='mr-7 mt-1'/>Maintenance</Link>
      <Link to="/reports" className="py-2 flex  hover:bg-black hover:text-yellow-400 hover:pl-5 ">
        <BsGraphUpArrow className='mr-7 mt-1'/>Reports</Link>
      <Link to="/users" className="py-2 flex  hover:bg-black hover:text-yellow-400 hover:pl-5">
        <FiUsers className='mr-7 mt-1'/>Users</Link>
    </div>
  </div>  
  </div>
</div>
  )
}
export default SideBar;
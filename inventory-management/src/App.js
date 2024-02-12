import './App.css';
import SideBar from './Components/main';
import Dashboard from './Components/Dashboard';
import Assets from './Components/Assets';
import Branches from './Components/branches';
import { BrowserRouter, Route, Routes,useNavigate  } from 'react-router-dom';
import Maintenance from './Components/maintenance';
import Users from './Components/users';
import Report from './Components/reports';
import AssetsList from './Components/AssetsList'
import BranchAssetCategories from './Components/BranchAssetCategories';
import BranchData from './Components/branchData';
import Login from './Components/login';
import Us  from './Components/Umain';
import { Navigate} from 'react-router-dom';
import PrivateRoute from './Components/privateRoute';
import { AuthProvider, useAuth } from './Components/AuthContext';
import Uhome from './Components/uhome';
import Uassets from './Components/Ucat';
import UassetsList from './Components/Uassetlist';
import Umaintenance from './Components/Umaintenance';
import Ureport from './Components/Ureport';

// Define the main App component
const App = () => {
  const { userRole } = useAuth();
  
  /////public///////
  function Public({children}){
      return <> {children}</>
    }
  //////admin check////
  function Admin({children}){
    if (userRole === 'admin'){
      return <> {children}</>
    }
    return <div>u don't have access to this page</div>
   }
   ///////user check//////
   function User({children}){
    if (userRole === 'user'){
      return <> {children}</>
    }
    return <div>u don't have access to this page</div>
   }
   ///////////
  return (
    <Routes>
      <Route path="/" element={<Public><Login/></Public>} />
      <Route path='/home' element={<Admin><Dashboard/></Admin>} /> 
      <Route path='/assets' element={<Admin><Assets/></Admin>} />  
      <Route path='/assets/AssetsList' element={<Admin><AssetsList/></Admin>} /> 
      <Route path='/branches' element={<Admin><Branches></Branches></Admin>} />  
      <Route path='/branches/BranchAssetCategories' element={<Admin><BranchAssetCategories></BranchAssetCategories></Admin>} />
      <Route path='/branches/BranchAssetCategories/BranchData' element={<Admin><BranchData></BranchData></Admin>} />
      <Route path='/maintenance' element={<Admin><Maintenance></Maintenance></Admin>} />  
      <Route path='/reports' element={<Admin><Report></Report></Admin>} />
      <Route path='/users' element={<Admin><Users></Users></Admin>} />  
      <Route path="/Uhome" element={<User><Uhome></Uhome></User>} />
      <Route path="/Uassets" element={<User><Uassets></Uassets></User>} />
      <Route path='/Uassets/Uassetslist' element={<User><UassetsList></UassetsList></User>} />
      <Route path='/Umaintenance' element={<User><Umaintenance></Umaintenance></User>} />
      <Route path='/Ureport' element={<User><Ureport></Ureport></User>} />
    </Routes>
  );
};

// Export the App component
export default App;

// function App() {
//   return (
//     <div className="min-h-screen bg-white w-full lg:">      
//       <BrowserRouter>
//       <Routes >   
//       <Route path='/' element={<Dashboard/>} /> 
//       <Route path='/assets' element={<Assets/>} />  
//       <Route path='/assets/AssetsList' element={<AssetsList/>} /> 
//       <Route path='/branches' element={<Branches></Branches>} />  
//       <Route path='/branches/BranchAssetCategories' element={<BranchAssetCategories></BranchAssetCategories>} />
//       <Route path='/branches/BranchAssetCategories/BranchData' element={<BranchData></BranchData>} />
//       <Route path='/maintenance' element={<Maintenance></Maintenance>} />  
//       <Route path='/reports' element={<Report></Report>} />
//       <Route path='/users' element={<Users></Users>} />  
//       </Routes> 
//       </BrowserRouter>       
//     </div>
//   );
// }
// export default App;

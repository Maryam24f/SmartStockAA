import "../App.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import SideBar from "./main";
import Profile from "./profile";

function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    branch: "",
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    // Fetch users from backend when component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data);
      console.log(users)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUpdateMode && selectedUserId !== null) {
        // Update existing user
        await axios.put(`http://localhost:8000/users/${selectedUserId}`, formData);
      } else {
        // Add new user
        await axios.post('http://localhost:8000/users', formData);
      }

      // Refetch users after update
      fetchUsers();

      // Clear form input values
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
        branch: "",
      });
      setIsUpdateMode(false);
      setSelectedUserId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/users/${userId}`);
      // Refetch users after delete
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = (userId) => {
    console.log('Clicked update button for user:', userId);
    setSelectedUserId(userId); // Ensure that selectedUserId is set correctly
    console.log('Selected user id:', selectedUserId);
    
    const selectedUser = users.find((user) => user._id === userId);
    if (selectedUser) {
      setFormData({
        username: selectedUser.username,
        email: selectedUser.email,
        password: selectedUser.password,
        role: selectedUser.role,
        branch: selectedUser.branch,
      });
      setIsUpdateMode(true);
    } else {
      console.error(`User with id ${userId} not found.`);
    }
  };
  
  
  const handleCancelUpdate = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "",
      branch: "",
    });
    setSelectedUserId(null);
    setIsUpdateMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-col w-screen">
        <Profile />
        {/* Screen content */}
        <div className="flex-col ml-2  md:ml-80 lg:ml-80 mr-2 lg:mr-4 mt-16 space-y-4">
          <h2 className="text-4xl font-semibold">Users</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  placeholder="Enter name"
                  required
                />
              </div>
              
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div>
                <label
                  for="role"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Role
                </label>
                <input
                  type="role"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  placeholder="Enter role"
                  required
                />
              </div>
              <div>
                <label
                  for="branch"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Branch
                </label>
                <input
                  type="branch"
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  class="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                  placeholder="Enter branch"
                  required
                />
              </div>
             
            </div>
            <div>
                <button
                  type="submit"
                  className="px-2 py-2 transition rounded-lg bg-black text-yellow-500 hover:bg-white hover:text-gray-800 border-2 border-gray-200 focus:outline-none"
                >
                  {isUpdateMode ? "Update" : "Submit"}
                </button>
                {isUpdateMode && (
                  <button
                    type="button"
                    onClick={handleCancelUpdate}
                    className="ml-2 inline-flex justify-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-500 active:bg-gray-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
          </form>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border-2 border-black shadow-md bg-white rounded-md">
              <thead className="border border-black">
                <tr className="bg-black text-yellow-500 font-bold">
                  <td className="border border-black">User Name</td>
                  <td className="border border-black">Email</td>
                  <td className="border border-black">password</td>
                  <td className="border border-black">Role</td>
                  <td className="border border-black">Branch</td>
                  <td className="border border-black">Action</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-black">
                    <td className="border border-black text-black">
                      {user.username}
                    </td>
                    <td className="border border-black">{user.email}</td>
                    <td className="border border-black">{user.password}</td>
                    <td className="border border-black">{user.role}</td>
                    <td className="border border-black">{user.branch}</td>
                    <td className="border border-black space-y-1">
                      {/* <div className='flex-col space-x-2 space-y-2 '> */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-2 py-1 bg-black text-yellow-500 mr-2 rounded-lg"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="px-2 py-1 bg-black text-yellow-500 mr-2 rounded-lg"
                      >
                        Update
                      </button>
                      {/* </div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;

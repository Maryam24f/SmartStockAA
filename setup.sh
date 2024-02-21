#!/bin/bash

# Start backend server
cd "D:/React/ins/ss api"  # Navigate to the directory where backend code resides
npm install # Ensure dependencies are installed
npm start & # Start the backend server in the background

# Start frontend server
cd "D:/React/ins/inventory-management"  # Navigate to the directory where frontend code resides
npm install # Ensure dependencies are installed
npm start   # Start the frontend server

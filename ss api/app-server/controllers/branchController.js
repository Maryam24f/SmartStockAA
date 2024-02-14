const Branch= require("../modals/branchSchema")
const Asset = require('../modals/assetSchema');
// Create a new asset
const createBranch = async (req, res) =>{
    console.log('Create branch Function Called');
    console.log('Request Body:', req.body);
    try {
      const newBranch = new Branch(req.body);
      console.log(newBranch);
      //const branch = newBranch.trim();
      await newBranch.save();
      res.status(201).json(newBranch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get all assets
  const getBranches = async (req, res) => {
    console.log('Get Assets Function Called');
    try {
      const branches = await Branch.find();
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json(branches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get assets by category
  const getAssetsByBranchAndCategory = async (req, res) => {
    let bran = req.params.branch.trim(); // Trim the branch parameter directly
    let cat = req.params.category.trim(); // Trim the category parameter directly
    console.log('Branch:', bran);
    console.log('Category:', cat);
    try {
      const assets = await Asset.find({ branch: bran, category: cat }); // Use both trimmed values in the query
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  // Delete a branch
const deleteBranch = async (req, res) => {
    const branchId = req.params.id;
    try {
        await Branch.findByIdAndDelete(branchId);
        res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


  module.exports = {createBranch, getBranches, getAssetsByBranchAndCategory, deleteBranch}
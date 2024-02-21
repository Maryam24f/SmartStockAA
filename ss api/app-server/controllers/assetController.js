const Asset = require('../modals/assetSchema');
const Allocation = require('../modals/allocation')
// Create a new asset
const createAsset = async (req, res) =>{
  console.log('Create Asset Function Called');
  console.log('Request Body:', req.body);
  try {
    const newAsset = new Asset(req.body);
    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all assets
const getAssets = async (req, res) => {
  console.log('Get Assets Function Called');
  try {
    const assets = await Asset.find();
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all consuamble assets
const getConsuamble = async (req, res) => {
  console.log('Get Assets Function Called');
  try {
    const assets = await Asset.find({category: 'consumable'});
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get assets by category
const getAssetsByCategory = async (req, res) => {
  let category = req.params.category;
  category = category.trim();
  console.log('Category:', category);
  try {
    const assets = await Asset.find({ category });
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update asset by ID
const updateAsset = async (req, res) => {
  const assetId = req.params.id;
  const trimmedId = assetId.trim();
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(trimmedId, req.body, { new: true });
    res.status(200).json(updatedAsset);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Delete asset by ID
const deleteAsset = async (req, res) => {
  const assetId = req.params.id;
  try {
    await Asset.findByIdAndDelete(assetId);
    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Allocate asset by ID
const allocateAsset = async (req, res) => {
  const assetId = req.params.id;
  const allocationData = req.body;

  try {
    // Retrieve the selected asset
    const selectedAsset = await Asset.findById(assetId);

    if (!selectedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    // Update the status and allocation details based on the asset category
    switch (selectedAsset.category) {
      case 'consumable':
        handleConsumableAssetAllocation(selectedAsset, allocationData);
        break;
      case 'fix':
        handleFixAssetAllocation(selectedAsset, allocationData);
        break;
      case 'IT':
        handleITAssetAllocation(selectedAsset, allocationData);
        break;
      default:
        return res.status(400).json({ message: 'Invalid asset category' });
    }

    // Save the updated asset
    const updatedAsset = await selectedAsset.save();
    res.status(200).json("aseet updated");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleConsumableAssetAllocation = async (asset, allocationData) => {
  const { date, branch, quantity } = allocationData;
  try {
    // Check if the given quantity is less than or equal to the available quantity
    if (quantity <= asset.quantity) {
      // Update the selected asset with allocation data
      asset.status = 'Not Allocated';
      asset.quantity -= quantity;

      // Create a new asset copy
      const allocatedAssetCopy = new Asset({
        category: asset.category,
        name: asset.name,
        type: asset.type,
        details: asset.details,
        status: 'Allocated',
        branch,
        date,
        quantity,
        // Add other fields based on your data model
      });

      // Create a new allocation record
      const allocationRecord = new Allocation({
        name: asset.name,
        type: asset.type,
        details: asset.details,
        branch,
        category: asset.category,
        quantity,
        date,
        status: 'Allocated',
        // Add other fields based on your data model
      });

      // Save the updated asset, the new asset copy, and the allocation record to the database
      await Promise.all([asset.save(), allocatedAssetCopy.save(), allocationRecord.save()]);
    } else {
      throw new Error('The given quantity is greater than the available quantity');
    }
  } catch (error) {
    throw new Error(`Error allocating consumable asset: ${error.message}`);
  }
};

const handleFixAssetAllocation = async (asset, allocationData) => {
  const { date, branch } = allocationData;
  try {
    // Update the asset with allocation details for fix assets
    asset.status = 'Allocated';
    asset.branch = branch;
    asset.date = date;

    // Create a new allocation record
    const allocationRecord = new Allocation({
      name: asset.name,
      type: asset.type,
      details: asset.details,
      tag:asset.tag,
      branch,
      category: asset.category,
      date,
      status: 'Allocated',
      // Add other fields based on your data model
    });

    // Save the updated asset and the allocation record to the database
    await Promise.all([asset.save(), allocationRecord.save()]);
  } catch (error) {
    throw new Error(`Error allocating fix asset: ${error.message}`);
  }
};

const handleITAssetAllocation = async (asset, allocationData) => {
  const { date, branch } = allocationData;
  try {
    // Update the asset with allocation details for IT assets
    asset.status = 'Allocated';
    asset.branch = branch;
    asset.allocationDate = date;

    // Create a new allocation record
    const allocationRecord = new Allocation({
      name: asset.name,
      type: asset.type,
      details: asset.details,
      branch,
      category: asset.category,
      date,
      tag: asset.tag,
      status: 'Allocated',
      // Add other fields based on your data model
    });

    // Save the updated asset and the allocation record to the database
    await Promise.all([asset.save(), allocationRecord.save()]);
  } catch (error) {
    throw new Error(`Error allocating IT asset: ${error.message}`);
  }
};

const getAllocationHistory = async (req, res) => {
  try {
    const cat = req.params.category;
    category = cat.trim();
    console.log(category)
    const allocationHistory = await Allocation.find({ category },)
      .sort({ date: 'desc' }) // Sort by date in descending order
      .exec();

    res.json(allocationHistory);
  } catch (error) {
    console.error('Error fetching allocation history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getConsuamble, createAsset, getAssets, getAssetsByCategory, updateAsset, deleteAsset, allocateAsset, getAllocationHistory };


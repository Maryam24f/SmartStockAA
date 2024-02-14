const Clist = require('../modals/ClistSchema');

// Controller function to create new data
const createClist = async (req, res) => {
    try {
        // Create a new instance of the Clist model using the request body
        const newList = new Clist(req.body);
        // Save the new data to the database
        await newList.save();
        // Return a success response with the created data
        res.status(201).json(newList);
    } catch (error) {
        // Return an error response if there's any error
        res.status(500).json({ error: error.message });
    }
};

// Controller function to fetch all data
const getClists = async (req, res) => {
    try {
        // Fetch all data from the Clist collection
        const lists = await Clist.find();
        // Return the fetched data as a JSON response
        res.status(200).json(lists);
    } catch (error) {
        // Return an error response if there's any error
        res.status(500).json({ error: error.message });
    }
};
const getDataByBranch= async (req, res) => {
    let bran = req.params.branch.trim(); // Trim the branch parameter directly
   // let cat = req.params.category.trim(); // Trim the category parameter directly
    console.log('Branch:', bran);
    
    try {
      const assets = await Clist.find({ branch: bran}); // Use both trimmed values in the query
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { createClist, getClists, getDataByBranch };

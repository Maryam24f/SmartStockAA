const Maint = require('../modals/maintSchema');

// Controller function to create new data
const createMaint = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, type, tag, demand, date, branch, category, supplier, cost, status } = req.body;
        
        // Check if a file is included in the request
        let bill;
        console.log(req.file);
        console.log("buffer"+ req.file.buffer)
        
        if (req.file) {
            // If a file is included, set the bill field to the file data
            bill = {
                data: req.file.buffer, // Assuming you're using multer for file uploads
                contentType: req.file.mimetype
            };
        }

        // Create a new instance of the Maintenance model
        const newList = new Maint({
            name,
            type,
            tag,
            demand,
            date,
            branch,
            category,
            supplier,
            cost,
            bill, // Set the bill field with the file data
            status
        });

        // Save the new data to the database
        await newList.save();

        // Return a success response with the created data
        res.status(201).json(newList);
    } catch (error) {
        // Return an error response if there's any error
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};


// Controller function to fetch all data
const getMaint = async (req, res) => {
    try {
        // Fetch all data from the Clist collection
        const lists = await Maint.find();
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
      const assets = await Maint.find({ branch: bran}); // Use both trimmed values in the query
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Controller function to update status based on data ID
const updateStatus = async (req, res) => {
    const { id, status } = req.body;

    try {
        // Find the data by its unique ID and update the status
        const updatedData = await Maint.findByIdAndUpdate(id, { status }, { new: true });

        if (updatedData) {
            res.status(200).json(updatedData);
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createMaint, getMaint, getDataByBranch, updateStatus };

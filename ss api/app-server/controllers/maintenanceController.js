const Maint = require('../modals/maintSchema');
const nodemailer = require("nodemailer");
// Controller function to create new data
const createMaint = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mq5248224@gmail.com",
            pass: "enpc qcxo ukre ljqu",
        },
    });

    try {
        const { name, type, tag, demand, date, branch, category, supplier, cost, status } = req.body;
        
        let bill;
        if (req.file) {
            bill = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

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
            bill,
            status
        });

        await newList.save();

        // Create the email message
        const message = {
            from: 'mq5248224@gmail.com',
            to: 'mq5248224@gmail.com',
            subject: `Received new request from ${branch} branch`,
            text: `You have received new request of assets for branch ${branch}. Open and check application for more details`,
            html: `<b>You have received new request of assets for branch ${branch}. Open and check application for more details</b>`,
        };

        // Send email and handle errors
        await transporter.sendMail(message);

        // Log the email message
        console.log("Message sent: %s, url: %s", message.messageId, nodemailer.getTestMessageUrl(message));
        console.log("Email Message:", message);

        // Return a success response with the created data
        res.status(201).json({ newList, message }); // Merge newList and message into a single JSON response
    } catch (error) {
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

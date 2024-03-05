const Clist = require("../modals/ClistSchema");
const nodemailer = require("nodemailer");

const createClist = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "mq5248224@gmail.com",
      pass: "chrgaxefezkjctns",
    },
  });
  try {
    const newList = new Clist(req.body);
    await newList.save();
    const { email } = req.body;

    // Create the email message
    const message = {
      from: 'mq5248224@gmail.com', // sender address
      to: 'mq5248224@gmail.com', // list of receivers
      subject: "Received new notification", // Subject line
      text: "you have received new request", // plain text body
      html: "<b>you have received new request</b>", // html body
    };
    // Send email and handle errors
    await transporter.sendMail(message);
     // Log the email message
    console.log(
      "Message sent: %s, url: %s",
      message.messageId,
      nodemailer.getTestMessageUrl(message)
    );
    console.log("Email Message:", message);

    res.status(201).json(newList);
  } catch (error) {
    console.error("Error sending email:", error.message);
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
const getDataByBranch = async (req, res) => {
  let bran = req.params.branch.trim(); // Trim the branch parameter directly
  // let cat = req.params.category.trim(); // Trim the category parameter directly
  console.log("Branch:", bran);

  try {
    const assets = await Clist.find({ branch: bran }); // Use both trimmed values in the query
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update status based on month and branch
const updateStatus = async (req, res) => {
  const { month, branch, status } = req.body;

  try {
    // Find the data by month and branch and update the status
    const updatedData = await Clist.findOneAndUpdate(
      { month, branch },
      { status },
      { new: true }
    );

    if (updatedData) {
      res.status(200).json(updatedData);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update total and subtotal
const updateTotal = async (req, res) => {
  try {
    const { id } = req.params;
    const { total } = req.params;
    // Find the data by ID and update the total value
    const updatedList = await Clist.findByIdAndUpdate(
      id,
      { total },
      { new: true }
    );
    // Return the updated data
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createClist,
  getClists,
  getDataByBranch,
  updateTotal,
  updateStatus,
};

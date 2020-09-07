const express = require("express");
const contactUsRouter = express.Router();

const ContactUs = require("../models/contactUs-model");

// POST 
contactUsRouter.post("/", (req, res) => {

  let contactUs = new ContactUs(req.body);

  contactUs.save((err) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Error has occured",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        message: {
          msgBody: "Message successfully sent.",
          msgError: false,
        },
      });
    }
  });
});



module.exports = contactUsRouter;
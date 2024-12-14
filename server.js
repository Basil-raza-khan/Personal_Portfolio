const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON data

// Serve static files like your HTML and CSS
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle the form submission
app.post('/contact-form', (req, res) => {
  const { fullname, email, message } = req.body;

  // Create a transporter object for sending email
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // or any other email service you prefer
    auth: {
      user: process.env.EMAIL_USER,  // Use email from .env file
      pass: process.env.EMAIL_PASS,  // Use app password or regular password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,  // Use your email from .env
    subject: 'New Contact Form Submission',
    text: `Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Failed to send the message.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Message sent successfully!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

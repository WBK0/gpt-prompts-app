const nodemailer = require('nodemailer');

// Define transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@codebybartlomiej.pl",
    pass: "cf9de01f1",
  },
});

export default transporter;
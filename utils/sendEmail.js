const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "clervejoeson@gmail.com",
        pass: "wcwr yhjm nviv otvz",
    }
  });

  // Configure the email options
  const mailOptions = {
    from: 'clervejoeson@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;

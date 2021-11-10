const sgMail = require("@sendgrid/mail");

require("dotenv").config({ path: "../../.env" });

const send_email_function = async (tasks) => {
  sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);
  const msg = {
    to: "dlrlals05050@gmail.com", // Change to your recipient
    from: "klee214@myseneca.ca", // Change to your verified sender
    subject: "DEMO",
    text: "The demo is working now",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = send_email_function

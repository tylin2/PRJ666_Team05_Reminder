const sgMail = require("@sendgrid/mail");

require("dotenv").config({ path: "../../.env" });

const send_email_function = async (tasks) => {
  console.log(tasks);
  sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);
  const msg = {
    to: "dlrlals05050@gmail.com", // Change to your recipient
    from: "klee214@myseneca.ca", // Change to your verified sender
    subject: "DEMO",
    html: `<img src="https://inapak.com/wp-content/uploads/2017/07/iStock-491520707.jpg"><h1>${tasks[0]}The demo is working now</h1>`,
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

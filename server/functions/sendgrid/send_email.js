const sgMail = require("@sendgrid/mail");

require("dotenv").config({ path: "../../.env" });

const send_email_function = async (tasks) => {
  console.log(tasks);
  sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);
  const msg = {
    to: "dlrlals05050@gmail.com", // Change to your recipient
    from: "klee214@myseneca.ca", // Change to your verified sender
    subject: "DEMO",
    // I guess you can use bootstrap as well
    // Please save image files into the public->images folder. 
    // Once you start the server, the image file will be hosted : 
    // http://localhost:8080/images/img.jpg like that and you can use the image...
    // I just used external image file in google for now.
    // Once you make it pretty html file, I will make this portion as a function and move it to another script file
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

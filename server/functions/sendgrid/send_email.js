const sgMail = require("@sendgrid/mail");

require("dotenv").config({ path: "../../.env" });

const URL_IMG = `https://the-reminder-app.herokuapp.com/images`;

const send_email_function = async (collection) => {
  const users = [];
  const user_task_sets = {};

  tasks = collection.tasks;

  tasks.forEach((task, index) => {
    var isExist = false;
    users.forEach((user) => {
      if (user == task.user) {
        isExist = true;
      }
    });
    if (!isExist) users.push(task.user);
  });

  users.forEach((user) => {
    tasks.forEach((task) => {
      if (user == task.user) {
        if (!user_task_sets[user]) {
          user_task_sets[user] = [];
        }
        user_task_sets[user].push(task);
      }
    });
  });

  for (const key in user_task_sets) {
    const task_array = user_task_sets[key].map((task) => {
      return `<tr>
            <td style="padding:0;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                        <td style="padding:0;width:25%;vertical-align:top;color:#153643;">
                            <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">${task.name}</p>
                        </td>
                        <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                        <td style="padding:0;width:43%;vertical-align:top;color:#153643;">
                            <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">${task.descript}</p>
                        </td>
                        <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                        <td style="padding:0;width:28%;vertical-align:top;color:#153643;">
                            <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">${task.dueDate}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>`;
    });
    const tasks_string = task_array.join("");
    sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

    const msg = {
      to: `${key}`, // Change to your recipient
      from: "klee214@myseneca.ca", // Change to your verified sender
      subject: "DEMO",
      // I guess you can use bootstrap as well
      // Please save image files into the public->images folder.
      // Once you start the server, the image file will be hosted :
      // http:///api//images/img.jpg like that and you can use the image...
      // I just used external image file in google for now.
      // Once you make it pretty html file, I will make this portion as a function and move it to another script file
      html: `
                <!DOCTYPE html>
                <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                    <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width,initial-scale=1">
                  <meta name="x-apple-disable-message-reformatting">
                  <title></title>
                  <!--[if mso]>
                  <noscript>
                    <xml>
                            <o:OfficeDocumentSettings>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                      </o:OfficeDocumentSettings>
                    </xml>
                  </noscript>
                  <![endif]-->
                  <style>
                    table, td, div, h1, p {font-family: Arial, sans-serif;}
                  </style>
                </head>
                </html>
            
                <body style="margin:0;padding:0;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
                    <tr>
                      <td align="center" style="padding:0;">
                        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                                    <!-- Header -->
                                    <tr>
                                        <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
            
                                            <a href="https://the-reminder-app.herokuapp.com/"><img src="${URL_IMG}/logo.png" alt="" width="300" style="height:auto;display:block;" />
            
                                        </td>
                                    </tr>
                                    <!-- Body -->
                                    <tr>
                                        <td style="padding:36px 30px 42px 30px;">
                                            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                                <tr>
                                                    <td style="padding:0 0 36px 0;color:#153643;">
                                                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Notification Message</h1>
                                                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">This message is to notify the Stuff Reminder App user that their setting task/objective is going to meet the deadline soon.</p>
                                                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Here are the information of your task: </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0;">
                                                        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                                            <tr>
                                                                <td style="padding:0;width:25%;vertical-align:top;color:#153643;">
                                                                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><b>Name</b></p>
                                                                </td>
                                                                <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                                                                <td style="padding:0;width:43%;vertical-align:top;color:#153643;">
                                                                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><b>Description</b></p>
                                                                </td>
                                                                <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                                                                <td style="padding:0;width:28%;vertical-align:top;color:#153643;">
                                                                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><b>Due Date</b></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <!-- Task 1 -->
            
                                                ${tasks_string}
            
                                                <tr>
                                                    <td style="padding:0;">
                                                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="https://the-reminder-app.herokuapp.com/">Go back to The Reminder App</a></p>
                                                    </td>
                                                </tr>
            
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- Footer -->
                                    <tr>
                                        <td style="padding:30px;background:#ee4c50;">
                                            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                                <tr>
                                                    <tr>
                                                        <td style="padding:0;width:50%;" align="left">
                                                            <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                                                                &reg; PRJ666, Group 5 2021<br/><a href="https://the-reminder-app.herokuapp.com/" style="color:#ffffff;text-decoration:underline;">Reminder App</a>
                                                            </p>
                                                        </td>
                                                        <td style="padding:0;width:50%;" align="right">
                                                            <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                                                <tr>
                                                                    <td style="padding:0 0 0 10px;width:38px;">
                                                                        <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="${URL_IMG}/twitter.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                                                    </td>
                                                                    <td style="padding:0 0 0 10px;width:38px;">
                                                                        <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="${URL_IMG}/facebook.jpg" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                                                    </td>
                                                                    <td style="padding:0 0 0 10px;width:38px;">
                                                                        <a href="http://www.instagram.com/" style="color:#ffffff;"><img src="${URL_IMG}/instagram.jpg" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tr>
                                            </table>
                                        </td>
            
                                    </tr>                    
                                </table>
                      </td>
                    </tr>
                  </table>
                </body>
                `,
    };

    var index;
    var hour;

    collection.email_task_sets.forEach((e, i) => {
      if (e.email == key) {
        index = i;
      }
    });

    if (collection.email_task_sets[index].notification == "00:00") {
      hour = 0;
    }
    if (collection.email_task_sets[index].notification == "09:00") {
      hour = 9;
    }
    if (collection.email_task_sets[index].notification == "12:00") {
      hour = 12;
    }
    if (collection.email_task_sets[index].notification == "21:00") {
      hour = 21;
    }

    //'March 13, 08 00:00'
    const current = new Date();
    if (hour === current.getHours()) {
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};

module.exports = send_email_function;

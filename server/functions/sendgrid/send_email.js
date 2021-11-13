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
        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
          <tr>
            <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
            <img src="../../client/src/assets/img/logo.png" alt="" width="300" style="height:auto;display:block;" />
            </td>
          </tr>
          <tr>
            <td style="padding:36px 30px 42px 30px;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                  <tr>
                    <td style="padding:0 0 36px 0;color:#153643;">
                            <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Notification Message</h1>
                          <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">This message is to notify the Stuff Reminder App user that their setting task/objective is going to meet the deadline in 07 days.</p>
                          <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sa">
                    </td>
                  </tr>
                  <tr>
                    <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                <tr>
                                <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">For more detail information, user can access to the Reminder stuff, login into the app and click on the Task tab to manage and update the to-do list.</p>
                                    </td>
                                    <td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                                    <td style="width:260px;padding:0;vertical-align:top;color:#153643;">
                                        <p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><img src="../../client/src/assets/img/checklist.png" alt="" width="260" style="height:auto;display:block;" /></p>
                                    </td>
                              </tr>
                            </table>
                    </td>
                  </tr>
                    </table>
            </td>
          </tr>
          <tr>
                <td style="padding:30px;background:#ee4c50;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                      <tr>
                        <td style="padding:0;width:50%;" align="left">
                                <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                                    &reg; PRJ666, Group 5 2021<br/><a href="http://www.example.com" style="color:#ffffff;text-decoration:underline;">Reminder App</a>
                                </p>
                        </td>
                        <td style="padding:0;width:50%;" align="right">
                          <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                  <tr>
                                    <td style="padding:0 0 0 10px;width:38px;">
                                            <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="../../client/src/assets/img/twitter.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                                    </td>
                                    <td style="padding:0 0 0 10px;width:38px;">
                                            <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="../../client/src/assets/img/facebook.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                                    </td>
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

const { call_api_to_check_due_date } = require("../../controllers/task");
const send_email_function = require("./send_email");

require("dotenv").config({ path: "../../.env" });

const time_set_function = async () => {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  if (hours != 0 && minutes != 0 && seconds != 0) {
    const total_time_to_seconds = 24 * 60 * 60;

    const rest_hour = hours * 60 * 60;
    const rest_minutes = minutes * 60;

    const rest_total_time =
      total_time_to_seconds - (rest_hour + rest_minutes + seconds);

    // make sure this will run tomorrow morning, not right now
    const run_email_send_timer = setTimeout(() => {
      const send_email = setInterval(() => {
        const now = new Date();
        const end = new Date();

        // 7 days later
        end.setUTCDate(now.getUTCDate() + 7);
        console.log("call_api_to_check_due_date");
        call_api_to_check_due_date(end).then((tasks) => {
          send_email_function(tasks);
        });
      }, 7200000);
    }, rest_total_time * 1000);
  }
};

module.exports = time_set_function;

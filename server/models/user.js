const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    password:{
      type: String,
      required: true
    },
    userName:{
      type: String,
      required: true
    },
    projectSet:{
      type: [{type: Schema.Types.ObjectId, ref: 'Project'}]
    },
    taskSet:{
      type: [{type: Schema.Types.ObjectId, ref: 'Task'}]
    },
    notificationTime:{
      type: String,
      required: true
    }

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
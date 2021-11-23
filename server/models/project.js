const mongoose = require("mongoose");

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};
const Schema = mongoose.Schema;
const projectSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [3, "Too short"],
      maxlength: [32, "Too long"],
    },
    manager: {
      type: String,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    descript: {
      type: String
    },
    createBy:{
      type:String,
      //type: Schema.Types.ObjectId, 
      ref: 'user'
    },
    
    taskSet:{
      type: [{type: Schema.Types.ObjectId, ref: 'Task'}]
    },

    isCompleted: {
      type: Boolean,
      default: false
    }    
  },
  { timestamps: true }
);

const category = mongoose.model("Project", projectSchema);
module.exports = category; //https://www.tutorialsteacher.com/nodejs/nodejs-modules



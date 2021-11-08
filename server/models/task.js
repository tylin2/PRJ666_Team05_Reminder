const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Name is required",
            minlength: [3, "Too short"],
            maxlength: [32, "Too long"],
            uppercase: true,
            unique:true
        },
        dueDate:{
            type: Date
        },
        remindDate:{
            type: Date
        },
        user:{
            type: String,
            ref: 'User'
            //type: Schema.Types.ObjectId, ref: 'User'
        },
        participants:[{type: Schema.Types.ObjectId, ref: 'User'}],
        descript: {
            type: String
        },
        project: {
            type: Schema.Types.ObjectId, ref: 'Project'
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
import mongoose from "mongoose";

const Schema = mongoose.Schema

const employeeModel = new Schema({


    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },

})

export default mongoose.model("employee", employeeModel)
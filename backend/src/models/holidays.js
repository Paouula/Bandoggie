import {Schema, model} from "mongoose";

const HolidaySchema = new Schema({
    name: {
        type: String,
        require: true
    },
}, {
    timestamps: true,
    strict: false
})

export default model("Holiday", HolidaySchema)
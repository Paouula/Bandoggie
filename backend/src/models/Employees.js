import { Schema, model} from "mongoose";

const employeeSchema = new Schema({
    nameEmployees: {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true
    },
    phoneEmployees: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirthday: {
        type: Date,
        required: true,
        trim: true
    },
    addressEmployees: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    hireDateEmployee : {
        type: Date,
        required: true,
        trim: true
    },
    duiEmployees : {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model('Employees', employeeSchema)
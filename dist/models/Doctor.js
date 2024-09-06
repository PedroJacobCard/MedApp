"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const doctorSchema = new Schema({
    doctorName: {
        type: String,
        required: [true, 'Doctor name is required']
    },
    login: {
        type: String,
        required: [true, 'Doctor login is required']
    },
    password: {
        type: String,
        required: [true, 'Doctor password is required']
    },
    medicalSpeciality: {
        type: String,
        required: [true, 'Medical speciality is required']
    },
    medicalRegistration: {
        type: String,
        required: [true, 'Medical registration is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Doctor email is required'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Doctor phone is required'],
        validate: {
            validator: function (phone) {
                return /^\+43[1-9][0-9]{3,12}$/.test(phone);
            },
            message: (props) => `${props.value} This is not a valid number. Please use the following format +43 999 9999999`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Doctor = mongoose_1.default.model('Doctor', doctorSchema);
exports.default = Doctor;

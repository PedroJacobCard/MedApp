"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const pacientSchema = new Schema({
    pacientName: {
        type: String,
        required: [true, 'Pacient name is required.']
    },
    birthDate: {
        type: Date,
        required: [true, 'Pacient birthday is required.']
    },
    email: {
        type: String,
        required: [true, 'Pacient email is required.']
    },
    phone: {
        type: String,
        required: [true, 'Pacient phone is required.'],
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
const Pacient = mongoose_1.default.model('Pacient', pacientSchema);
exports.default = Pacient;

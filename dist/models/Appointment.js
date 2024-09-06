"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Doctor_1 = __importDefault(require("./Doctor"));
const Pacient_1 = __importDefault(require("./Pacient"));
const Schema = mongoose_1.default.Schema;
const appointmentSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Appointment date is required']
    },
    doctorId: {
        type: String,
        required: [true, 'Doctor id is required'],
        validate: {
            validator: function (value) {
                const id = new mongoose_1.default.Types.ObjectId(value);
                return Doctor_1.default.exists({ _id: id });
            },
            message: (props) => {
                return `Doctor with id ${props.value} does not exist.`;
            }
        }
    },
    pacientId: {
        type: String,
        required: [true, 'Pacient id is required'],
        validate: {
            validator: function (value) {
                const id = new mongoose_1.default.Types.ObjectId(value);
                return Pacient_1.default.exists({ _id: id });
            },
            message: (props) => {
                return `Pacient with id ${props.value} does not exist.`;
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Appointment = mongoose_1.default.model('Appointment', appointmentSchema);
exports.default = Appointment;

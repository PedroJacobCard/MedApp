"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const prescriptionSchema = new Schema({
    date: {
        type: Date
    },
    appointmentId: {
        type: String,
        required: [true, 'Appointment id is required.']
    },
    medicine: {
        type: String,
        required: [true, 'Medicine name is required.']
    },
    dosage: {
        type: String,
        required: [true, 'Dosage is required.']
    },
    instructions: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    file: {
        type: String
    }
});
const Prescription = mongoose_1.default.model('Prescription', prescriptionSchema);
exports.default = Prescription;

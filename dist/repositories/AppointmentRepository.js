"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//import models
const Appointment_1 = __importDefault(require("../models/Appointment"));
class AppointmentRepository {
    getAllAppointments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Appointment_1.default.find();
        });
    }
    getAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Appointment_1.default.findById(id);
            }
            catch (error) {
                throw new mongoose_1.Error(error);
            }
        });
    }
    saveAppointment(_a) {
        return __awaiter(this, arguments, void 0, function* ({ date, doctorId, pacientId }) {
            try {
                const appointment = new Appointment_1.default({ date, doctorId, pacientId });
                return yield appointment.save();
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new mongoose_1.Error(`Database error occurred while saving appointment: ${error.message}`);
                }
                else {
                    throw new mongoose_1.Error("Error while saving appointment");
                }
            }
        });
    }
    updateAppointment(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update = yield Appointment_1.default.findByIdAndUpdate(id, Object.assign({}, body), { new: true });
                return update;
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new mongoose_1.Error(`Database error occurred while updating appointment: ${error.message}`);
                }
                else {
                    throw new mongoose_1.Error("Error while updating appointment");
                }
            }
        });
    }
    deleteAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Appointment_1.default.findByIdAndDelete(id);
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new mongoose_1.Error(`Database error occurred while deleting appointment: ${error.message}`);
                }
                else {
                    throw new mongoose_1.Error("Error while deleting appointment");
                }
            }
        });
    }
}
exports.default = new AppointmentRepository;

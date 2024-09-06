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
const AppointmentService_1 = __importDefault(require("../services/AppointmentService"));
class AppointmentController {
    getAllAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield AppointmentService_1.default.getAllAppointments();
                return res.json(appointments);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
    getAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const appointment = yield AppointmentService_1.default.getAppointment(id);
                return res.json(appointment);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
    saveAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, doctorId, pacientId } = req.body;
                const appointment = yield AppointmentService_1.default.saveAppointment({ date, doctorId, pacientId });
                return res.json(appointment);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
    updateAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const appointment = yield AppointmentService_1.default.updateAppointment(id, body);
                return res.json(appointment);
            }
            catch (error) {
                console.log(error);
                res.status(400).json(error);
            }
        });
    }
    deleteAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const appointment = yield AppointmentService_1.default.deleteAppointment(id);
                return res.json(appointment);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
    rescheduleAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const body = req.body;
            try {
                const appointment = yield AppointmentService_1.default.getAppointment(id);
                if (!appointment)
                    return res.status(404).json("Appointment not found");
                appointment.date = body.date;
                const newAppointment = yield AppointmentService_1.default.updateAppointment(id, body);
                return res.json(newAppointment);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new AppointmentController;

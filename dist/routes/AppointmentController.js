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
                return res.send(appointments);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
    getAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const appointment = yield AppointmentService_1.default.getAppointment(id);
                return res.send(appointment);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
    saveAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, doctorId, pacientId } = req.body;
                const appointment = yield AppointmentService_1.default.saveAppointment({ date, doctorId, pacientId });
                return res.send(appointment);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
    updateAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { date, doctorId, pacientId } = req.body;
                const appointment = yield AppointmentService_1.default.updateAppointment(id, { date, doctorId, pacientId });
                return res.send(appointment);
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error);
            }
        });
    }
    deleteAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const appointment = yield AppointmentService_1.default.deleteAppointment(id);
                return res.send(appointment);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
}
exports.default = new AppointmentController;

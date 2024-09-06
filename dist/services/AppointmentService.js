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
//import repository
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
class AppointmentService {
    getAllAppointments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AppointmentRepository_1.default.getAllAppointments();
        });
    }
    getAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AppointmentRepository_1.default.getAppointment(id);
        });
    }
    saveAppointment(_a) {
        return __awaiter(this, arguments, void 0, function* ({ date, doctorId, pacientId }) {
            return yield AppointmentRepository_1.default.saveAppointment({ date, doctorId, pacientId });
        });
    }
    updateAppointment(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AppointmentRepository_1.default.updateAppointment(id, body);
        });
    }
    deleteAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AppointmentRepository_1.default.deleteAppointment(id);
        });
    }
}
exports.default = new AppointmentService;

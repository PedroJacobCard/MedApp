"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//import controllers
const AppointmentController_1 = __importDefault(require("./AppointmentController"));
const DoctorController_1 = __importDefault(require("./DoctorController"));
exports.router = (0, express_1.Router)();
//Appointments routes
exports.router.get('/appointments', AppointmentController_1.default.getAllAppointments);
exports.router.get('/appointments/:id', AppointmentController_1.default.getAppointment);
exports.router.post('/appointments', AppointmentController_1.default.saveAppointment);
exports.router.put('/appointments/:id', AppointmentController_1.default.updateAppointment);
exports.router.delete('/appointments/:id', AppointmentController_1.default.deleteAppointment);
//Doctors routes
exports.router.get('/doctors', DoctorController_1.default.getAllDoctors);
exports.router.get('/doctors/:id', DoctorController_1.default.getDoctor);
exports.router.post('/doctors', DoctorController_1.default.saveDoctor);
exports.router.put('/doctors/:id', DoctorController_1.default.updateDoctor);
exports.router.delete('/doctors/:id', DoctorController_1.default.deleteDoctor);

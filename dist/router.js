"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//import controllers
const AppointmentController_1 = __importDefault(require("./controller/AppointmentController"));
const DoctorController_1 = __importDefault(require("./controller/DoctorController"));
const PacientController_1 = __importDefault(require("./controller/PacientController"));
const PrescriptionController_1 = __importStar(require("./controller/PrescriptionController"));
const auth_1 = __importDefault(require("./middleware/auth"));
exports.router = (0, express_1.Router)();
exports.router.post('/doctors', DoctorController_1.default.saveDoctor);
//create Session
exports.router.post('/doctors/login', DoctorController_1.default.getDoctor);
//protect routes
exports.router.use(auth_1.default);
//Appointments routes
exports.router.get('/appointments', AppointmentController_1.default.getAllAppointments);
exports.router.get('/appointments/:id', AppointmentController_1.default.getAppointment);
exports.router.post('/appointments', AppointmentController_1.default.saveAppointment);
exports.router.put('/appointments/:id', AppointmentController_1.default.updateAppointment);
exports.router.delete('/appointments/:id', AppointmentController_1.default.deleteAppointment);
exports.router.put('/reschedule/:id', AppointmentController_1.default.rescheduleAppointment);
//Doctors routes
exports.router.get('/doctors', DoctorController_1.default.getAllDoctors);
exports.router.put('/doctors/:id', DoctorController_1.default.updateDoctor);
exports.router.delete('/doctors/:id', DoctorController_1.default.deleteDoctor);
//Pacients routes
exports.router.get('/pacients', PacientController_1.default.getAllPacients);
exports.router.get('/pacients/:id', PacientController_1.default.getPacient);
exports.router.post('/pacients', PacientController_1.default.savePacient);
exports.router.put('/pacients/:id', PacientController_1.default.updatePacient);
exports.router.delete('/pacients/:id', PacientController_1.default.deletePacient);
//Prescriptions routes
exports.router.get('/read-prescription/:id', PrescriptionController_1.default.readPrescriptionFile);
exports.router.post('/prescriptions/:id', PrescriptionController_1.upload.single('file'), PrescriptionController_1.default.uploadPrescription);
exports.router.get('/prescriptions', PrescriptionController_1.default.getAllPrescriptions);
exports.router.get('/prescriptions/:id', PrescriptionController_1.default.getPrescription);
exports.router.post('/prescriptions', PrescriptionController_1.default.savePrescription);
exports.router.put('/prescriptions/:id', PrescriptionController_1.default.updatePrescription);
exports.router.delete('/prescriptions/:id', PrescriptionController_1.default.deletePrescription);
exports.router.get('/generate-prescription/:id', PrescriptionController_1.default.generatePrescriptionFile);

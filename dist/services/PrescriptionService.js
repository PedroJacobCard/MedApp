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
const Doctor_1 = __importDefault(require("../models/Doctor"));
const PrescriptionRepository_1 = __importDefault(require("../repositories/PrescriptionRepository"));
const AppointmentService_1 = __importDefault(require("./AppointmentService"));
const PacientService_1 = __importDefault(require("./PacientService"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
class prescriptionService {
    getAllPrescriptions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PrescriptionRepository_1.default.getAllPrescriptions();
        });
    }
    getPrescription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PrescriptionRepository_1.default.getPrescription(id);
        });
    }
    savePrescription(_a) {
        return __awaiter(this, arguments, void 0, function* ({ date, appointmentId, medicine, dosage, instructions }) {
            return yield PrescriptionRepository_1.default.savePrescription({ date, appointmentId, medicine, dosage, instructions });
        });
    }
    updatePrescription(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PrescriptionRepository_1.default.updatePrescription(id, body);
        });
    }
    deletePrescription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PrescriptionRepository_1.default.deletePrescription(id);
        });
    }
    generatePrescriptionFile(prescription) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield AppointmentService_1.default.getAppointment(prescription.appointmentId);
            if (appointment) {
                const patient = yield PacientService_1.default.getPacient(appointment === null || appointment === void 0 ? void 0 : appointment.pacientId);
                const doctor = yield Doctor_1.default.findById(appointment.doctorId);
                const id = prescription.id;
                const document = new pdfkit_1.default({ font: 'Courier' });
                const filePath = `./src/prescriptions/${id}.pdf`;
                document.pipe(fs_1.default.createWriteStream(filePath));
                document.fontSize(20).text(`Prescription #${id}`, 100, 100);
                document.fontSize(16).text(`Pacient name: ${patient === null || patient === void 0 ? void 0 : patient.pacientName}`);
                document.fontSize(16).text(`Doctor name: ${doctor === null || doctor === void 0 ? void 0 : doctor.doctorName}`);
                const recipe = `Medicine: ${prescription.medicine}`;
                document.fontSize(12).text(recipe);
                document.fontSize(12).text(`Dosage: ${prescription.dosage}`);
                document.fontSize(12).text(`Instructions: ${prescription.instructions}`);
                document.end();
            }
        });
    }
}
exports.default = new prescriptionService;

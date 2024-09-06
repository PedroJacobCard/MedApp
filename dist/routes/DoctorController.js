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
const DoctorService_1 = __importDefault(require("../services/DoctorService"));
class DoctorController {
    getAllDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctors = yield DoctorService_1.default.getAllDoctors();
                return res.send(doctors);
            }
            catch (error) {
                console.log("Error occurred trying to find records of doctors.");
                return res.status(500).send(error);
            }
        });
    }
    getDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const doctor = yield DoctorService_1.default.getDoctor(id);
                return res.send(doctor);
            }
            catch (error) {
                console.log("Error occurred trying to find records of doctor.");
                return res.status(500).send(error);
            }
        });
    }
    saveDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorName, medicalRegistration, medicalSpeciality, login, password, email, phone } = req.body;
                const doctor = yield DoctorService_1.default.saveDoctor({
                    doctorName,
                    medicalRegistration,
                    medicalSpeciality,
                    login,
                    password,
                    email,
                    phone
                });
                return res.send(doctor);
            }
            catch (error) {
                console.log("Error occurred trying to save records of doctor.");
                return res.status(500).send(error);
            }
        });
    }
    updateDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { doctorName, medicalRegistration, medicalSpeciality, login, password, email, phone } = req.body;
                const doctor = yield DoctorService_1.default.updateDoctor(id, {
                    doctorName,
                    medicalRegistration,
                    medicalSpeciality,
                    login,
                    password,
                    email,
                    phone
                });
                return res.send(doctor);
            }
            catch (error) {
                console.log("Error occurred trying to update records of doctor.");
                return res.status(500).send(error);
            }
        });
    }
    deleteDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const doctor = yield DoctorService_1.default.deleteDoctor(id);
                return res.send(doctor);
            }
            catch (error) {
                console.log("Error occurred trying to delete records of doctor.");
                return res.status(500).send(error);
            }
        });
    }
}
exports.default = new DoctorController;

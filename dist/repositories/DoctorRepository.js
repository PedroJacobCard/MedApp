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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import model
const Doctor_1 = __importDefault(require("../models/Doctor"));
//import utils
const passwordCompare_1 = require("../utils/passwordCompare");
const authSecret_1 = __importDefault(require("../config/authSecret"));
class DoctorRepository {
    getAllDoctors() {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield Doctor_1.default.find({}, 'doctorName medicalRegistration medicalSpeciality email phone');
            return doctor.map(doctor => ({
                doctorName: doctor.doctorName,
                medicalRegistration: doctor.medicalRegistration,
                medicalSpeciality: doctor.medicalSpeciality,
                email: doctor.email,
                phone: doctor.phone
            }));
        });
    }
    getDoctor(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password) {
                throw new Error('Password must be provided');
            }
            try {
                const doctor = yield Doctor_1.default.findOne({ email });
                if (!doctor) {
                    throw new Error('No doctor was found by this email address.');
                }
                if (password && !(yield (0, passwordCompare_1.checkPassword)(password, doctor.password))) {
                    throw new Error('Password is incorrect');
                }
                const { id, doctorName, login, medicalRegistration, medicalSpeciality, email: doctorEmail, phone } = doctor;
                return { doctor: { id, doctorName, login, medicalRegistration, medicalSpeciality, email: doctorEmail, phone }, token: jsonwebtoken_1.default.sign({ id }, authSecret_1.default.secret, { expiresIn: authSecret_1.default.expires }) };
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while getting Doctor: ${error.message}`);
                }
                else {
                    throw new Error("Error while getting Doctor");
                }
            }
        });
    }
    saveDoctor(_a) {
        return __awaiter(this, arguments, void 0, function* ({ doctorName, login, medicalSpeciality, medicalRegistration, email, password, phone }) {
            try {
                const doctor = new Doctor_1.default({ doctorName, login, password, medicalSpeciality, medicalRegistration, email, phone });
                const passwordHash = yield bcryptjs_1.default.hash(password, 8);
                doctor.password = passwordHash;
                return yield doctor.save();
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while saving Doctor: ${error.message}`);
                }
                else {
                    throw new Error("Error while saving Doctor");
                }
            }
        });
    }
    updateDoctor(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor = yield Doctor_1.default.findById(id);
                if (!doctor) {
                    throw new Error('No doctor was found by this ID.');
                }
                if (body.password && !(yield (0, passwordCompare_1.checkPassword)(body.password, doctor.password))) {
                    throw new Error('Password is incorrect');
                }
                const passwordHash = body.newPassword && body.newPassword.length > 0 ? yield bcryptjs_1.default.hash(body.newPassword, 8) : doctor.password;
                const update = yield Doctor_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, body), { password: passwordHash }), { new: true });
                return update;
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while updating Doctor: ${error.message}`);
                }
                else {
                    throw new Error("Error while updating Doctor");
                }
            }
        });
    }
    deleteDoctor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Doctor_1.default.findByIdAndDelete(id);
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while deleting Doctor: ${error.message}`);
                }
                else {
                    throw new Error("Error while deleting Doctor");
                }
            }
        });
    }
}
exports.default = new DoctorRepository;

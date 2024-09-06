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
const DoctorRepository_1 = __importDefault(require("../repositories/DoctorRepository"));
class DoctorService {
    getAllDoctors() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DoctorRepository_1.default.getAllDoctors();
        });
    }
    getDoctor(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DoctorRepository_1.default.getDoctor(email, password);
        });
    }
    saveDoctor(_a) {
        return __awaiter(this, arguments, void 0, function* ({ doctorName, medicalRegistration, login, medicalSpeciality, email, password, phone }) {
            return yield DoctorRepository_1.default.saveDoctor({ doctorName, login, medicalRegistration, medicalSpeciality, email, password, phone });
        });
    }
    updateDoctor(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DoctorRepository_1.default.updateDoctor(id, body);
        });
    }
    deleteDoctor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DoctorRepository_1.default.deleteDoctor(id);
        });
    }
}
exports.default = new DoctorService;

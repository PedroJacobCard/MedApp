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
const PacientRepository_1 = __importDefault(require("../repositories/PacientRepository"));
class pacientService {
    getAllPacients() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PacientRepository_1.default.getAllPacients();
        });
    }
    getPacient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PacientRepository_1.default.getPacient(id);
        });
    }
    savePacient(_a) {
        return __awaiter(this, arguments, void 0, function* ({ pacientName, birthDate, email, phone }) {
            return yield PacientRepository_1.default.savePacient({ pacientName, birthDate, email, phone });
        });
    }
    updatePacient(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PacientRepository_1.default.updatePacient(id, body);
        });
    }
    deletePacient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PacientRepository_1.default.deletePacient(id);
        });
    }
}
exports.default = new pacientService;

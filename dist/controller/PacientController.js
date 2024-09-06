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
const PacientService_1 = __importDefault(require("../services/PacientService"));
class PacientController {
    getAllPacients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pacients = yield PacientService_1.default.getAllPacients();
                return res.status(200).json(pacients);
            }
            catch (error) {
                console.log("Error occurred trying to find records of pacients.");
                return res.status(500).json(error);
            }
        });
    }
    getPacient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const pacient = yield PacientService_1.default.getPacient(id);
                return res.status(200).json(pacient);
            }
            catch (error) {
                console.log("Error occurred trying to find records of pacient.");
                return res.status(500).json(error);
            }
        });
    }
    savePacient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pacientName, birthDate, email, phone } = req.body;
                const pacient = yield PacientService_1.default.savePacient({ pacientName, birthDate, email, phone });
                return res.status(200).json(pacient);
            }
            catch (error) {
                console.log("Error occurred trying to save records of pacient.");
                return res.status(500).json(error);
            }
        });
    }
    updatePacient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const pacient = yield PacientService_1.default.updatePacient(id, body);
                return res.status(200).json(pacient);
            }
            catch (error) {
                console.log("Error occurred trying to update records of pacient.");
                return res.status(500).json(error);
            }
        });
    }
    deletePacient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const pacient = yield PacientService_1.default.deletePacient(id);
                return res.status(200).json(pacient);
            }
            catch (error) {
                console.log("Error occurred trying to delete records of pacient.");
                return res.status(500).json(error);
            }
        });
    }
}
exports.default = new PacientController;

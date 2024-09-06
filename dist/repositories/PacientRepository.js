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
//import model
const Pacient_1 = __importDefault(require("../models/Pacient"));
class PacientRepository {
    getAllPacients() {
        return __awaiter(this, void 0, void 0, function* () {
            const pacients = yield Pacient_1.default.find();
            return pacients;
        });
    }
    getPacient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Pacient_1.default.findById(id);
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while getting Pacient: ${error.message}`);
                }
                else {
                    throw new Error("Error while getting Pacient");
                }
            }
        });
    }
    savePacient(_a) {
        return __awaiter(this, arguments, void 0, function* ({ pacientName, birthDate, email, phone, }) {
            try {
                const pacient = new Pacient_1.default({ pacientName, birthDate, email, phone });
                return pacient.save();
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while saving Pacient: ${error.message}`);
                }
                else {
                    throw new Error("Error while saving Pacient");
                }
            }
        });
    }
    updatePacient(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pacient = yield Pacient_1.default.findByIdAndUpdate(id, Object.assign({}, body), { new: true });
                return pacient;
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while updating Pacient: ${error.message}`);
                }
                else {
                    throw new Error("Error while updating Pacient");
                }
            }
        });
    }
    deletePacient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Pacient_1.default.findByIdAndDelete(id);
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while deleting Pacient: ${error.message}`);
                }
                else {
                    throw new Error("Error while deleting Pacient");
                }
            }
        });
    }
}
exports.default = new PacientRepository;

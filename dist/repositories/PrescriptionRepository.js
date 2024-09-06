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
const Prescription_1 = __importDefault(require("../models/Prescription"));
class PrescriptionRepository {
    getAllPrescriptions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Prescription_1.default.find();
        });
    }
    getPrescription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Prescription_1.default.findById(id);
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while getting Prescription: ${error.message}`);
                }
                else {
                    throw new Error('Database error occurred while getting Prescription');
                }
            }
        });
    }
    savePrescription(_a) {
        return __awaiter(this, arguments, void 0, function* ({ date, appointmentId, medicine, dosage, instructions }) {
            try {
                const prescription = new Prescription_1.default({ date, appointmentId, medicine, dosage, instructions });
                return prescription.save();
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while saving Prescription: ${error.message}`);
                }
                else {
                    throw new Error('Database error occurred while saving Prescription');
                }
            }
        });
    }
    updatePrescription(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prescription = yield Prescription_1.default.findByIdAndUpdate(id, Object.assign({}, body), { new: true });
                return prescription;
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while updating Prescription: ${error.message}`);
                }
                else {
                    throw new Error('Database error occurred while updating Prescription');
                }
            }
        });
    }
    deletePrescription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prescription = yield Prescription_1.default.findByIdAndDelete(id);
                return prescription;
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`Database error occurred while deleting Prescription: ${error.message}`);
                }
                else {
                    throw new Error('Database error occurred while deleting Prescription');
                }
            }
        });
    }
}
exports.default = new PrescriptionRepository;

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
exports.upload = void 0;
const process_1 = __importDefault(require("process"));
const path_1 = __importDefault(require("path"));
//import service
const PrescriptionService_1 = __importDefault(require("../services/PrescriptionService"));
const multer_1 = __importDefault(require("multer"));
//upload of prescriptions files
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log("Destinaion path: ", './src/prescriptions/');
        cb(null, './src/prescriptions/');
    },
    filename: (req, file, cb) => {
        console.log("File: ", file);
        // Füge eine Überprüfung hinzu, um sicherzustellen, dass `originalname` nicht `undefined` ist
        if (!file.originalname) {
            return cb(new Error('File originalname is undefined'), '');
        }
        cb(null, file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage });
class PrescriptionController {
    readPrescriptionFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const prescripion = yield PrescriptionService_1.default.getPrescription(id);
                let filePath = path_1.default.resolve(process_1.default.cwd() + (prescripion === null || prescripion === void 0 ? void 0 : prescripion.file));
                return res.status(200).json({ prescripion, filePath });
            }
            catch (error) {
                console.error('Error occurred trying to upload files of prescription.');
                return res.status(500).json(error);
            }
        });
    }
    uploadPrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id } = req.params;
                let presciption = yield PrescriptionService_1.default.getPrescription(id);
                if (!presciption) {
                    return res.status(404).json({ message: "Prescription not found" });
                }
                const file = `./src/prescriptions/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`;
                presciption.file = file;
                yield PrescriptionService_1.default.updatePrescription(id, Object.assign({}, presciption));
                return res.status(200).json(presciption);
            }
            catch (error) {
                console.error('Error occurred trying to upload files of prescription.');
                return res.status(500).json(error);
            }
        });
    }
    getAllPrescriptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const presciptions = yield PrescriptionService_1.default.getAllPrescriptions();
                return res.status(200).json(presciptions);
            }
            catch (error) {
                console.error('Error occurred trying to find records of prescriptions.');
                return res.status(500).json(error);
            }
        });
    }
    getPrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const presciption = yield PrescriptionService_1.default.getPrescription(id);
                return res.status(200).json(presciption);
            }
            catch (error) {
                console.error('Error occurred trying to find records of prescription.');
                return res.status(500).json(error);
            }
        });
    }
    savePrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, appointmentId, medicine, dosage, instructions } = req.body;
                const presciption = yield PrescriptionService_1.default.savePrescription({ date, appointmentId, medicine, dosage, instructions });
                return res.status(201).json(presciption);
            }
            catch (error) {
                console.error('Error occurred trying to save records of prescription.');
                return res.status(500).json(error);
            }
        });
    }
    updatePrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const presciption = yield PrescriptionService_1.default.updatePrescription(id, body);
                return res.status(200).json(presciption);
            }
            catch (error) {
                console.error('Error occurred trying to update records of prescription.');
                return res.status(500).json(error);
            }
        });
    }
    deletePrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const presciption = yield PrescriptionService_1.default.deletePrescription(id);
                return res.status(200).json(presciption);
            }
            catch (error) {
                console.error('Error occurred trying to delete records of prescription.');
                return res.status(500).json(error);
            }
        });
    }
    generatePrescriptionFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const presciption = yield PrescriptionService_1.default.getPrescription(id);
                if (!presciption) {
                    return res.status(404).json({ message: 'Prescription not found' });
                }
                return res.status(200).json(yield PrescriptionService_1.default.generatePrescriptionFile(presciption));
            }
            catch (error) {
                console.error('Error occurred trying to generate files of prescription.');
                return res.status(500).json(error);
            }
        });
    }
}
exports.default = new PrescriptionController;

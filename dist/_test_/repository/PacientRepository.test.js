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
const Pacient_1 = __importDefault(require("../../models/Pacient"));
const PacientRepository_1 = __importDefault(require("../../repositories/PacientRepository"));
const setup_1 = __importDefault(require("../database/setup"));
const pacient = {
    name: "Maria",
    birthDate: "1990-01-01T10:00:00.000Z",
    email: "maria@gmail.com",
    phone: "+437651234567"
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setup_1.default.setup();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setup_1.default.dropCollections();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setup_1.default.dropDataBase();
}));
describe('This is the test for Pacient', () => {
    it('should create a Pacient successfully when correct values are inserted', () => __awaiter(void 0, void 0, void 0, function* () {
        const pacientTest = new Pacient_1.default({ pacientName: pacient.name, birthDate: pacient.birthDate, email: pacient.email, phone: pacient.phone });
        const expectedPacient = yield PacientRepository_1.default.savePacient(pacientTest);
        expect(expectedPacient === null || expectedPacient === void 0 ? void 0 : expectedPacient.pacientName).toBe(pacient.name);
        expect(expectedPacient === null || expectedPacient === void 0 ? void 0 : expectedPacient.birthDate.toISOString()).toBe('1990-01-01T10:00:00.000Z');
        expect(expectedPacient === null || expectedPacient === void 0 ? void 0 : expectedPacient.email).toBe(pacient.email);
        expect(expectedPacient === null || expectedPacient === void 0 ? void 0 : expectedPacient.phone).toBe(pacient.phone);
    }));
    it('Should receive error when missing name', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = null;
        const pacientTest = new Pacient_1.default({ pacientName: name, birthDate: pacient.birthDate, email: pacient.email, phone: pacient.phone });
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield PacientRepository_1.default.savePacient(pacientTest);
        })).rejects.toThrow(new Error("Pacient validation failed: pacientName: Pacient name is required."));
    }));
    it('Should receive error when missing birth date', () => __awaiter(void 0, void 0, void 0, function* () {
        const birthDate = null;
        const pacientTest = new Pacient_1.default({ pacientName: pacient.name, birthDate: birthDate, email: pacient.email, phone: pacient.phone });
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield PacientRepository_1.default.savePacient(pacientTest);
        })).rejects.toThrow(new Error("Pacient validation failed: birthDate: Pacient birthday is required."));
    }));
    it('Should receive error when missing email', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = null;
        const pacientTest = new Pacient_1.default({ pacientName: pacient.name, birthDate: pacient.birthDate, email: email, phone: pacient.phone });
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield PacientRepository_1.default.savePacient(pacientTest);
        })).rejects.toThrow(new Error("Pacient validation failed: email: Pacient email is required."));
    }));
    it('Should receive error when missing phone', () => __awaiter(void 0, void 0, void 0, function* () {
        const phone = null;
        const pacientTest = new Pacient_1.default({ pacientName: pacient.name, birthDate: pacient.birthDate, email: pacient.email, phone: phone });
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield PacientRepository_1.default.savePacient(pacientTest);
        })).rejects.toThrow(new Error("Pacient validation failed: phone: Pacient phone is required."));
    }));
    it('Should receive error when phone format do not match', () => __awaiter(void 0, void 0, void 0, function* () {
        const phone = '1234567890';
        const pacientTest = new Pacient_1.default({ pacientName: pacient.name, birthDate: pacient.birthDate, email: pacient.email, phone: phone });
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield PacientRepository_1.default.savePacient(pacientTest);
        })).rejects.toThrow(new Error("Pacient validation failed: phone: 1234567890 This is not a valid number. Please use the following format +43 999 9999999"));
    }));
});

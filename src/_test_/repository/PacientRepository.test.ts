import Pacient from "../../models/Pacient";
import PacientRepository from "../../repositories/PacientRepository";
import Db from '../database/setup';

type Pacient = {
  name: string,
  birthDate: string,
  email: string,
  phone: string 
}

const pacient: Pacient = {
  name: "Maria",
  birthDate: "1990-01-01T10:00:00.000Z",
  email: "maria@gmail.com",
  phone: "+437651234567"
};

beforeAll(async () => {
  await Db.setup();
});

afterEach(async () => {
  await Db.dropCollections();
});

afterAll(async () => {
  await Db.dropDataBase();
});

describe('This is the test for Pacient', () => {
  it('should create a Pacient successfully when correct values are inserted', async () => {
    const pacientTest = new Pacient({ pacientName: pacient.name, birthDate: pacient.birthDate, email: pacient.email, phone: pacient.phone });

    const expectedPacient = await PacientRepository.savePacient(pacientTest);

    expect(expectedPacient?.pacientName).toBe(pacient.name);
    expect(expectedPacient?.birthDate.toISOString()).toBe('1990-01-01T10:00:00.000Z');
    expect(expectedPacient?.email).toBe(pacient.email);
    expect(expectedPacient?.phone).toBe(pacient.phone);
  });

  it('Should receive error when missing name', async () => {
    const name = null;
    const pacientTest = new Pacient({pacientName: name, birthDate: pacient.birthDate, email: pacient.email, phone: pacient.phone});

    expect(async () => {
      await PacientRepository.savePacient(pacientTest);
    }).rejects.toThrow(new Error("Pacient validation failed: pacientName: Pacient name is required."))
  });

  it('Should receive error when missing birth date', async () => {
    const birthDate = null;
    const pacientTest = new Pacient({pacientName: pacient.name, birthDate: birthDate, email: pacient.email, phone: pacient.phone});

    expect(async () => {
      await PacientRepository.savePacient(pacientTest);
    }).rejects.toThrow(new Error("Pacient validation failed: birthDate: Pacient birthday is required."))
  });

  it('Should receive error when missing email', async () => {
    const email = null;
    const pacientTest = new Pacient({pacientName: pacient.name, birthDate: pacient.birthDate, email: email, phone: pacient.phone});

    expect(async () => {
      await PacientRepository.savePacient(pacientTest);
    }).rejects.toThrow(new Error("Pacient validation failed: email: Pacient email is required."))
  });

  it('Should receive error when missing phone', async () => {
    const phone = null;
    const pacientTest = new Pacient({pacientName: pacient.name, birthDate: pacient.birthDate, email: pacient.email, phone: phone});

    expect(async () => {
      await PacientRepository.savePacient(pacientTest);
    }).rejects.toThrow(new Error("Pacient validation failed: phone: Pacient phone is required."))
  });

  it('Should receive error when phone format do not match', async () => {
    const phone = '1234567890';
    const pacientTest = new Pacient({pacientName: pacient.name, birthDate: pacient.birthDate, email: pacient.email, phone: phone});

    expect(async () => {
      await PacientRepository.savePacient(pacientTest);
    }).rejects.toThrow(new Error("Pacient validation failed: phone: 1234567890 This is not a valid number. Please use the following format +43 999 9999999"))
  });
})


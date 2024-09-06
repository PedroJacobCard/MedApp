import PacientRepository from "../repositories/PacientRepository";
import PacientType from "../types/PacientTypes";

class pacientService {
  async getAllPacients() {
    return await PacientRepository.getAllPacients();
  }

  async getPacient(id: string) {
    return await PacientRepository.getPacient(id);
  }

  async savePacient({ pacientName, birthDate, email, phone }: PacientType) {
    return await PacientRepository.savePacient({ pacientName, birthDate, email, phone });
  }

  async updatePacient(id: string, body: PacientType) {
    return await PacientRepository.updatePacient(id, body);
  }

  async deletePacient(id: string) {
    return await PacientRepository.deletePacient(id);
  }
}

export default new pacientService;
//import repository
import DoctorRepository from "../repositories/DoctorRepository";
import DoctorTypes from "../types/DoctorTypes";

class DoctorService {
  async getAllDoctors() {
    return await DoctorRepository.getAllDoctors();
  }

  async getDoctor(email: string, password: string) {
    return await DoctorRepository.getDoctor(email, password);
  }

  async saveDoctor({ doctorName, medicalRegistration, login, medicalSpeciality, email, password, phone }: DoctorTypes) {
    return await DoctorRepository.saveDoctor({ doctorName, login, medicalRegistration, medicalSpeciality, email, password, phone });
  }

  async updateDoctor(id: string, body: DoctorTypes) {
    return await DoctorRepository.updateDoctor(id, body);
  }

  async deleteDoctor(id: string) {
    return await DoctorRepository.deleteDoctor(id);
  }
}

export default new DoctorService;
//import repository
import AppointmentRepository from "../repositories/AppointmentRepository";

//import types
import { AppointmentTypes } from "../types/AppointmentTypes";


class AppointmentService {
  async getAllAppointments() {
    return await AppointmentRepository.getAllAppointments();
  }

  async getAppointment(id: string) {
    return await AppointmentRepository.getAppointment(id);
  }

  async saveAppointment({ date, doctorId, pacientId }: AppointmentTypes) {
    return await AppointmentRepository.saveAppointment({ date, doctorId, pacientId });
  }

  async updateAppointment(id: string, body: AppointmentTypes) {
    return await AppointmentRepository.updateAppointment(id, body);
  }

  async deleteAppointment(id: string) {
    return await AppointmentRepository.deleteAppointment(id);
  }
}

export default new AppointmentService;
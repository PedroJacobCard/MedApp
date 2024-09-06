import Doctor from "../models/Doctor";
import PrescriptionRepository from "../repositories/PrescriptionRepository";
import PrescriptionTypes from "../types/PrescriptionTypes";
import AppointmentService from "./AppointmentService";
import PacientService from "./PacientService";

import PDFDocument from "pdfkit";
import fs from 'fs';

class prescriptionService {
  async getAllPrescriptions() {
    return await PrescriptionRepository.getAllPrescriptions();
  }

  async getPrescription(id: string) {
    return await PrescriptionRepository.getPrescription(id);
  }

  async savePrescription({ date, appointmentId, medicine, dosage, instructions }: PrescriptionTypes) {
    return await PrescriptionRepository.savePrescription({ date, appointmentId, medicine, dosage, instructions });
  }
  
  async updatePrescription(id: string, body: PrescriptionTypes) {
    return await PrescriptionRepository.updatePrescription(id, body);
  }
  
  async deletePrescription(id: string) {
    return await PrescriptionRepository.deletePrescription(id);
  }

  async generatePrescriptionFile(prescription: PrescriptionTypes) {
    const appointment = await AppointmentService.getAppointment(prescription.appointmentId);

    if (appointment) {
      const patient = await PacientService.getPacient(appointment?.pacientId);
      const doctor = await Doctor.findById(appointment.doctorId);

      const id = prescription.id;
      const document = new PDFDocument({ font: 'Courier'});
      const filePath = `./src/prescriptions/${id}.pdf`;
      
      document.pipe(fs.createWriteStream(filePath));
      document.fontSize(20).text(`Prescription #${id}`, 100, 100);
      document.fontSize(16).text(`Pacient name: ${patient?.pacientName}`);
      document.fontSize(16).text(`Doctor name: ${doctor?.doctorName}`);

      const recipe = `Medicine: ${prescription.medicine}`;
      document.fontSize(12).text(recipe);
      document.fontSize(12).text(`Dosage: ${prescription.dosage}`);
      document.fontSize(12).text(`Instructions: ${prescription.instructions}`);
      document.end();
    }
  }
}

export default new prescriptionService;
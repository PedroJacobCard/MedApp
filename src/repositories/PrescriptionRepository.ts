import { MongooseError } from "mongoose";
import Prescription from "../models/Prescription";
import PrescriptionTypes from "../types/PrescriptionTypes";

class PrescriptionRepository {
  async getAllPrescriptions(): Promise<PrescriptionTypes[]> {
    return await Prescription.find()
  }

  async getPrescription(id: string): Promise<PrescriptionTypes | null> {
    try {
      return await Prescription.findById(id);
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while getting Prescription: ${error.message}`)
      } else {
        throw new Error('Database error occurred while getting Prescription')
      }
    }
  }

  async savePrescription({ date, appointmentId, medicine, dosage, instructions }: PrescriptionTypes): Promise<PrescriptionTypes | null> {
    try {
      const prescription = new Prescription({ date, appointmentId, medicine, dosage, instructions })
      return prescription.save();
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while saving Prescription: ${error.message}`)
      } else {
        throw new Error('Database error occurred while saving Prescription')
      }
    }
  }

  async updatePrescription(id: string, body: PrescriptionTypes): Promise<PrescriptionTypes | null> {
    try {
      const prescription = await Prescription.findByIdAndUpdate(id, { ...body }, { new: true })
      return prescription;
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while updating Prescription: ${error.message}`)
      } else {
        throw new Error('Database error occurred while updating Prescription')
      }
    }
  }

  async deletePrescription(id: string): Promise<PrescriptionTypes | null> {
    try {
      const prescription = await Prescription.findByIdAndDelete(id)
      return prescription;
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while deleting Prescription: ${error.message}`)
      } else {
        throw new Error('Database error occurred while deleting Prescription')
      }
    }
  }
}

export default new PrescriptionRepository;
import { Error, MongooseError } from "mongoose";

//import models
import Appointment from "../models/Appointment";

//import types
import { AppointmentTypes } from "../types/AppointmentTypes";

class AppointmentRepository {
  async getAllAppointments(): Promise<AppointmentTypes[]> {
    return await Appointment.find();
  }

  async getAppointment(id: string): Promise<AppointmentTypes | null> {
    try {
      return Appointment.findById(id);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async saveAppointment({date, doctorId, pacientId}: AppointmentTypes): Promise<AppointmentTypes | null> {
    try {
      const appointment = new Appointment({ date, doctorId, pacientId });
      return await appointment.save();
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while saving appointment: ${error.message}`);
      } else {
        throw new Error("Error while saving appointment");
      }
    }
  }

  async updateAppointment(id: string, body: AppointmentTypes): Promise<AppointmentTypes | null> {
    try {
      const update = await Appointment.findByIdAndUpdate(id, { ...body }, { new: true });
      return update;
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while updating appointment: ${error.message}`);
      } else {
        throw new Error("Error while updating appointment");
      }
    }
  }

  async deleteAppointment(id: string): Promise<AppointmentTypes | null> {
    try {
      return await Appointment.findByIdAndDelete(id);
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while deleting appointment: ${error.message}`);
      } else {
        throw new Error("Error while deleting appointment");
      }
    }
  }
}

export default new AppointmentRepository;
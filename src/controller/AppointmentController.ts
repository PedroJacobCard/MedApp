import { Request, Response } from "express";
import AppointmentService from "../services/AppointmentService";
import { AppointmentTypes } from "../types/AppointmentTypes";
import Appointment from "../models/Appointment";

class AppointmentController {
  async getAllAppointments(req: Request, res: Response) {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      return res.json(appointments);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointment = await AppointmentService.getAppointment(id);
      return res.json(appointment);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async saveAppointment(req: Request, res: Response) {
    try {
      const { date, doctorId, pacientId }: AppointmentTypes = req.body;
      const appointment = await AppointmentService.saveAppointment({ date, doctorId, pacientId });
      return res.json(appointment);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async updateAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body: AppointmentTypes = req.body;
      const appointment = await AppointmentService.updateAppointment(id, body);
      return res.json(appointment);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async deleteAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const appointment = await AppointmentService.deleteAppointment(id);
      return res.json(appointment);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async rescheduleAppointment(req: Request, res: Response) {
    const { id } = req.params;
    const body: AppointmentTypes = req.body;
    try {
      const appointment = await AppointmentService.getAppointment(id);

      if (!appointment) return res.status(404).json("Appointment not found");

      appointment.date = body.date;

      const newAppointment = await AppointmentService.updateAppointment(id, body);
      return res.json(newAppointment);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default new AppointmentController;
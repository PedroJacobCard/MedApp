import { Request, Response } from "express";
import DoctorService from "../services/DoctorService";

class DoctorController {
  async getAllDoctors(req: Request ,res: Response) {
    try {
      const doctors = await DoctorService.getAllDoctors();
      return res.json(doctors);
    } catch (error) {
      console.log("Error occurred trying to find records of doctors.")
      return res.status(500).json(error);
    }
  }

  async getDoctor(req: Request ,res: Response) {
    try {
      const { email, password } = req.body;
      const doctor = await DoctorService.getDoctor(email, password);
      return res.json(doctor);
    } catch (error) {
      console.log("Error occurred trying to find records of doctor.")
      return res.status(500).json(error);
    }
  }

  async saveDoctor(req: Request, res: Response) {
    try {
      const { 
        doctorName, 
        login, 
        medicalRegistration, 
        medicalSpeciality, 
        email, 
        password, 
        phone 
      } = req.body;
      const doctor = await DoctorService.saveDoctor({ 
        doctorName,
        login,
        medicalRegistration,
        medicalSpeciality,
        email,
        password,
        phone
      });
      return res.json(doctor);
    } catch (error) {
      console.log("Error occurred trying to save records of doctor.")
      return res.status(500).json(error);
    }
  }

  async updateDoctor(req: Request ,res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      const doctor = await DoctorService.updateDoctor(id, body);
      return res.json(doctor);
    } catch (error) {
      console.log("Error occurred trying to update records of doctor.")
      return res.status(500).json(error);
    }
  }

  async deleteDoctor(req: Request ,res: Response) {
    try {
      const { id } = req.params;
      const doctor = await DoctorService.deleteDoctor(id);
      return res.json(doctor);
    } catch (error) {
      console.log("Error occurred trying to delete records of doctor.")
      return res.status(500).json(error);
    }
  }
}

export default new DoctorController;
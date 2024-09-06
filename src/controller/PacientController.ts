import { Request, Response } from "express";
import PacientService from "../services/PacientService";

class PacientController {
  async getAllPacients(req: Request, res: Response) {
    try {
      const pacients = await PacientService.getAllPacients();
      return res.status(200).json(pacients);
    } catch (error) {
      console.log("Error occurred trying to find records of pacients.")
      return res.status(500).json(error);
    }
  }

  async getPacient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pacient = await PacientService.getPacient(id);
      return res.status(200).json(pacient);
    } catch (error) {
      console.log("Error occurred trying to find records of pacient.")
      return res.status(500).json(error);
    }
  }

  async savePacient(req: Request, res: Response) {
    try {
      const { pacientName, birthDate, email, phone } = req.body;
      const pacient = await PacientService.savePacient({ pacientName, birthDate, email, phone });
      return res.status(200).json(pacient);
    } catch (error) {
      console.log("Error occurred trying to save records of pacient.")
      return res.status(500).json(error);
    }
  }

  async updatePacient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      const pacient = await PacientService.updatePacient(id, body);
      return res.status(200).json(pacient);
    } catch (error) {
      console.log("Error occurred trying to update records of pacient.")
      return res.status(500).json(error);
    }
  }

  async deletePacient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pacient = await PacientService.deletePacient(id);
      return res.status(200).json(pacient);
    } catch (error) {
      console.log("Error occurred trying to delete records of pacient.")
      return res.status(500).json(error);
    }
  }
}

export default new PacientController;
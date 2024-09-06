import { Request, Response } from "express";

import process from 'process';
import path from 'path';

//import service
import PrescriptionService from "../services/PrescriptionService";

import multer from "multer";

//upload of prescriptions files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Destinaion path: ", './src/prescriptions/')
    cb(null, './src/prescriptions/');
  },
  filename: (req, file, cb) => {
    console.log("File: ", file)
    // Füge eine Überprüfung hinzu, um sicherzustellen, dass `originalname` nicht `undefined` ist
    if (!file.originalname) {
      return cb(new Error('File originalname is undefined'), '');
    }
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage });

class PrescriptionController {
  async readPrescriptionFile(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const prescripion = await PrescriptionService.getPrescription(id);
      let filePath = path.resolve(process.cwd() + prescripion?.file);
      return res.status(200).json({ prescripion, filePath });
    } catch (error) {
      console.error('Error occurred trying to upload files of prescription.');
      return res.status(500).json(error);
    }
  }

  async uploadPrescription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let presciption = await PrescriptionService.getPrescription(id);

      if (!presciption) {
        return res.status(404).json({ message: "Prescription not found" });
      }

      const file = `./src/prescriptions/${req.file?.originalname}`;
      presciption.file = file;
      await PrescriptionService.updatePrescription(id, { ...presciption });

      return res.status(200).json(presciption);
    } catch (error) {
      console.error('Error occurred trying to upload files of prescription.');
      return res.status(500).json(error);
    }
  }

  async getAllPrescriptions(req: Request, res: Response) {
    try {
      const presciptions = await PrescriptionService.getAllPrescriptions();
      return res.status(200).json(presciptions);
    } catch (error) {
      console.error('Error occurred trying to find records of prescriptions.');
      return res.status(500).json(error);
    }
  }

  async getPrescription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const presciption = await PrescriptionService.getPrescription(id);
      return res.status(200).json(presciption);
    } catch (error) {
      console.error('Error occurred trying to find records of prescription.');
      return res.status(500).json(error);
    }
  }
  
  async savePrescription(req: Request, res: Response) {
    try {
      const { date, appointmentId, medicine, dosage, instructions } = req.body;
      const presciption = await PrescriptionService.savePrescription({ date, appointmentId, medicine, dosage, instructions });
      return res.status(201).json(presciption);
    } catch (error) {
      console.error('Error occurred trying to save records of prescription.');
      return res.status(500).json(error);
    }
  }

  async updatePrescription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      const presciption = await PrescriptionService.updatePrescription(id, body);
      return res.status(200).json(presciption);
    } catch (error) {
      console.error('Error occurred trying to update records of prescription.');
      return res.status(500).json(error);
    }
  }

  async deletePrescription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const presciption = await PrescriptionService.deletePrescription(id);
      return res.status(200).json(presciption);
    } catch (error) {
      console.error('Error occurred trying to delete records of prescription.');
      return res.status(500).json(error);
    }
  }

  async generatePrescriptionFile(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const presciption = await PrescriptionService.getPrescription(id);

      if (!presciption) {
        return res.status(404).json({ message: 'Prescription not found' });
      }

      return res.status(200).json(await PrescriptionService.generatePrescriptionFile(presciption));
    } catch (error) {
      console.error('Error occurred trying to generate files of prescription.');
      return res.status(500).json(error);
    }
  }
}

export default new PrescriptionController;
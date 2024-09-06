import { MongooseError } from "mongoose";

//import model
import Pacient from "../models/Pacient";

//import types
import PacientTypes from "../types/PacientTypes";

class PacientRepository {
  async getAllPacients(): Promise<PacientTypes[]> {
    const pacients = await Pacient.find();
    return pacients;
  }

  async getPacient(id: string): Promise<PacientTypes | null> {
    try {
      return await Pacient.findById(id);
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while getting Pacient: ${error.message}`);
      } else {
        throw new Error("Error while getting Pacient");
      }
    }
  }

  async savePacient({ 
    pacientName, 
    birthDate,
    email,
    phone,
  }: PacientTypes): Promise<PacientTypes | null> {
    try {
      const pacient = new Pacient({ pacientName, birthDate, email, phone });
      return pacient.save();
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while saving Pacient: ${error.message}`);
      } else {
        throw new Error("Error while saving Pacient");
      }
    }
  }

  async updatePacient(id: string, body: PacientTypes): Promise<PacientTypes | null> {
    try {
      const pacient = await Pacient.findByIdAndUpdate(
        id, 
        { 
          ...body 
        }, 
        { new: true }
      );
      return pacient;
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while updating Pacient: ${error.message}`);
      } else {
        throw new Error("Error while updating Pacient");
      }
    }
  }

  async deletePacient(id: string): Promise<PacientTypes | null> {
    try {
      return await Pacient.findByIdAndDelete(id);
    } catch (error) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while deleting Pacient: ${error.message}`);
      } else {
        throw new Error("Error while deleting Pacient");
      }
    }
  }
}

export default new PacientRepository;
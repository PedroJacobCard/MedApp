import { MongooseError } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt, { Jwt } from "jsonwebtoken";

//import model
import Doctor from "../models/Doctor";

//import types
import DoctorTypes from "../types/DoctorTypes";

//import utils
import { checkPassword } from "../utils/passwordCompare";
import authSecret from "../config/authSecret";

class DoctorRepository {
  async getAllDoctors(): Promise<{
    doctorName: string, 
    medicalRegistration: string,
    medicalSpeciality: string,
    email: string,
    phone: string
  }[]> {
    const doctor = await Doctor.find({}, 'doctorName medicalRegistration medicalSpeciality email phone');
    return doctor.map(doctor => ({
      doctorName: doctor.doctorName,
      medicalRegistration: doctor.medicalRegistration,
      medicalSpeciality: doctor.medicalSpeciality,
      email: doctor.email,
      phone: doctor.phone
    }));
  }

  async getDoctor(email: string, password: string): Promise<{ doctor: Omit<DoctorTypes, "password">, token: {}} | null> {
    if (!password) {
        throw new Error('Password must be provided');
    }
    
    try {
      const doctor = await Doctor.findOne({ email });

      if (!doctor) {
        throw new Error('No doctor was found by this email address.')
      }

      if (password && !(await checkPassword(password, doctor.password))) {
        throw new Error('Password is incorrect')
      }



      const { id, doctorName, login, medicalRegistration, medicalSpeciality, email: doctorEmail, phone } = doctor;
      return { doctor: {id, doctorName, login, medicalRegistration, medicalSpeciality, email: doctorEmail, phone}, token: jwt.sign({ id }, authSecret.secret as string, {expiresIn: authSecret.expires}) };
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while getting Doctor: ${error.message}`);
      } else {
        throw new Error("Error while getting Doctor");
      }
    }
  }

  async saveDoctor({ doctorName, login, medicalSpeciality, medicalRegistration, email, password, phone }: DoctorTypes): Promise<DoctorTypes | null> {
    try {
      const doctor = new Doctor({ doctorName, login, password, medicalSpeciality, medicalRegistration, email, phone });
      const passwordHash = await bcrypt.hash(password, 8);
      doctor.password = passwordHash;
      return await doctor.save();
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while saving Doctor: ${error.message}`);
      } else {
        throw new Error("Error while saving Doctor");
      }
    }
  }

  async updateDoctor(id: string, body: DoctorTypes): Promise<DoctorTypes | null> {
    try {
      const doctor = await Doctor.findById(id);

      if (!doctor) {
        throw new Error('No doctor was found by this ID.')
      }

      if (body.password && !(await checkPassword(body.password, doctor.password))) {
        throw new Error('Password is incorrect')
      }

      const passwordHash = body.newPassword && body.newPassword.length > 0 ? await bcrypt.hash(body.newPassword, 8) : doctor.password;
      const update = await Doctor.findByIdAndUpdate(id, { ...body, password: passwordHash }, { new: true });
      return update;
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while updating Doctor: ${error.message}`);
      } else {
        throw new Error("Error while updating Doctor");
      }
    }
  }

  async deleteDoctor(id: string): Promise<DoctorTypes | null> {
    try {
      return await Doctor.findByIdAndDelete(id);
    } catch (error: unknown) {
      if (error instanceof MongooseError) {
        throw new Error(`Database error occurred while deleting Doctor: ${error.message}`);
      } else {
        throw new Error("Error while deleting Doctor");
      }
    }
  }
}

export default new DoctorRepository;
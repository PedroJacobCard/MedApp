import { Router } from "express";

//import controllers
import AppointmentController from './controller/AppointmentController';
import DoctorController from './controller/DoctorController';
import PacientController from './controller/PacientController';
import PrescriptionController, { upload } from './controller/PrescriptionController';
import authMiddleware from "./middleware/auth";

export const router: Router = Router();

router.post('/doctors', DoctorController.saveDoctor);

//create Session
router.post('/doctors/login', DoctorController.getDoctor);

//protect routes
router.use(authMiddleware);

//Appointments routes
router.get('/appointments', AppointmentController.getAllAppointments);
router.get('/appointments/:id', AppointmentController.getAppointment);
router.post('/appointments', AppointmentController.saveAppointment);
router.put('/appointments/:id', AppointmentController.updateAppointment);
router.delete('/appointments/:id', AppointmentController.deleteAppointment);
router.put('/reschedule/:id', AppointmentController.rescheduleAppointment);

//Doctors routes
router.get('/doctors', DoctorController.getAllDoctors);
router.put('/doctors/:id', DoctorController.updateDoctor);
router.delete('/doctors/:id', DoctorController.deleteDoctor);

//Pacients routes
router.get('/pacients', PacientController.getAllPacients);
router.get('/pacients/:id', PacientController.getPacient);
router.post('/pacients', PacientController.savePacient);
router.put('/pacients/:id', PacientController.updatePacient);
router.delete('/pacients/:id', PacientController.deletePacient);

//Prescriptions routes
router.get('/read-prescription/:id', PrescriptionController.readPrescriptionFile);
router.post('/prescriptions/:id', upload.single('file'), PrescriptionController.uploadPrescription);
router.get('/prescriptions', PrescriptionController.getAllPrescriptions);
router.get('/prescriptions/:id', PrescriptionController.getPrescription);
router.post('/prescriptions', PrescriptionController.savePrescription);
router.put('/prescriptions/:id', PrescriptionController.updatePrescription);
router.delete('/prescriptions/:id', PrescriptionController.deletePrescription);
router.get('/generate-prescription/:id', PrescriptionController.generatePrescriptionFile);
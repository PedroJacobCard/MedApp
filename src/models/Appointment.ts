import mongoose from "mongoose";
import Doctor from "./Doctor";
import Pacient from "./Pacient";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  doctorId: {
    type: String,
    required: [true, 'Doctor id is required'],
    validate: {
      validator: function (value: string) {
        const id = new mongoose.Types.ObjectId(value);
        return Doctor.exists({_id: id});
      },
      message: (props: { value: string }) => {
        return `Doctor with id ${props.value} does not exist.`
      }
    }
  },
  pacientId: {
    type: String,
    required: [true, 'Pacient id is required'],
    validate: {
      validator: function (value: string) {
        const id = new mongoose.Types.ObjectId(value);
        return Pacient.exists({_id: id});
      },
      message: (props: { value: string }) => {
        return `Pacient with id ${props.value} does not exist.`
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
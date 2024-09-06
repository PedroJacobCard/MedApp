import mongoose from "mongoose";

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  doctorName: {
    type: String,
    required: [true, 'Doctor name is required']
  },
  login: {
    type: String,
    required: [true, 'Doctor login is required']
  },
  password: {
    type: String,
    required: [true, 'Doctor password is required']
  },
  medicalSpeciality: {
    type: String,
    required: [true, 'Medical speciality is required']
  },
  medicalRegistration: {
    type: String,
    required: [true, 'Medical registration is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Doctor email is required'],
    unique: true
  },
  phone: {
    type: String,
    required: [true, 'Doctor phone is required'],
    validate: {
      validator: function(phone: string) {
        return /^\+43[1-9][0-9]{3,12}$/.test(phone);
      },
      message: (props: {value: string}) => `${props.value} This is not a valid number. Please use the following format +43 999 9999999`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
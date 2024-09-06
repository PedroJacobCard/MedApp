import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pacientSchema = new Schema({
  pacientName: {
    type: String,
    required: [true, 'Pacient name is required.']
  },
  birthDate: {
    type: Date,
    required: [true, 'Pacient birthday is required.']
  },
  email: {
    type: String,
    required: [true, 'Pacient email is required.']
  },
  phone: {
    type: String,
    required: [true, 'Pacient phone is required.'],
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

const Pacient = mongoose.model('Pacient', pacientSchema);

export default Pacient;
type DoctorTypes = {
  id?: string,
  doctorName: string,
  login: string,
  password: string,
  newPassword?: string,
  medicalSpeciality: string,
  medicalRegistration: string,
  email: string,
  phone: string,
  createdAt?: Date
}

export default DoctorTypes;
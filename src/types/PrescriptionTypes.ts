type PrescriptionTypes = {
  id?: string
  date?: Date | null
  appointmentId: string
  medicine: string
  dosage: string
  instructions?: string | null | undefined
  createdAt?: Date,
  file?: string | null | undefined
}

export default PrescriptionTypes;
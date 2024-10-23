import express from "express"
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from "../Controllers/appointmentController.js"
import { isAdminAuthenticated, isPatientAuthenticated } from '../Middlewares/auth.js'

const router = express.Router()

router.post("/postAppointment", isPatientAuthenticated, postAppointment)
router.get("/getAllAppointment", isAdminAuthenticated, getAllAppointments)
router.put("/updateAppointment/:id", isAdminAuthenticated, updateAppointmentStatus)
router.delete("/delete/Appointment/:id", isAdminAuthenticated, deleteAppointment)
export default router
import express from 'express'
import { addNewAdmin, addNewDoctor, adminLogout, getAllDoctors, getUserDetails, login, patientLogout, patientRegister } from '../Controllers/userController.js'
import { isAdminAuthenticated, isPatientAuthenticated } from '../Middlewares/auth.js'

const router = express.Router()


router.post("/patient/register", patientRegister)
router.post("/login", login)
router.post("/addNewAdmin", addNewAdmin)
router.get("/patient/logout", isPatientAuthenticated, patientLogout)
router.get("/admin/logout", isAdminAuthenticated, adminLogout)
router.get("/patient/me", isPatientAuthenticated, getUserDetails)
router.get("/admin/me", isAdminAuthenticated, getUserDetails)
router.get("/doctor/getAllDoctors", getAllDoctors)
router.post("/doctor/addNewDoctor", addNewDoctor)


export default router
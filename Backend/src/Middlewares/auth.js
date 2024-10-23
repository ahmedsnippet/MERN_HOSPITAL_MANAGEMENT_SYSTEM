import { asyncHandler } from '../Utils/asyncHandler.js'
import { apiError } from '../Middlewares/errorMiddlerware.js'
import { User } from '../Models/userModel.js'
import jwt from 'jsonwebtoken'

const isPatientAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.patientToken
    if (!token) {
        return next(new apiError("Patient Is Not Authenticated", 401))
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    // if (res.user.role !== "Patient") {
    //     return next(`${req.user.role} not authorized for this resources`, 403)
    // }
    next()
})

const isAdminAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.adminToken
    if (!token) {
        return next(new apiError("Admin Is Not Authenticated", 401))
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    next()
})
export { isPatientAuthenticated, isAdminAuthenticated }
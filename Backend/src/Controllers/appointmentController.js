import { Appointment } from '../Models/appointmentModel.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
import { apiError } from '../Middlewares/errorMiddlerware.js'
import { apiResponse } from '../Utils/apiResponse.js'
import { User } from '../Models/userModel.js'

const postAppointment = asyncHandler(async (req, res, next) => {
    const { firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address, } = req.body

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address
    ) {
        return next(new apiError("Please Fill Full Form!", 400))
    }

    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    })
    if (isConflict.length === 0) {
        return next(new apiError("Doctor not found", 404));
    }
    if (isConflict.length > 1) {
        return next(
            new apiError(
                "Doctors Conflict! Please Contact Through Email Or Phone!",
                400
            )
        );
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasVisited,
        address,
        doctorId,
        patientId,
    });
    return res
        .status(200)
        .json(new apiResponse(200, appointment, "Appointment Send!"))
})
const getAllAppointments = asyncHandler(async (req, res, next) => {
    const appointment = await Appointment.find()
    return res
        .status(200).json(new apiResponse(200, appointment))
})

const updateAppointmentStatus = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    let appointment = await Appointment.findById(id)
    if (!appointment) {
        return next(new apiError("Appointment Not Found", 404))
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res
        .status(200)
        .json(new apiResponse(200, appointment, "Status Updated Sucessfully"))

})

const deleteAppointment = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    const appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new apiError("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();

    return res.status(200).json(new apiResponse(200, appointment, "Appointment Delete Successfully"))
})

export { postAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment }
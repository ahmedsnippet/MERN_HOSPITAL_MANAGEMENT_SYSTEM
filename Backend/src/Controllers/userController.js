import { asyncHandler } from '../Utils/asyncHandler.js'
import { apiResponse } from '../Utils/apiResponse.js'
import { apiError } from '../Middlewares/errorMiddlerware.js'
import { User } from '../Models/userModel.js'
import { v2 as cloudinary } from "cloudinary";

const generateJWT = (user, message, statusCode, res) => {
    const token = user.generateToken();

    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken"
    res
        .status(statusCode)
        .cookie(cookieName, token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure : true,
            sameSite:"None"
        })
        .json({
            success: true,
            message,
            user,
            token
        })
    //generateJWT(user, "Login Successfuly", 200, res)
}

const patientRegister = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password, role } = req.body
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
        return next(new apiError("All Fields Are Required!", 400))
    }
    const isRegister = await User.findOne({ email })
    if (isRegister) {
        return next(new apiError("User Already Existed!", 400))
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Patient"
    })
    return res
        .status(200)
        .json(new apiResponse(200, user, "User Registered Successfull"))
   
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password, role } = req.body
    if (!email || !password || !role) {
        return next(new apiError("All Fields Are Required!", 400))
    }
    const user = await User.findOne({ email })
    if (!user) {
        return next(new apiError("Invalid UserName Or Password", 400))
    }

    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) {
        return next(new apiError("Invalid UserName Or Password", 400))
    }

    if (role !== user.role) {
        return next(new apiError("User With This Role Not Found", 400));
    }

    generateJWT(user, "Login Successfuly", 200, res)
    
})

const addNewAdmin = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password, role } = req.body
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
        return next(new apiError("All Fields Are Required!", 400))
    }

    const isAdminRegistered = await User.findOne({ email })

    if (isAdminRegistered) {
        return next(new apiError("Admin With This Email Already Exists!", 400))
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Admin"
    })

    return res
        .status(200)
        .json(new apiResponse(200, admin, "Admin Registered Successfully"))

})

const patientLogout = asyncHandler(async (req, res, next) => {
    return res
        .status(200)
        .clearCookie("patientToken")
        .json(new apiResponse(200, {}, "Patient Logout Successfully"))
})
const adminLogout = asyncHandler(async (req, res, next) => {
    return res
        .status(200)
        .clearCookie("adminToken")
        .json(new apiResponse(200, {}, "Admin Logout Successfully"))
})

const getUserDetails = asyncHandler(async (req, res, next) => {
    const user = req.user
    return res.status(200).json(new apiResponse(200, user))
})

const getAllDoctors = asyncHandler(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" })
    
    res.status(200).json({
        success: true,
        doctors
    })
})

const addNewDoctor = asyncHandler(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new apiError("Doctor Avatar Is Required", 400))
    }
    const { docAvatar } = req.files
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new apiError("File Format Not Supported!", 400));
    }

    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartment,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment) {
        return next(new apiError("All Fields Are Required"))
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(
            new apiError("Doctor With This Email Already Exists!", 400)
        );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
            new apiError("Failed To Upload Doctor Avatar To Cloudinary", 500)
        );
    }
    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Doctor",
        doctorDepartment,
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    return res
        .status(200)
        .json(new apiResponse(200, doctor, "New Doctor Registered"))
})


export { patientRegister, login, addNewAdmin, patientLogout, adminLogout, getUserDetails, getAllDoctors, addNewDoctor }
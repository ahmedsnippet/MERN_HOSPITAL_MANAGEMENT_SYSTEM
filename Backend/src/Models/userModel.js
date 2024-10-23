import mongoose from "mongoose"
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name Is Required"]
        },
        lastName: {
            type: String,
            required: [true, "Last Name Is Required"]
        },
        email: {
            type: String,
            required: [true, "Email Is Required"],
            validate: [validator.isEmail, "Please Provide A Valid Email"]
        },
        phone: {
            type: String,
            required: [true, "Phone Number Is Required"],
            minLength: [11, "Phone Number Must Contain 11 Digits"],
            maxLength: [11, "Phone Number Must Contain 11 Digits"]
        },
        nic: {
            type: String,
            required: [true, "NIC Is Required!"],
            minLength: [13, "NIC Must Contain Only 13 Digits!"],
            maxLength: [13, "NIC Must Contain Only 13 Digits!"],
        },
        dob: {
            type: Date,
            required: [true, "DOB Is Required!"],
        },
        gender: {
            type: String,
            required: [true, "Gender Is Required!"],
            enum: ["Male", "Female"],
        },
        password: {
            type: String,
            required: [true, "Password Is Required"],
            minLength: [8, "Password Must Contain 8 Characters!"],
            maxLength: [8, "Password Must Contain 8 Characters!"]
        },

        role: {
            type: String,
            required: [true, "User Role Required!"],
            enum: ["Patient", "Doctor", "Admin"],
        },
        doctorDepartment: {
            type: String,
        },
        docAvatar: {
            public_id: String,
            url: String,
        },

    }
);

// HASHED PASSWORD 

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
});

// COMPARED PASSWORD

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_SECRET_KEY_EXPIRES
    })
};
export const User = mongoose.model("User", userSchema)
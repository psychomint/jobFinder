import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create a schema for the User
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
        maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add a phone number"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [14, "Password max length is 14 characters"],
        // select: false  // Don't return the password field in queries
    },
    role: {
        type: String,
        enum: ["student", "recruiter"],
        required: true,
    },
    profile: {
        bio: {
            type: String,
            default: "",
        },
        skills: [{ type: String }],
        resume: {
            type: String,
            default: ""
        },
        resumeOriginalName: { type: String },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        avatar: {
            type: String,
            default: ""
        },
        coverImage: {
            type: String,
            default: ""
        },
        // New fields for students
        location: {
            city: { type: String, default: "" },
            country: { type: String, default: "" },
            address: { type: String, default: "" }
        },
        education: [{
            institution: { type: String },
            degree: { type: String },
            fieldOfStudy: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            current: { type: Boolean, default: false },
            description: { type: String }
        }],
        experience: [{
            company: { type: String },
            position: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            current: { type: Boolean, default: false },
            description: { type: String }
        }],
        languages: [{
            language: { type: String },
            proficiency: {
                type: String,
                enum: ['Beginner', 'Intermediate', 'Advanced', 'Native']
            }
        }],
        certifications: [{
            name: { type: String },
            issuer: { type: String },
            date: { type: Date },
            expiryDate: { type: Date },
            credentialId: { type: String },
            credentialUrl: { type: String }
        }],
        socialLinks: {
            linkedin: { type: String, default: "" },
            github: { type: String, default: "" },
            portfolio: { type: String, default: "" },
            twitter: { type: String, default: "" }
        },
        interests: [{ type: String }],
        preferredJobTypes: [{
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
        }],
        expectedSalary: {
            amount: { type: Number },
            currency: { type: String, default: "USD" }
        }
    },
    refreshToken: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpiry: {
        type: Date,
    }
}, {
    timestamps: true
});

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
//custom Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    console.log(candidatePassword);
    console.log(this.password);
    return await bcrypt.compare(candidatePassword, this.password);
};
// Method to generate JWT
userSchema.methods.genAccessToken = function () {
    const payload = {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullName,
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

}
userSchema.methods.genRefreshToken = function () {
    const payload = {
        _id: this._id,
    }
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}
const User = mongoose.model('User', userSchema);
export { User };
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatarUrl: String,
    passwordHash: {
        type: String,
        required: true
    },
},
{
    timestamps: true
})

export default mongoose.model('User', userSchema)
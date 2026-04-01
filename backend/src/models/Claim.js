import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
    claimNumber: {type: String, required: true, unique: true},
    dasNumber: { type: String },
    assessor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Pending", "Drafting", "Finalized"], default: "Pending" },

    client: {
        firstName: String,
        lastName: String,
        address: String,
        phoneNumber: String,
        email: String,
    },

    insurance: {
        provider: String,
        advisor: String,
    },

    causeOfLoss: { type: String },
    

}, {timestamps: true});



export const Claim = mongoose.model("Claim", claimSchema);
